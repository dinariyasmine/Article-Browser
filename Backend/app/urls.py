# app/urls.py
from django.urls import path
from .views import search_and_filter_articles, index_articles, search_articles,add_to_favorites

urlpatterns = [
    path('search/', search_articles, name='search_articles'),
    path('search_and_filter/', search_and_filter_articles, name='search_and_filter_articles'),
    path('index-articles/<int:article_id>/', index_articles, name='index_articles'),
    path('add_to_favorites/<int:article_id>/', add_to_favorites, name='add_to_favorites'),
    ]
