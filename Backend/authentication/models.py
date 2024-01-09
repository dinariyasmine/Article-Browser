# authentication/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    ROLE_CHOICES = [
        (0, 'User'),
        (1, 'Moderator'),
        (2, 'Admin'),
    ]
    role = models.IntegerField(choices=ROLE_CHOICES, default=0)

