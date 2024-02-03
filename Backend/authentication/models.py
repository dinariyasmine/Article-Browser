# authentication/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Custom user model extending AbstractUser

    # User-specific fields
    username = models.CharField(max_length=150, unique=True)  # User's username
    email = models.EmailField(unique=True)  # User's email address
    role = models.IntegerField(default=0)  # Custom role field for user's role
