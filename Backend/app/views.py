from django.shortcuts import render
from app.models import Article,UserFavorite
from elasticsearch_dsl import Search
from .index import ArticleIndex
from django.http import HttpResponse, HttpResponseServerError,JsonResponse
from elasticsearch.helpers import bulk
from tenacity import retry, stop_after_delay, wait_fixed
from datetime import datetime
from django.shortcuts import get_object_or_404
import json
from django.views.decorators.csrf import csrf_exempt
from authentication.models import User
import random
from django.utils import timezone
from elasticsearch_dsl.connections import connections


@csrf_exempt
def index_articles(article):
    """
    View function to index an article in Elasticsearch.

    Parameters:
        - article: The article to be indexed.

    Response:
        - JSON response indicating the status of the indexing.

    Raises:
        - Exception: If an error occurs during indexing.
    """
    try:
        # Check if the article has an ID
        if not article.id:
            return JsonResponse({'status': 'error', 'message': 'Article has no ID'})

        # Define actions for bulk indexing
        actions = [
            {
                "_op_type": "index",
                "_index": "article_index",
                "_id": article.id,
                "_source": {
                    "title": article.title,
                    "abstract": article.abstract,
                    "authors": ", ".join(str(author) for author in article.authors.all()),
                    "institutions": ", ".join(str(institution) for institution in article.institutions.all()),
                    "keywords": ", ".join(str(keyword) for keyword in article.keywords.all()),
                    "references": article.references,
                    "text": article.full_text,
                    "pdf_url": article.pdf_url,
                    "validated": article.validated,
                    "date": article.date
                }
            }
        ]

        # Get Elasticsearch connection and perform bulk indexing
        es = ArticleIndex._get_connection()
        success, failed = bulk(client=es, actions=actions, stats_only=True)

        # Return JSON response based on indexing success or failure
        if failed == 0:
            return JsonResponse({'status': 'success', 'message': 'Article indexed successfully'})
        else:
            return JsonResponse({'status': 'error', 'message': f'Failed to index article. {failed} actions failed'})
    except Exception as e:
        # Return JSON response with an error message if an exception occurs
        return JsonResponse({'status': 'error', 'message': f'Error during indexing: {str(e)}'})

#--------------------------------------------------------------
    
@csrf_exempt
def search_articles(request):
    """
    View function to perform a search on articles using Elasticsearch.

    Request:
        - POST request with JSON data containing 'query'.

    Response:
        - JSON response with search result data.

    Raises:
        - Exception: If an error occurs during the search.
    """
    if request.method == 'POST':
        try:
            # Retrieve JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            query = data.get('query')

            # Perform Elasticsearch search with retry mechanism
            result = perform_elasticsearch_search1(query)

            hits_data = []  # Move the list declaration outside the loop

            # Extract and print search results in the console
            for hit in result:
                # Check if 'validated' is True
                if getattr(hit, 'validated', True):
                    title = hit.title if hasattr(hit, 'title') else ''
                    authors = ', '.join(hit.authors.split('.') if hasattr(hit, 'authors') else [])
                    institutions = ', '.join(hit.institutions.split('.') if hasattr(hit, 'institutions') else [])
                    keywords = ', '.join(hit.keywords.split('.') if hasattr(hit, 'keywords') else [])
                    abstract = hit.abstract if hasattr(hit, 'abstract') else ''
                    references = hit.references if hasattr(hit, 'references') else ''
                    text = hit.text if hasattr(hit, 'text') else ''
                    date = hit.date if hasattr(hit, 'date') else '2024-10-12'
                    id = hit.meta.id if hasattr(hit, 'meta') and hasattr(hit.meta, 'id') else ''

                    # Print search results in the console
                    print(f"Title: {title}")
                    print(f"Authors: {authors}")
                    print(f"Institutions: {institutions}")
                    print(f"Keywords: {keywords}")
                    print(f"Abstract: {abstract}")
                    print(f"References: {references}")
                    print(f"Text: {text}")
                    print(f"Date: {date}")
                    print(f"ID: {id}")

                    # Append data to the list
                    hits_data.append({
                        'title': title,
                        'authors': authors,
                        'institutions': institutions,
                        'keywords': keywords,
                        'abstract': abstract,
                        'references': references,
                        'text': text,
                        'date': date,
                        'id': id
                    })
                else:
                    print('Not validated')

            return JsonResponse({'result': hits_data})
        except Exception as e:
            # Return JSON response with an error message if an exception occurs
            return JsonResponse({'status': 'error', 'message': f'Error during research: {str(e)}'})
    else:
        return HttpResponse('This view only accepts POST requests.')

