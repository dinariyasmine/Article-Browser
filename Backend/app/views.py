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
