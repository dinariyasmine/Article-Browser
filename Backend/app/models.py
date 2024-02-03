# yourappname/models.py

from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Keyword(models.Model):
    """
    Model representing a keyword associated with an article.
    """
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Institution(models.Model):
    """
    Model representing an institution associated with an article.
    """
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Author(models.Model):
    """
    Model representing an author of an article.
    """
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Article(models.Model):
    """
    Model representing an article.
    """
    title = models.CharField(max_length=255)
    abstract = models.TextField()
    authors = models.ManyToManyField(Author)
    institutions = models.ManyToManyField(Institution)
    keywords = models.ManyToManyField(Keyword)
    references = models.TextField()
    full_text = models.TextField()
    pdf_url = models.URLField()
    validated = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class UserFavorite(models.Model):
    """
    Model representing a user's favorite article.
    """
    user_id = models.IntegerField()
    article_id = models.IntegerField()

    class Meta:
        unique_together = ('user_id', 'article_id')

    def __str__(self):
        return f"{self.user_id} - {self.article_id}"
