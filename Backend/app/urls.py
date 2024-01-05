# app/urls.py
from django.urls import path
from .views import search_articles 

urlpatterns = [
    # ... your existing URL patterns
    path('search/', search_articles, name='search_articles'),

]
