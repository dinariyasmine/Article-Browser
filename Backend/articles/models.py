from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=255)
    institutions = models.JSONField(default=list)
    keywords = models.JSONField(default=list)
    publish_date = models.DateField()
    authors = models.JSONField(default=list)
    abstract = models.TextField()
    integral_text = models.TextField()
    references = models.JSONField(default=list)
    endDate = models.DateField(default='2023-12-31')
    startDate = models.DateField(default='2023-12-31')  
    