@retry(stop=stop_after_delay(30), wait=wait_fixed(5))
def perform_elasticsearch_search1(query):
    """
    Retry decorator applied to an Elasticsearch search function.

    Parameters:
        - query (str): The search query.

    Returns:
        - response: Elasticsearch search response.

    Raises:
        - Exception: If the Elasticsearch search fails.
    """
    # Use Elasticsearch DSL to perform the search
    s = Search(index='article_index').query(
        'bool',
        should=[
            {"match": {"title": query}},
            {"match": {"abstract": query}},
            {"match": {"authors": query}},
            {"match": {"institutions": query}},
            {"match": {"keywords": query}},
            {"match": {"text": query}},
        ]
    )
    s = s.extra(size=30)
    response = s.execute()

    # Check if the search was successful
    if response.success():
        return response
    else:
        raise Exception("Elasticsearch search failed")
      
#--------------------------------------------------------------
@csrf_exempt
def add_to_favorites(request):
    """
    View function to add an article to a user's favorites.

    Request:
        - POST request with JSON data containing 'user_id' and 'article_id'.

    Response:
        - JSON response indicating the status of the addition.

    Raises:
        - Exception: If an error occurs during the processing.
    """
    try:
        # Extract user and article IDs from the JSON data in the request body
        data = json.loads(request.body.decode('utf-8'))
        user_id = data.get('user_id')
        article_id = data.get('article_id')

        # Check if the user already has the article in favorites
        if UserFavorite.objects.filter(user_id=user_id, article_id=article_id).exists():
            return JsonResponse({'status': 'Already in favorites'})

        # If not, add the article to favorites
        user_favorite = UserFavorite(user_id=user_id, article_id=article_id)
        user_favorite.save()

        return JsonResponse({'status': 'Added to favorites'})

    except Exception as e:
        # Return JSON response with an error message if an exception occurs
        return JsonResponse({'status': 'Error', 'error': str(e)})

#---------------------------------------------------------------------
        
@csrf_exempt
def delete_from_favorites(request):
    """
    View function to remove an article from a user's favorites.

    Request:
        - POST request with JSON data containing 'user_id' and 'article_id'.

    Response:
        - JSON response indicating the status of the removal.

    Raises:
        - Exception: If an error occurs during the processing.
    """
    try:
        # Extract user and article IDs from the JSON data in the request body
        data = json.loads(request.body.decode('utf-8'))
        user_id = data.get('user_id')
        article_id = data.get('article_id')

        # Check if the user has the article in favorites
        if UserFavorite.objects.filter(user_id=user_id, article_id=article_id).exists():
            # If the article is in favorites, delete it
            UserFavorite.objects.filter(user_id=user_id, article_id=article_id).delete()
            return JsonResponse({'status': 'Removed from favorites'})
        else:
            return JsonResponse({'status': 'Not in favorites'})

    except Exception as e:
        # Return JSON response with an error message if an exception occurs
        return JsonResponse({'status': 'Error', 'error': str(e)})

#--------------------------------------------------------------
@csrf_exempt
def get_favorite_articles(request):
    """
    View function to retrieve favorite articles for a user.

    Request:
        - POST request with JSON data containing 'user_id'.

    Response:
        - JSON response with favorite article data.

    Raises:
        - Exception: If an error occurs during the processing.
    """
    if request.method == 'POST':
        try:
            # Retrieve JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            user_id = data.get('user_id')

            # Query UserFavorite model to get favorite article IDs
            favorite_article_ids = UserFavorite.objects.filter(user_id=user_id).values_list('article_id', flat=True)

            # Use Elasticsearch to retrieve actual articles
            if favorite_article_ids:
                # Perform Elasticsearch search for favorite articles
                query = {"terms": {"_id": list(favorite_article_ids)}}
                print(f"Elasticsearch query: {query}")
                result = perform_elasticsearch_search(query)

                # Extract and format the articles
                hits_data = []
                for hit in result:
                    # Ensure 'validated' is True
                    if getattr(hit, 'validated', True):
                        title = hit.title if hasattr(hit, 'title') else ''
                        authors = ', '.join(hit.authors.split('.') if hasattr(hit, 'authors') else [])
                        institutions = ', '.join(hit.institutions.split('.') if hasattr(hit, 'institutions') else [])
                        keywords = ', '.join(hit.keywords.split('.') if hasattr(hit, 'keywords') else [])
                        abstract = hit.abstract if hasattr(hit, 'abstract') else ''
                        references = hit.references if hasattr(hit, 'references') else ''
                        text = hit.text if hasattr(hit, 'text') else ''
                        date = hit.date if hasattr(hit, 'date') else '2024-10-12'
                        id2 = hit.meta.id if hasattr(hit.meta, 'id') else ''

                        # Append data to the list
                        hits_data.append({
                            'title': title,
                            'authors': authors,
                            'institutions': institutions,
                            'keywords': keywords,
                            'abstract': abstract,
                            'references': references,
                            'text': text,
                            'date': date,
                            'id2': id2
                        })
                    else:
                        print('Not validated')

                return JsonResponse({'favorite_articles': hits_data})
            else:
                return JsonResponse({'message': 'User has no favorite articles'}, status=404)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'Error in get_favorite_articles: {str(e)}'}, status=500)
    else:
        return HttpResponse('This view only accepts POST requests.')


