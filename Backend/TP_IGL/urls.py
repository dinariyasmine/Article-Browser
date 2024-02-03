from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('app.urls')),
    
    path('auth/', include('authentication.urls')),
    path('extraction/', include('extraction.urls')),
    path('', RedirectView.as_view(url='/auth/login/')),  # Redirect to the login page
    # Add other app URLs here as needed
]
