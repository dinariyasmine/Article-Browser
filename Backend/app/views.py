from django.shortcuts import render
from app.models import Article, Author, Keyword, Institution, Reference, UserFavorite
from elasticsearch_dsl import Search
from .index import ArticleIndex
from django.http import HttpResponse,JsonResponse
from elasticsearch.helpers import bulk
from tenacity import retry, stop_after_delay, wait_fixed
from datetime import datetime
from django.shortcuts import get_object_or_404
import json
from django.views.decorators.csrf import csrf_exempt
from authentication.models import User
import random

# Decorate the Elasticsearch search operation with retry mechanism
@retry(stop=stop_after_delay(30), wait=wait_fixed(5))
def perform_elasticsearch_search(query):
    # Use Elasticsearch DSL to perform the search
    s = Search(index='article_index').query("multi_match", query=query, fields=['title', 'keywords.name', 'authors.name', 'full_text'])
    response = s.execute()

    # Check if the search was successful
    if response.success():
        return response
    else:
        raise Exception("Elasticsearch search failed")


@csrf_exempt
def index_articles(request):
    if request.method == 'POST':
        try:
            # Retrieve JSON data from the request body
            data = json.loads(request.body.decode('utf-8'))
            article_id = data.get('article_id')
            
            if article_id is None:
                return JsonResponse({'status': 'error', 'message': 'Article ID is missing'})

            article = get_object_or_404(Article, id=article_id)
            ArticleIndex.init()

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
                        "text": article.full_text,
                        "pdf_url": article.pdf_url,
                        "validated": article.validated,
                        "date": article.date
                    }
                }
            ]

            es = ArticleIndex._get_connection()
            success, failed = bulk(client=es, actions=actions, stats_only=True)
            return JsonResponse({'status': 'success', 'message': 'Article indexed successfully'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'Error during indexing: {str(e)}'})
    else:
        return HttpResponse('This view only accepts POST requests.')

#--------------------------------------------------------------
    
def search_articles(request):
    query = request.GET.get('q', '')
    try:
        # Perform Elasticsearch search with retry mechanism
        result = perform_elasticsearch_search(query)
        # Extract the list of article IDs from the Elasticsearch response
        article_ids = [hit.meta.id for hit in result]
        # Retrieve the articles from the database based on the IDs
        articles = Article.objects.filter(id__in=article_ids)
        return render(request, 'search_results.html', {'articles': articles, 'query': query})
    except Exception as e:
        # Handle the exception or log the error
        print(f"Error: {e}")
        return render(request, 'search_results.html', {'articles': [], 'query': query, 'error': str(e)})

#--------------------------------------------------------------
    
def search_and_filter_articles(request):
    # Extract search query from the front end team
    search_query = request.GET.get('q', '')

    # Extract filter criteria from the front end team
    authors_list = request.GET.getlist('authors', [])
    keywords_list = request.GET.getlist('keywords', [])
    institutions_list = request.GET.getlist('institutions', [])

    from_date_str = request.GET.get('from_date', '')
    to_date_str = request.GET.get('to_date', '')

    # Convert date strings to datetime objects
    from_date = datetime.strptime(from_date_str, '%Y-%m-%d') if from_date_str else None
    to_date = datetime.strptime(to_date_str, '%Y-%m-%d') if to_date_str else None

    try:
        # Perform Elasticsearch search with retry mechanism
        es_result = perform_elasticsearch_search(search_query)

        # Extract the list of article IDs from the Elasticsearch response
        es_article_ids = [hit.meta.id for hit in es_result]

        # Apply additional filters based on the filter criteria
        filtered_articles = Article.objects.filter(
            id__in=es_article_ids,
            authors__name__in=authors_list,
            keywords__name__in=keywords_list,
            institutions__name__in=institutions_list,
            pub_date__gte=from_date,
            pub_date__lte=to_date
        ).distinct()

        return render(request, 'search_results.html', {'articles': filtered_articles, 'query': search_query})

    except Exception as e:
        # Handle the exception or log the error
        print(f"Error: {e}")
        return render(request, 'search_results.html', {'articles': [], 'query': search_query, 'error': str(e)})
    
#--------------------------------------------------------------
    
def add_to_favorites(request):
    if request.user.is_authenticated:
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
            return JsonResponse({'status': 'Error', 'error': str(e)})

    else:
        return JsonResponse({'status': 'User not authenticated'})

#--------------------------------------------------------------

def get_favorite_articles(request):
    try:
        # Extract user and article IDs from the JSON data in the request body
        data = json.loads(request.body.decode('utf-8'))
        user_id = data.get('user_id')

        # Step 2: Query UserFavorite model to get favorite article IDs
        favorite_article_ids = UserFavorite.objects.filter(user_id=user_id).values_list('article_id', flat=True)

        # Step 3: Use Elasticsearch to retrieve actual articles
        if favorite_article_ids:
            # Perform Elasticsearch search for favorite articles
            query = {"terms": {"_id": list(favorite_article_ids)}}
            print(f"Elasticsearch query: {query}")
            result = perform_elasticsearch_search(query)

            # Extract the articles from the Elasticsearch search result
            favorite_articles = [hit.to_dict() for hit in result.hits]

            # Return the favorite articles
            return JsonResponse({'favorite_articles': favorite_articles})

        else:
            return JsonResponse({'message': 'User has no favorite articles'}, status=404)

    except Exception as e:
        print(f"Error in get_favorite_articles: {str(e)}")
        print(f"Error details: {e.info}")  # Log detailed error information from Elasticsearch
        return JsonResponse({'status': 'error', 'message': f'Error in get_favorite_articles: {str(e)}'}, status=500)
    
def perform_elasticsearch_search(query):
    try:
        s = ArticleIndex.search().query(query)
        response = s.execute()
        print(f"Elasticsearch response: {response}")
        return response
    except Exception as e:
        print(f"Elasticsearch error: {e}")
        raise
    
#--------------------------------------------------------------
    
def create_and_index_random_articles():
    # Dummy data for authors, institutions, keywords, and articles
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
        }

        # Index the article using the existing index_articles function
        index_article(article,i)

def index_article(article,i):
    try:
        ArticleIndex.init()
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
                    "text": article['full_text'],
                    "pdf_url": article['pdf_url'],
                }
            }
        ]
        es = ArticleIndex._get_connection()
        success, failed = bulk(client=es, actions=actions, stats_only=True)
        if failed:
            print(f"Failed to index article: {failed}")
        else:
            print("Article indexed successfully")
        return JsonResponse({'status': 'success', 'message': 'Article indexed successfully'})
    except Exception as e:
        print(f"Error during indexing: {str(e)}")
        return JsonResponse({'status': 'error', 'message': f'Error during indexing: {str(e)}'})