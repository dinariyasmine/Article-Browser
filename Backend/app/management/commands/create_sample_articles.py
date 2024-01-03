# create_sample_articles.py
from django.core.management.base import BaseCommand
from datetime import date
from app.models import Article, Author, Keyword, Institution, Reference

class Command(BaseCommand):
    help = 'Create sample articles for testing'

    def handle(self, *args, **options):
        # Create sample authors
        author1 = Author.objects.create(name='John Doe')
        author2 = Author.objects.create(name='Jane Smith')

        # Create sample institutions
        institution1 = Institution.objects.create(name='University A')
        institution2 = Institution.objects.create(name='University B')

        # Create sample keywords
        keyword1 = Keyword.objects.create(name='Science')
        keyword2 = Keyword.objects.create(name='Technology')

        # Create sample references
        reference1 = Reference.objects.create(name='Reference A')
        reference2 = Reference.objects.create(name='Reference B')

        # Create sample articles
        article1 = Article.objects.create(
            title='Sample Article 1',
            abstract='This is the abstract of sample article 1.',
            full_text='This is the full text of sample article 1.',
            pdf_url='https://example.com/sample-article-1.pdf',
        )
        article1.authors.add(author1)
        article1.institutions.add(institution1)
        article1.keywords.add(keyword1, keyword2)
        article1.references.add(reference1, reference2)

        article2 = Article.objects.create(
            title='Sample Article 2',
            abstract='This is the abstract of sample article 2.',
            full_text='This is the full text of sample article 2.',
            pdf_url='https://example.com/sample-article-2.pdf',
        )
        article2.authors.add(author2)
        article2.institutions.add(institution2)
        article2.keywords.add(keyword2)
        article2.references.add(reference1)

        self.stdout.write(self.style.SUCCESS('Sample articles created successfully.'))
