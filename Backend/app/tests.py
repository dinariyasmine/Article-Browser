from django.test import TestCase, Client
from django.db import transaction
from django.urls import reverse


class TestCase(TestCase):
    def setUp(self):
        # Create a test client
        self.client = Client()

    @transaction.atomic
    def test_integration(self):
        try:
            # Create sample articles
            response = self.client.get(reverse('create_sample_articles'))
            print(response.content.decode())  # Output the response content
            print(response.status_code) 
            self.assertEqual(response.status_code, 200)


            # Index articles
            response = self.client.get(reverse('index_articles'))
            print(response.content.decode())  # Output the response content
            print(response.status_code) 
            self.assertEqual(response.status_code, 200)

            # Search for sample articles
            search_query = 'Sample Article A'
            response = self.client.get(reverse('search_articles'), {'q': search_query})
            print(response.content.decode())  # Output the response content
            print(response.status_code) 
            self.assertEqual(response.status_code, 200)

        except Exception as e:
            self.fail(f"Integration test failed: {str(e)}")

        finally:
            # Clean up or additional logging can be done here if needed
            pass