@csrf_exempt
def is_favorite(request):
    """
    View function to check if an article is marked as a favorite by a user.

    Request:
        - POST request with JSON data containing 'user_id' and 'article_id'.

    Response:
        - JSON response indicating whether the article is a favorite for the user.

    Raises:
        - Exception: If an error occurs during the processing.
    """
    try:
        # Extract user and article IDs from the JSON data in the request body
        data = json.loads(request.body.decode('utf-8'))
        user_id = data.get('user_id')
        article_id = data.get('article_id')

        # Check if the user has the article in favorites
        is_favorite = UserFavorite.objects.filter(user_id=user_id, article_id=article_id).exists()

        # Return JSON response indicating whether the article is a favorite for the user
        return JsonResponse({'is_favorite': is_favorite})

    except Exception as e:
        # Return JSON response with an error message if an exception occurs
        return JsonResponse({'status': 'error', 'error': str(e)}, status=500)
    
def perform_elasticsearch_search(query):
    """
    Performs an Elasticsearch search using the provided query.

    Parameters:
        - query (str): The search query.

    Returns:
        - response: Elasticsearch search response.

    Raises:
        - Exception: If an error occurs during the Elasticsearch search.
    """
    try:
        # Create an Elasticsearch search object and set the query
        s = ArticleIndex.search().query(query)

        # Set the size of the result set to 30
        s = s.extra(size=30)

        # Execute the Elasticsearch search
        response = s.execute()

        # Print the Elasticsearch response for debugging
        print(f"Elasticsearch response: {response}")

        return response
    except Exception as e:
        # Print the Elasticsearch error if an exception occurs
        print(f"Elasticsearch error: {e}")
        raise

#-------------------------------------------------------------- 

def create_and_index_random_articles():
    """
    Function to create and index random articles for testing purposes.

    This function generates dummy data for authors, institutions, keywords, and creates random articles.

    No parameters are required. The generated articles are indexed using the existing index_articles function.
    """
    # Dummy data for authors, institutions, keywords
    authors = ['Author A', 'Author B', 'Author C']
    institutions = ['Institution X', 'Institution Y', 'Institution Z']
    keywords = ['Keyword 1', 'Keyword 2', 'Keyword 3']

    for i in range(15, 30):
        # Create a random article
        article = {
            'title': f'Random Article {i}',
            'abstract': f'This is the abstract of Random Article {i}.',
            'full_text': f'This is the full text of Random Article {i}.',
            'pdf_url': f'https://example.com/random-article-{i}.pdf',
            'authors': random.sample(authors, k=random.randint(1, len(authors))),
            'institutions': random.sample(institutions, k=random.randint(1, len(institutions))),
            'keywords': random.sample(keywords, k=random.randint(1, len(keywords))),
            'references': f'These are the references of Random Article {i}.',
        }

        # Set a default value for 'validated' (you may adjust this based on your logic)
        article['validated'] = False

        # Set a default value for 'date' (you may adjust this based on your logic)
        article['date'] = timezone.now()

        # Index the article using the existing index_articles function
        index_articles(article)

