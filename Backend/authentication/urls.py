# urls.py

from django.urls import path
from .views import AllModeratorsView,LoginView,  RegisterView,AddModeratorView,DeleteModeratorView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('all_moderators/', AllModeratorsView.as_view(), name='all_moderators'),
    path('add_moderator/', AddModeratorView.as_view(), name='add_moderator'),
    path('delete_moderator/', DeleteModeratorView.as_view(), name='delete_moderator'),
  
]
