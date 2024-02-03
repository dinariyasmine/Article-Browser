from django.core.management.base import BaseCommand
from app.views import create_and_index_random_articles2

class Command(BaseCommand):
    help = 'Creates and indexes random articles'

    def handle(self, *args, **options):
        create_and_index_random_articles2()
        self.stdout.write(self.style.SUCCESS('Random articles created and indexed successfully.'))
