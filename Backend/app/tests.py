# app/tests.py
from django.test import TestCase
from django.urls import reverse
from django.test import Client
from .models import Article  # Assuming you have an Article model in your app

class SearchFunctionalityTestCase(TestCase):
    def setUp(self):
        # Create a sample Article for testing
        self.sample_article = Article.objects.create(
            title='Sample Article',
            abstract='This is a sample abstract.',
            full_text='This is the full text of the sample article.',
            pdf_url='http://example.com/sample.pdf'
            # Add more fields as needed for your model
        )

    def test_search_articles_view(self):
        # Create a test client
        client = Client()

        # Define the search query
        search_query = 'sample'

        # Make a GET request to the search view
        response = client.get(reverse('search_articles'), {'q': search_query})

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check if the rendered template is correct
        self.assertTemplateUsed(response, 'search_results.html')

        # Check if the search query is present in the context
        self.assertEqual(response.context['query'], search_query)

        # Check if the sample article is present in the response content
        self.assertContains(response, self.sample_article.title)
        self.assertContains(response, self.sample_article.abstract)
        self.assertContains(response, self.sample_article.full_text)
        self.assertContains(response, self.sample_article.pdf_url)
