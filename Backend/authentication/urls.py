# urls.py

from django.urls import path
from .views import CustomLoginView, CustomLogoutView, RegisterView, ProtectedSpaceView

urlpatterns = [
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('protected-space/', ProtectedSpaceView.as_view(), name='protected-space'),  
    # ... other URLs
]
