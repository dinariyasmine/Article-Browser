from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.views import LoginView as AuthLoginView, LogoutView as AuthLogoutView
from django.http import JsonResponse
from django.views.generic.edit import CreateView
from django.contrib.auth import authenticate, login
from django.urls import reverse_lazy
from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import render, redirect
from django.views import View
from .models import User
from .forms import CustomUserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin

class RegisterView(CreateView):
    model = User
    form_class = CustomUserCreationForm
    template_name = 'authentication/register.html'

    def post(self, request, *args, **kwargs):
        if request.headers.get('content-type') == 'application/json':
            post_data = request.json()
        else:
            post_data = request.POST

        form = self.get_form(self.get_form_class())

        if form.is_valid():
            return self.form_valid(form)
        else:
            return JsonResponse({"errors": form.errors}, status=400)

    def form_valid(self, form):
        response = super().form_valid(form)
        email = form.cleaned_data.get('email')
        raw_password = form.cleaned_data.get('password1')

        # Use form.instance to access the newly created user instance
        user = form.instance
        if user is not None:
            user = authenticate(self.request, username=email, password=raw_password)

            if user is not None:
                login(self.request, user)
                protected_space_url = reverse_lazy('protected-space') 
                return redirect(protected_space_url) 

        return JsonResponse({"errors": "User creation or authentication failed"}, status=400)

class CustomLoginView(AuthLoginView):
    template_name = 'authentication/login.html'
    form_class = AuthenticationForm

    def get_success_url(self):
        return reverse_lazy('protected-space')

class CustomLogoutView(AuthLogoutView):
    def get_next_page(self):
        return reverse_lazy('login')  

class ProtectedSpaceView(LoginRequiredMixin, View):
    template_name = 'authentication/protected_space.html'
    login_url = '/login/'

    def get(self, request, *args, **kwargs):
        user = request.user
        if user.role == 2:
            return self.admin_dashboard(request)
        elif user.role == 1 :
            return self.moderator_dashboard(request)
        else:
            return render(request, self.template_name)

    def admin_dashboard(self, request):
        return render(request, 'authentication/admin_dashboard.html')

    def moderator_dashboard(self, request):
        return render(request, 'authentication/moderator_protected_space.html')
