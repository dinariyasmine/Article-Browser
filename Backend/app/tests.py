# Import necessary modules
from django.test import TestCase, Client
from django.db import transaction
from django.urls import reverse
from app.models import Article, Author, Keyword, Institution, UserFavorite
from django.contrib.auth import get_user_model
import json
from app.views import index_article, index_articles
from django.forms.models import model_to_dict
from elasticsearch_dsl.connections import connections
from elasticsearch.exceptions import NotFoundError
from django.utils import timezone
from app.views import index_articles

# Test case for indexing articles
class IndexingTestCase(TestCase):
    """
    Test case for indexing articles.
    """
    def setUp(self):
        # Create a test client
        self.client = Client()

    @transaction.atomic
    def test_integration(self):
        """
        Integration test for indexing articles.
        """
        try:
            # Create a sample article
            author1 = Author.objects.create(name='John Do')
            institution1 = Institution.objects.create(name='University Ac')
            keyword1 = Keyword.objects.create(name='Sciences')

            article1 = Article.objects.create(
                title='Sample Article ZZZ',
                abstract='This is the abstract of sample article A.',
                full_text='This is the full text of sample article A.',
                pdf_url='https://example.com/sample-article-A.pdf',
                references='These are the references of sample article A.',
            )
            article1.authors.add(author1)
            article1.institutions.add(institution1)
            article1.keywords.add(keyword1)

            # Call the indexing function
            response = index_articles(article1)

            # Check if indexing was successful
            self.assertEqual(response.status_code, 200)

            # Parse the content using json.loads
            content = json.loads(response.content.decode('utf-8'))
            self.assertEqual(content['status'], 'success')

            # Add additional assertions if needed

        except Exception as e:
            self.fail(f"Integration test failed: {str(e)}")

        finally:
            # Clean up or additional logging can be done here if needed
            pass

# Test case for searching articles
class SearchingTestCase(TestCase):
    """
    Test case for searching articles.
    """
    def setUp(self):
        # Create a test client
        self.client = Client()
        author1 = Author.objects.create(name='John Do')
        institution1 = Institution.objects.create(name='University Ac')
        keyword1 = Keyword.objects.create(name='Sciences')
        article1 = Article.objects.create(
            title='Sample Article A',
            abstract='This is the abstract of sample article A',
            full_text='This is the full text of sample article A',
            pdf_url='https://example.com/sample-article-A.pdf',
            references='These are the references of sample article A.',
            validated=True,
        )
        article1.authors.add(author1)
        article1.institutions.add(institution1)
        article1.keywords.add(keyword1)
        index_articles(article1)

    @transaction.atomic
    def test_integration(self):
        """
        Integration test for searching articles.
        """
        try:
            # Search for sample article2 by keyword
            search_query = 'Sciences'
            url = reverse('search_articles')
            data = {'query': search_query}
            response = self.client.post(url, data=data, content_type='application/json')
            print(response.content.decode())
            print(response.status_code)
            self.assertEqual(response.status_code, 200)

            search_query = 'Sample Article A'
            url = reverse('search_articles')
            data = {'query': search_query}
            response = self.client.post(url, data=data, content_type='application/json')
            print(response.content.decode())
            print(response.status_code)
            self.assertEqual(response.status_code, 200)

            search_query = 'John Do'
            url = reverse('search_articles')
            data = {'query': search_query}
            response = self.client.post(url, data=data, content_type='application/json')
            print(response.content.decode())
            print(response.status_code)
            self.assertEqual(response.status_code, 200)

        except Exception as e:
            self.fail(f"Integration test failed: {str(e)}")

        finally:
            # Clean up or additional logging can be done here if needed
            pass

# Test case for adding articles to favorites
class AddFavoritesTestCase(TestCase):
    """
    Test case for adding articles to favorites.
    """
    def setUp(self):
        # Create a test user
        User = get_user_model()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )

        # Create a test article
        self.article = Article.objects.create(
            title='Test Article',
            abstract='This is the abstract of the test article.',
            full_text='This is the full text of the test article.',
            pdf_url='https://example.com/test-article.pdf',
            references='These are the references of the test article.',
        )
        # Create a test article
        self.article2 = Article.objects.create(
            title='Test Article2',
            abstract='This is the abstract of the test article2.',
            full_text='This is the full text of the test article2.',
            pdf_url='https://example.com/test-article2.pdf',
            references='These are the references of the test article2.',
        )

    def test_add_to_favorites(self):
        """
        Test for adding articles to favorites.
        """
        # Log in the test user
        self.client.login(username='testuser', password='testpassword')

        # Get the URL for adding the article to favorites
        url = reverse('add_to_favorites')

        # Make a POST request to add the article to favorites
        response = self.client.post(url, json.dumps({'user_id': self.user.id, 'article_id': self.article.id}),
                                    content_type='application/json')

        # Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200)

        # Check if the article is now in the user's favorites
        user_favorites = UserFavorite.objects.filter(user_id=self.user.id, article_id=self.article.id)
        print("User Favorites:", user_favorites)

        self.assertTrue(user_favorites.exists())

        # Print the inserted data
        inserted_data = user_favorites.first()
        print("Inserted User ID:", inserted_data.user_id)
        print("Article ID:", inserted_data.article_id)

