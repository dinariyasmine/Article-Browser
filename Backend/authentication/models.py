# authentication/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True) 
    email = models.EmailField(unique=True)
    is_moderator = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