def index_article(article, i):
    """
    Function to index a single article in Elasticsearch.

    Parameters:
        - article (dict): The article data.
        - i (int): The identifier for the article.

    Response:
        - JSON response indicating the status of the indexing.

    Raises:
        - Exception: If an error occurs during indexing.
    """
    try:
        # Initialize the ArticleIndex (you may adjust this based on your requirements)
        ArticleIndex.init()

        # Define actions for bulk indexing
        actions = [
            {
                "_op_type": "index",
                "_index": "article_index",
                "_id": i,
                "_source": {
                    "title": article['title'],
                    "abstract": article['abstract'],
                    "authors": ", ".join(str(author) for author in article['authors']),
                    "institutions": ", ".join(str(institution) for institution in article['institutions']),
                    "keywords": ", ".join(str(keyword) for keyword in article['keywords']),
                    "references": article['references'],
                    "text": article['full_text'],
                    "pdf_url": article['pdf_url'],
                    "validated": article['validated'],
                    "date": article['date']
                }
            }
        ]

        # Get Elasticsearch connection and perform bulk indexing
        es = ArticleIndex._get_connection()
        success, failed = bulk(client=es, actions=actions, stats_only=True)

        # Print success or failure message
        if failed:
            print(f"Failed to index article: {failed}")
        else:
            print("Article indexed successfully")

        # Return JSON response based on indexing success or failure
        return JsonResponse({'status': 'success', 'message': 'Article indexed successfully'})
    except Exception as e:
        # Print error message and return JSON response with an error message
        print(f"Error during indexing: {str(e)}")
        return JsonResponse({'status': 'error', 'message': f'Error during indexing: {str(e)}'})

#--------------------------------------------------------------

@csrf_exempt
def modify_article(request):
    """
    View function to modify/update an article in Elasticsearch.

    Request:
        - POST request with JSON data containing 'article_id' and optional fields for modification.

    Response:
        - JSON response indicating the status of the modification.

    Raises:
        - Exception: If an error occurs during the modification.
    """
    try:
        # Extract user and article IDs from the JSON data in the request body
        data = json.loads(request.body.decode('utf-8'))
        article_id = data.get('article_id')
        title = data.get('title', '')
        abstract = data.get('abstract', '')
        authors = data.get('authors', '')
        institutions = data.get('institutions', '')
        keywords = data.get('keywords', '')
        references = data.get('references', '')
        full_text = data.get('full_text', '')
        pdf_url = data.get('pdf_url', '')
        validated = True  # Set a default value for 'validated' (you may adjust this based on your logic)
        date = data.get('date', '')   # Set a default value for 'date' (you may adjust this based on your logic)

        # Create an Elasticsearch client
        es = connections.get_connection()

        # Update the article in Elasticsearch
        es.update(index='article_index', id=article_id,
                  body={'doc': {
                    'title': title,
                    'abstract': abstract,
                    'authors': authors,
                    'institutions': institutions,
                    'keywords': keywords,
                    'references': references,
                    'text': full_text,
                    'pdf_url': pdf_url,
                    'validated': validated,
                    'date': date
                  }})

        # Return JSON response indicating the success of the modification
        return JsonResponse({'status': 'success', 'message': 'Article updated successfully'})

    except Exception as e:
        # Print error message and return JSON response with an error message
        print(f"Error in modify_article: {str(e)}")
        return JsonResponse({'status': 'error', 'message': f'Error in modify_article: {str(e)}'}, status=500)

#--------------------------------------------------------------

def create_and_index_random_articles2():
    """
    Function to create and index additional random articles with validated = True for testing purposes.

    This function generates dummy data for authors, institutions, keywords, and creates random articles.

    No parameters are required. The generated articles are indexed using the existing index_article function.
    """
    # Dummy data for authors, institutions, keywords
    authors = ['Author A', 'Author B', 'Author C']
    institutions = ['Institution X', 'Institution Y', 'Institution Z']
    keywords = ['Keyword 1', 'Keyword 2', 'Keyword 3']

    for i in range(30, 40):
        # Create a random article
        article = {
            'title': f'Random Article {i}',
            'abstract': f'This is the abstract of Random Article {i}.',
            'full_text': f'This is the full text of Random Article {i}.',
            'pdf_url': f'https://example.com/random-article-{i}.pdf',
            'authors': random.sample(authors, k=random.randint(1, len(authors))),
            'institutions': random.sample(institutions, k=random.randint(1, len(institutions))),
            'keywords': random.sample(keywords, k=random.randint(1, len(keywords))),
            'references': f'These are the references of Random Article {i}.',
        }

        # Set a default value for 'validated' (you may adjust this based on your logic)
        article['validated'] = True

        # Set a default value for 'date' (you may adjust this based on your logic)
        article['date'] = timezone.now()

        # Index the article using the existing index_article function
        index_article(article, i)

#-----------------------------------------------------------------------------------

