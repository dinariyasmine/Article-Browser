# yourappname/models.py

from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Keyword(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Institution(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Reference(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Article(models.Model):
    title = models.CharField(max_length=255)
    abstract = models.TextField()
    authors = models.ManyToManyField(Author)
    institutions = models.ManyToManyField(Institution)
    keywords = models.ManyToManyField(Keyword)
    references = models.ManyToManyField(Reference)
    full_text = models.TextField()
    pdf_url = models.URLField()
    validated = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    

class UserFavorite(models.Model):
    user_id = models.IntegerField()
    article_id = models.IntegerField()
    class Meta:
        unique_together = ('user_id', 'article_id')
    def __str__(self):
        return f"{self.user_id} - {self.article_id}"