# Test case for getting favorite articles
class GetFavoriteArticlesTestCase(TestCase):
    """
    Test case for getting favorite articles.
    """
    def setUp(self):

        # Create a test user
        User = get_user_model()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )
        self.user_id = self.user.id

        # Create two articles
        article1 = Article.objects.create(title="Article 1", abstract="Abstract 1", full_text="Text 1",
                                          pdf_url="https://example.com/1.pdf")
        article2 = Article.objects.create(title="Article 2", abstract="Abstract 2", full_text="Text 2",
                                          pdf_url="https://example.com/2.pdf")
        index_article(model_to_dict(article1), article1.id)
        index_article(model_to_dict(article2), article2.id)

        # Add the articles to the user's favorites
        self.article_ids = [article1.id, article2.id]
        for article_id in self.article_ids:
            UserFavorite.objects.create(user_id=self.user_id, article_id=article_id)

    def test_get_favorite_articles(self):
        """
        Test for getting favorite articles.
        """
        # Simulate a request to get favorite articles for the test user
        client = Client()
        url = reverse('get_favorite_articles')
        response = client.post(
            url,
            data={'user_id': self.user_id},
            content_type='application/json'
        )

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        response_data = response.json()

        # Add more detailed assertions or logging based on the response_data
        if 'error' in response_data:
            print(f"Error message: {response_data['error']}")
            if 'message' in response_data:
                print(f"Detailed error message: {response_data['message']}")
        elif 'favorite_articles' in response_data:
            print(f"Favorite articles: {response_data['favorite_articles']}")

# Test case for modifying articles
class ModifyArticleTestCase(TestCase):
    """
    Test case for modifying articles.
    """
    def setUp(self):
        # Create an article for testing
        self.article = Article.objects.create(
            title="Test Article",
            abstract="Test Abstract",
            full_text="Test Text",
            pdf_url="https://example.com/test.pdf",
            date=timezone.now(),
            references='Test references',
        )

        # Create authors, institutions, keywords, and references
        author_a = Author.objects.create(name="Author A")
        author_b = Author.objects.create(name="Author B")

        institution_x = Institution.objects.create(name="Institution X")
        institution_y = Institution.objects.create(name="Institution Y")

        keyword_1 = Keyword.objects.create(name="Keyword 1")
        keyword_2 = Keyword.objects.create(name="Keyword 2")

        # Assign authors, institutions, keywords, and references to the article
        self.article.authors.set([author_a, author_b])
        self.article.institutions.set([institution_x, institution_y])
        self.article.keywords.set([keyword_1, keyword_2])

        # Index the article in Elasticsearch
        index_article(model_to_dict(self.article), self.article.id)

    def test_modify_article(self):
        """
        Test for modifying articles.
        """
        # Prepare data for modification
        modified_data = {
            'article_id': self.article.id,
            'title': 'Modified Title',
            'abstract': 'Modified Abstract',
            'full_text': 'Modified Text',
            'pdf_url': 'https://example.com/modified.pdf',
            'references': 'Modified references',
            'validated': True,
            'authors': ["Modified Author A", "Modified Author B"],
            'institutions': ["Modified Institution X", "Modified Institution Y"],
            'keywords': ["Modified Keyword 1", "Modified Keyword 2"],
            'date': (timezone.now()).isoformat()
        }

        # Send a POST request with the new data
        url = reverse('modify_article')
        response = self.client.post(
            url,
            json.dumps(modified_data),
            content_type='application/json'
        )

        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Verify that the new article was indexed in Elasticsearch
        es = connections.get_connection()
        try:
            es_response = es.get(index='article_index', id=str(self.article.id))  # Convert id to string
            updated_article = es_response['_source']
            print(updated_article)

        except NotFoundError:
            self.fail("Article not found in Elasticsearch")

# Test case for retrieving not validated articles
class NotValidatedTestCase(TestCase):
    """
    Test case for retrieving not validated articles.
    """
    def setUp(self):
        # Create a test client
        self.client = Client()

    def test_not_validated_view(self):
        """
        Test for the not validated view.
        """
        # Make a GET request to the view
        url = reverse('not_validated')  # Use the actual URL name you defined in your URLs
        response = self.client.get(url)

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        json_response = response.json()

        # Check if the 'status' key is present in the JSON response
        self.assertIn('status', json_response)

        # Check if the 'status' is 'error' or 'success' based on your implementation
        self.assertIn(json_response['status'], ['error', 'success'])

        if 'result' in json_response:
            # If 'result' is present, check its type or other conditions as needed
            self.assertIsInstance(json_response['result'], list)
            # Add more assertions based on your specific requirements

# Test case for deleting articles
class DeletingTestCase(TestCase):
    """
    Test case for deleting articles.
    """
    # Your existing setup and integration test methods...

    def test_delete_article(self):
        """
        Test for deleting articles.
        """
        try:
            # Create a sample article for testing
            article = Article.objects.create(
                title='Sample Article for Deletion',
                abstract='This is the abstract of the sample article for deletion.'
            )
            index_articles(article)

            # Delete the article
            url_delete = reverse('delete_article')
            data_delete = {'article_id': article.id}
            response_delete = self.client.post(url_delete, data=data_delete, content_type='application/json')
            self.assertEqual(response_delete.status_code, 200)

        except Exception as e:
            self.fail(f"Delete article test failed: {str(e)}")

        finally:
            # Clean up or additional logging can be done here if needed
            pass  
