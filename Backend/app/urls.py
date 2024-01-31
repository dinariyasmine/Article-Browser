# app/urls.py
from django.urls import path
from .views import search_articles 
from .views import search_and_filter_articles, index_articles, create_sample_articles

urlpatterns = [
    # ... your existing URL patterns
    path('search/', search_articles, name='search_articles'),

    # mery's code
    path('search_and_filter/', search_and_filter_articles, name='search_and_filter_articles'),

    path('index-articles/', index_articles, name='index_articles'),

    path('create-sample-articles/', create_sample_articles, name='create_sample_articles'),


]
