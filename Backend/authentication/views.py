from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView as AuthLoginView, LogoutView as AuthLogoutView
from django.http import JsonResponse
from django.views.generic.edit import CreateView
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import render, redirect
from django.views import View
from django.urls import reverse_lazy
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import User
import json

class RegisterView(View):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            post_data = json.loads(request.body)
            print("Received JSON data:", post_data)
        except json.JSONDecodeError:
            return JsonResponse({"errors": "Invalid JSON data"}, status=400)

        username = post_data.get('username')
        email = post_data.get('email')
        password1 = post_data.get('password1')
        password2 = post_data.get('password2')

        if not (username and email and password1 and password2):
            return JsonResponse({"errors": "All fields are required"}, status=400)

        # Perform your custom validation if needed

        # Create the user
        user = User.objects.create_user(username=username, email=email, password=password1)

        # Authenticate and login the user
        user = authenticate(request, username=username, password=password1)
        if user is not None:
            login(request, user)
            protected_space_url = reverse_lazy('protected-space')
            return JsonResponse({"success": "User registration and authentication successful", "redirect_url": str(protected_space_url)}, status=200)
        else:
            return JsonResponse({"errors": "User authentication failed"}, status=400)


class CustomLoginView(AuthLoginView):
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            post_data = json.loads(request.body)
            print("Received JSON data:", post_data)
        except json.JSONDecodeError:
            return JsonResponse({"errors": "Invalid JSON data"}, status=400)

        username = post_data.get('username')
        password = post_data.get('password')

        if not (username and password):
            return JsonResponse({"errors": "Both username and password are required"}, status=400)

        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            protected_space_url = reverse_lazy('protected-space')
            return JsonResponse({"success": "User authentication successful", "redirect_url": str(protected_space_url)}, status=200)
        else:
            return JsonResponse({"errors": "User authentication failed"}, status=400)
