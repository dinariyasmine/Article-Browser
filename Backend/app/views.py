from django.shortcuts import render
from .models import Article, Author, Keyword, Institution, Reference
from elasticsearch_dsl import Search
from .index import ArticleIndex
from django.http import HttpResponse
from elasticsearch.helpers import bulk
from tenacity import retry, stop_after_delay, wait_fixed
from datetime import datetime


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




def create_sample_articles(request):
    try:
        # Create sample authors
        author1 = Author.objects.create(name='John Do')
        author2 = Author.objects.create(name='Jan Smith')


        # Create sample institutions
        institution1 = Institution.objects.create(name='University Ac')
        institution2 = Institution.objects.create(name='University Bc')

        # Create sample keywords
        keyword1 = Keyword.objects.create(name='Sciences')
        keyword2 = Keyword.objects.create(name='Tech')

        # Create sample references
        reference1 = Reference.objects.create(name='Reference1')
        reference2 = Reference.objects.create(name='Reference2')

        # Create sample articles
        article1 = Article.objects.create(
            title='Sample Article A',
            abstract='This is the abstract of sample article A.',
            full_text='This is the full text of sample article A.',
            pdf_url='https://example.com/sample-article-A.pdf',
        )
        article1.authors.add(author1)
        article1.institutions.add(institution1)
        article1.keywords.add(keyword1, keyword2)
        article1.references.add(reference1, reference2)

        article2 = Article.objects.create(
            title='Sample Article B',
            abstract='This is the abstract of sample article B.',
            full_text='This is the full text of sample article B.',
            pdf_url='https://example.com/sample-article-B.pdf',
        )
        article2.authors.add(author2)
        article2.institutions.add(institution2)
        article2.keywords.add(keyword2)
        article2.references.add(reference1)

      
        return HttpResponse('Sample articles created successfully.')

    except Exception as e:
        return HttpResponse(f'Error creating sample articles: {str(e)}')





def index_articles(request):
    try:
        # Initialize the Elasticsearch index
        ArticleIndex.init()

        # Index all articles
        articles = Article.objects.all()
        actions = [
            {
                "_op_type": "index",
                "_index": "article_index",
                "_id": article.id,
                "_source": {
                    # Map model fields to Elasticsearch fields
                    "title": article.title,
                    "abstract": article.abstract,
                    "authors": ", ".join(str(author) for author in article.authors.all()),
                    "institutions": ", ".join(str(institution) for institution in article.institutions.all()),
                    "keywords": ", ".join(str(keyword) for keyword in article.keywords.all()),

                    #modification
                    "text": article.full_text,

                    "pdf_url": article.pdf_url,
                }
            }
            for article in articles
        ]

        # Get the Elasticsearch connection
        es = ArticleIndex._get_connection()

        # Bulk indexing
        success, failed = bulk(client=es, actions=actions, stats_only=True)

        return HttpResponse(f'Successfully indexed {success} articles. Failed to index {failed} articles.')

    except Exception as e:
        return HttpResponse(f'Error during indexing: {str(e)}')





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
    
