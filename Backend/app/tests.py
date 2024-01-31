from django.test import TestCase, Client
from django.db import transaction
from django.urls import reverse
from .models import Article, Author, Keyword, Institution, Reference, UserFavorite
from django.contrib.auth import get_user_model



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
            response1 = self.client.get(reverse('index_articles', args=[article1.id]))
            print(response1.content.decode())
            print(response1.status_code)
            self.assertEqual(response1.status_code, 200)

        except Exception as e:
            self.fail(f"Integration test failed: {str(e)}")

        finally:
            # Clean up or additional logging can be done here if needed
            pass




class SearchingTestCase(TestCase):
    def setUp(self):
        # Create a test client
        self.client = Client()

    @transaction.atomic
    def test_integration(self):
        try:
            # Create a sample article
            author1 = Author.objects.create(name='John Do')
            institution1 = Institution.objects.create(name='University Ac')
            keyword1 = Keyword.objects.create(name='Tech')
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
            response1 = self.client.get(reverse('index_articles', args=[article1.id]))
            print(response1.content.decode())
            print(response1.status_code)
            self.assertEqual(response1.status_code, 200)

             # Create sample articles
            author2 = Author.objects.create(name='Jan Smith')
            institution2 = Institution.objects.create(name='University Bc')
            keyword2 = Keyword.objects.create(name='Tech')
            reference2 = Reference.objects.create(name='Reference2')

            article2 = Article.objects.create(
                title='Sample Article B',
                abstract='This is the abstract of sample article B.',
                full_text='This is the full text of sample article B.',
                pdf_url='https://example.com/sample-article-B.pdf',
            )
            article2.authors.add(author2)
            article2.institutions.add(institution2)
            article2.keywords.add(keyword2)
            article2.references.add(reference2)

            # Index article
            response2 = self.client.get(reverse('index_articles', args=[article2.id]))
            print(response2.content.decode())
            print(response2.status_code)
            self.assertEqual(response2.status_code, 200)

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




class FavoritesTestCase(TestCase):
    def setUp(self):
        # Create a test user
        self.user = get_user_model().objects.create_user(
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

    def test_add_to_favorites(self):
        # Log in the test user
        self.client.login(username='testuser', password='testpassword')

        # Get the URL for adding the article to favorites
        url = reverse('add_to_favorites', args=[self.article.id])

        # Make a POST request to add the article to favorites
        response = self.client.post(url)

        # Check if the response is successful (status code 200)
        self.assertEqual(response.status_code, 200)

        # Check if the article is now in the user's favorites
        self.assertTrue(UserFavorite.objects.filter(user=self.user, article=self.article).exists())

        # Print the inserted data
        favorite_articles = UserFavorite.objects.filter(user=self.user).values_list('article', flat=True)
        inserted_data = UserFavorite.objects.get(user=self.user, article=self.article)
        print("Inserted User:", inserted_data.user)
        print("Article:", inserted_data.article)