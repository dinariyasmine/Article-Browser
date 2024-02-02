from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from app.models import Article
import json
from datetime import datetime, timedelta
from app.views import perform_elasticsearch_search

class AddArticleView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            # Extract the search query from the request POST data
            query = request.POST.get('query', '')  # Assuming the search query is sent as 'query' if u named it 3fssa whdoukhra change it

            # Perform Elasticsearch search with retry mechanism
            result = perform_elasticsearch_search(query)

            # Extract the list of article IDs from the Elasticsearch response
            article_ids = [hit.meta.id for hit in result]

            # Retrieve the articles from the database based on the IDs
            articles = Article.objects.filter(id__in=article_ids)

            # Serialize the articles to JSON
            articles_data = []
            for article in articles:
                article_data = {
                    'title': article.title,
                    'abstract': article.abstract,
                    'authors': [author.name for author in article.authors.all()],
                    'institutions': [institution.name for institution in article.institutions.all()],
                    'keywords': [keyword.name for keyword in article.keywords.all()],
                    'references': article.references,
                    'full_text': article.full_text,
                    'pdf_url': article.pdf_url,
                    'validated': article.validated,
                    'date': article.date.strftime('%Y-%m-%d')  # Format date as string
                }
                articles_data.append(article_data)

            return JsonResponse({'articles': articles_data, 'query': query})

        except Exception as e:
            # Handle the exception or log the error
            print(f"Error: {e}")
            return JsonResponse({'error': str(e)}, status=500)

    def get(self, request, *args, **kwargs):
        # Return a 405 Method Not Allowed error if the request method is not POST
        return JsonResponse({'error': 'Method Not Allowed'}, status=405)
