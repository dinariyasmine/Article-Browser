from django.test import TestCase, Client
from django.db import transaction
from django.urls import reverse
from app.models import Article, Author, Keyword, Institution, Reference, UserFavorite
from django.contrib.auth import get_user_model
import json
from app.views import index_article
from django.forms.models import model_to_dict


class IndexingTestCase(TestCase):
    def setUp(self):
        # Create a test client
        self.client = Client()

    @transaction.atomic
    def test_integration(self):
        try:
            # Create a sample article
            author1 = Author.objects.create(name='John Do')
            institution1 = Institution.objects.create(name='University Ac')
            keyword1 = Keyword.objects.create(name='Sciences')
            reference1 = Reference.objects.create(name='Reference1')

            article1 = Article.objects.create(
                title='Sample Article A',
                abstract='This is the abstract of sample article A.',
                full_text='This is the full text of sample article A.',
                pdf_url='https://example.com/sample-article-A.pdf',
            )
            article1.authors.add(author1)
            article1.institutions.add(institution1)
            article1.keywords.add(keyword1)
            article1.references.add(reference1)

            # Index article
            url = reverse('index_articles')
            data = {'article_id': article1.id}
            response = self.client.post(url, data=data, content_type='application/json')
            print(response.content.decode())
            print(response.status_code)
            self.assertEqual(response.status_code, 200)

        except Exception as e:
            self.fail(f"Integration test failed: {str(e)}")

        finally:
            # Clean up or additional logging can be done here if needed
            pass

#--------------------------------------------------------
        
class SearchingTestCase(TestCase):
    def setUp(self):
        # Create a test client
        self.client = Client()

    @transaction.atomic
    def test_integration(self):
        try:
             # Search for sample article1 by name
            search_query = 'Sample Article A'
            response = self.client.get(reverse('search_articles'), {'q': search_query})
            print(response.content.decode())
            print(response.status_code)
            self.assertEqual(response.status_code, 200)

            # Search for sample article2 by Author
            search_query = 'This is the abstract of sample article A.'
            response = self.client.get(reverse('search_articles'), {'q': search_query})
            print(response.content.decode())
            print(response.status_code)
            self.assertEqual(response.status_code, 200)

        except Exception as e:
            self.fail(f"Integration test failed: {str(e)}")

        finally:
            # Clean up or additional logging can be done here if needed
            pass

#--------------------------------------------------------

class AddFavoritesTestCase(TestCase):
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
        )
        # Create a test article
        self.article2 = Article.objects.create(
            title='Test Article',
            abstract='This is the abstract of the test article.',
            full_text='This is the full text of the test article.',
            pdf_url='https://example.com/test-article.pdf',
        )

    def test_add_to_favorites(self):
        # Log in the test user
        self.client.login(username='testuser', password='testpassword')

        # Get the URL for adding the article to favorites
        url = reverse('add_to_favorites')

        # Make a POST request to add the article to favorites
        response = self.client.post(url, json.dumps({'user_id': self.user.id, 'article_id': self.article.id}), content_type='application/json')

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

#--------------------------------------------------------

class GetFavoriteArticlesTestCase(TestCase):
    def setUp(self):

        # Create a test user
        User = get_user_model()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )
        self.user_id = self.user.id

        # Create two articles
        article1 = Article.objects.create(title="Article 1", abstract="Abstract 1", full_text="Text 1", pdf_url="https://example.com/1.pdf")
        article2 = Article.objects.create(title="Article 2", abstract="Abstract 2", full_text="Text 2", pdf_url="https://example.com/2.pdf")
        index_article(model_to_dict(article1), article1.id)
        index_article(model_to_dict(article2), article2.id)

        # Add the articles to the user's favorites
        self.article_ids = [article1.id, article2.id]
        for article_id in self.article_ids:
            UserFavorite.objects.create(user_id=self.user_id, article_id=article_id)

    def test_get_favorite_articles(self):
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
        print(response_data)  

        # Add more detailed assertions or logging based on the response_data
        if 'error' in response_data:
            print(f"Error message: {response_data['error']}")
            if 'message' in response_data:
                print(f"Detailed error message: {response_data['message']}")
        elif 'favorite_articles' in response_data:
            print(f"Favorite articles: {response_data['favorite_articles']}")


