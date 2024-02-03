# app/urls.py
from django.urls import path
from .views import  index_articles, search_articles,add_to_favorites,get_favorite_articles,index_article,create_and_index_random_articles,modify_article,not_validated,delete_from_favorites,delete_article,is_favorite

urlpatterns = [
    path('search_articles/', search_articles, name='search_articles'),
    path('index-articles/', index_articles, name='index_articles'),
    path('add_to_favorites/', add_to_favorites, name='add_to_favorites'),
    path('delete_from_favorites/', delete_from_favorites, name='delete_from_favorites'),
    path('get_favorite_articles/', get_favorite_articles, name='get_favorite_articles'),
    path('is_favorite/', is_favorite, name='is_favorite'),
    path('create_and_index_random_articles/', create_and_index_random_articles, name='create_and_index_random_articles'),
    path('index_article/', index_article, name='index_article'),
    path('modify_article/', modify_article, name='modify_article'),    
    path('not_validated/', not_validated, name='not_validated'), 
    path('delete_article/', delete_article, name='delete_article'), 
    # path('modif_articles/', get_modif_articles, name='get_articles'),

    ]
