from django.shortcuts import render
from .models import Article
from elasticsearch_dsl import Search
from .index import ArticleIndex
from tenacity import retry, stop_after_delay, wait_fixed

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




# mery's code
# Path: Backend/app/views.py

from datetime import datetime

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