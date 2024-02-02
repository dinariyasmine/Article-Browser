from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from extraction.extract import extract_information_from_pdf
import os  # Import the os module here

class AddArticleView(APIView):
    def post(self, request, *args, **kwargs):
        # # Assurez-vous que votre modèle d'article est importé
        # # from .models import Article

        # # Traitement du fichier ici (extraction d'informations, sauvegarde en base de données, etc.)
        # file = request.FILES.get('file')
        # # Utilisez votre fonction d'extraction ici.
        # print('done')
        # pdf_path = os.path.abspath('./Article_01.pdf')
        # extract_information_from_pdf(pdf_path)
        # # Exemple : sauvegarde en base de données
        # # article = Article.objects.create(file=file, other_field=other_value)
        # # article.save()

        file = request.FILES.get('file')

        # Lisez le contenu du fichier PDF en mémoire
        pdf_content = file.read()

        # Utilisez PyMuPDF pour extraire les informations du PDF
        extract_information_from_pdf(pdf_content)
        print('done')
        # Le reste de votre traitement

        # Renvoyez une réponse JSON avec le résultat de l'extraction
        # return JsonResponse({'message': 'Extraction réussie!', 'extraction_result': extraction_result})

        # Exemple de réponse
        return Response({'message': 'Article ajouté avec succès!'}, status=status.HTTP_201_CREATED)

# from django.shortcuts import render
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from extraction.extract import extract_information_from_pdf
# import os  # Import the os module here
# from django.core.files.storage import default_storage
# from django.core.files.base import ContentFile
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator


# class AddArticleView(APIView):
#     @method_decorator(csrf_exempt)
#     def post(self, request, *args, **kwargs):
#         file = request.FILES.get('file')

#         # Obtenez le nom du fichier
#         filename = file.name

#         # Enregistrez le fichier dans le stockage par défaut de Django (peut être ajusté en fonction de vos besoins)
#         file_path = default_storage.save(filename, ContentFile(file.read()))

#         # Utilisez le chemin complet du fichier pour votre extraction d'informations
#         extract_information_from_pdf(file_path)

#         # Le reste de votre traitement

#         return JsonResponse({'message': 'Extraction réussie!'})


