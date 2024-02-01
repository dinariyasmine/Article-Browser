# articles/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.AddArticleView.as_view(), name='AddArticleView'),  # Adjust the URL pattern accordingly
    # Add other URL patterns for your app as needed
]
