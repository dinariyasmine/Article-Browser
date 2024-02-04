from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from extraction.extract import extract_information_from_pdf
import os  # Import the os module here
from django.urls import reverse
from django.test import Client
from app.views import index_articles
import json

class AddArticleView(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')

        # Lisez le contenu du fichier PDF en mémoire
        pdf_content = file.read()

        # Utilisez PyMuPDF pour extraire les informations du PDF
        article1=extract_information_from_pdf(pdf_content)
        article1.pdf_url=file.name
        print('done extraction')

        # Indexation Article
        response = index_articles(article1)

        # Exemple de réponse
        return Response({'message': 'Article ajouté avec succès!'}, status=status.HTTP_201_CREATED)

