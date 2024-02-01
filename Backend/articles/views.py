from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from .models import Article
import json
from datetime import datetime, timedelta


class AddArticleView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            # No need for search input as we want to retrieve all articles
            # Perform your search logic here
            articles = Article.objects.all()

            # Prepare the response data
            response_data = {
                'articles': [
                    {
                        'title': article.title,
                        'authors': article.authors,
                        'keywords': article.keywords,
                        'institutions': article.institutions,
                        'publish_date': article.publish_date.strftime('%Y-%m-%d'),
                        'abstract': article.abstract,
                        'integral_text': article.integral_text,
                        'references': article.references,
                    }
                    for article in articles
                ],
            }

            return JsonResponse(response_data)

        except json.JSONDecodeError as decode_error:
            return JsonResponse({"errors": f"JSON Decode Error: {decode_error}"}, status=400)

        except Exception as e:
            print(f"Unexpected error in AddArticleView: {str(e)}")
            return JsonResponse({"errors": "Internal Server Error"}, status=500)
