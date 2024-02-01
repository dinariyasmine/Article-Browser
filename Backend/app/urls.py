# app/urls.py
from django.urls import path
from .views import search_and_filter_articles, index_articles, search_articles,add_to_favorites,get_favorite_articles,index_article,create_and_index_random_articles,modify_article

urlpatterns = [
    path('search/', search_articles, name='search_articles'),
    path('search_and_filter/', search_and_filter_articles, name='search_and_filter_articles'),
    path('index-articles/', index_articles, name='index_articles'),
    path('add_to_favorites/', add_to_favorites, name='add_to_favorites'),
    path('get_favorite_articles/', get_favorite_articles, name='get_favorite_articles'),
    path('create_and_index_random_articles/', create_and_index_random_articles, name='create_and_index_random_articles'),
    path('index_article/', index_article, name='index_article'),
    path('modify_article/', modify_article, name='modify_article'),    
    

    ]
