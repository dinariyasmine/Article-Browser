from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from extraction.extract import extract_information_from_pdf
import os  # Import the os module here

class AddArticleView(APIView):
    def post(self, request, *args, **kwargs):
        # Assurez-vous que votre modèle d'article est importé
        # from .models import Article

        # Traitement du fichier ici (extraction d'informations, sauvegarde en base de données, etc.)
        file = request.FILES.get('file')
        # Utilisez votre fonction d'extraction ici.
        print('done')
        pdf_path = os.path.abspath('./Article_01.pdf')
        extract_information_from_pdf(pdf_path)
        # Exemple : sauvegarde en base de données
        # article = Article.objects.create(file=file, other_field=other_value)
        # article.save()

        # Exemple de réponse
        return Response({'message': 'Article ajouté avec succès!'}, status=status.HTTP_201_CREATED)