def not_validated(request):
    """
    View function to retrieve and display articles that are not validated.

    Request:
        - GET request to perform Elasticsearch search.

    Response:
        - JSON response containing information about not validated articles.

    Raises:
        - Exception: If an error occurs during the search.
    """
    try:
        # Perform Elasticsearch search with retry mechanism for not validated articles
        result = perform_elasticsearch_search_not_validated()

        hits_data = []  # Move the list declaration outside the loop

        # Extract and print search results in the console
        for hit in result:
            title = hit.title if hasattr(hit, 'title') else ''
            authors = ', '.join(hit.authors.split('.') if hasattr(hit, 'authors') else [])
            institutions = ', '.join(hit.institutions.split('.') if hasattr(hit, 'institutions') else [])
            keywords = ', '.join(hit.keywords.split('.') if hasattr(hit, 'keywords') else [])
            abstract = hit.abstract if hasattr(hit, 'abstract') else ''
            references = hit.references if hasattr(hit, 'references') else ''
            text = hit.text if hasattr(hit, 'text') else ''
            date = hit.date if hasattr(hit, 'date') else '2024-10-12'
            id = hit.meta.id if hasattr(hit, 'meta') and hasattr(hit.meta, 'id') else ''
            pdf_url = hit.pdf_url if hasattr(hit, 'pdf_url') else ''

            # Print information to the console
            print(f"Title: {title}")
            print(f"Authors: {authors}")
            print(f"Institutions: {institutions}")
            print(f"Keywords: {keywords}")
            print(f"Abstract: {abstract}")
            print(f"References: {references}")
            print(f"Text: {text}")
            print(f"Date: {date}")
            print(f"ID: {id}")
            print(f"PDF URL: {pdf_url}")

            # Append data to the list
            hits_data.append({
                'title': title,
                'authors': authors,
                'institutions': institutions,
                'keywords': keywords,
                'abstract': abstract,
                'references': references,
                'text': text,
                'date': date,
                'id': id,
                'pdf_url': pdf_url
            })

        # Return JSON response containing information about not validated articles
        return JsonResponse({'result': hits_data})
    except Exception as e:
        # Return JSON response with an error message if an exception occurs
        return JsonResponse({'status': 'error', 'message': f'Error during research: {str(e)}'})

@retry(stop=stop_after_delay(30), wait=wait_fixed(5))
def perform_elasticsearch_search_not_validated():
    """
    Function to perform an Elasticsearch search for articles that are not validated.

    Uses the @retry decorator to handle retries in case of Elasticsearch search failure.

    Returns:
        - Elasticsearch response containing information about not validated articles.

    Raises:
        - Exception: If the Elasticsearch search fails.
    """
    try:
        # Assuming you have a Search object
        search = Search(index='article_index')

        # Build the query to match documents where 'validated' is false
        search = search.query('match', validated=False)

        # Set the size for the number of documents to retrieve
        search = search.extra(size=30)

        # Execute the Elasticsearch search
        response = search.execute()

        # Check if the search was successful
        if response.success():
            return response
        else:
            # Raise an exception if the search was not successful
            raise Exception("Elasticsearch search failed")
    except Exception as e:
        # Raise an exception if an error occurs during the Elasticsearch search
        raise Exception(f"Elasticsearch error: {e}")

#--------------------------------------------------------
    
@csrf_exempt
def delete_article(request):
    """
    View function to delete an article from Elasticsearch.

    Request:
        - POST request with article ID in the request body.

    Response:
        - JSON response indicating the success or failure of the deletion operation.

    Raises:
        - Exception: If an error occurs during the deletion operation.
    """
    try:
        # Extract article ID from the request body
        data = json.loads(request.body.decode('utf-8'))
        article_id = data.get('article_id')

        # Create an Elasticsearch client
        es = connections.get_connection()

        # Use the delete_by_query API to delete the article
        result = es.delete(index='article_index', id=article_id)
        print(result)

        # Check if the delete operation was successful
        if 'result' in result and result['result'] == 'deleted':
            # Return success response if the article was deleted
            return JsonResponse({'status': 'success', 'message': 'Article deleted successfully'})
        else:
            # Return error response if the article was not found or deletion failed
            return JsonResponse({'status': 'error', 'message': 'Article not found or deletion failed'}, status=404)

    except Exception as e:
        # Print error message to console and return error response
        print(f"Error in delete_article: {str(e)}")
        return JsonResponse({'status': 'error', 'message': f'Error in delete_article: {str(e)}'}, status=500)



