from openai import OpenAI
import fitz
import re
from app.models import Article,Author,Reference,Institution,Keyword


# def lire_pdf_first_page(chemin_du_pdf, sortie_texte):
#     doc = fitz.open(chemin_du_pdf)

#     with open(sortie_texte, 'w', encoding='utf-8') as fichier_texte:
#             # Première page
#             page = doc[0]
#             texte_page = page.get_text()
#             fichier_texte.write(texte_page)
            
            
#     doc.close()

def lire_pdf_first_page(chemin_du_pdf):
    doc = fitz.open(chemin_du_pdf)

    # Première page
    page = doc[0]
    texte_page = page.get_text()

    doc.close()

    return texte_page

# def lire_pdf(chemin_du_pdf, sortie_texte):
#     doc = fitz.open(chemin_du_pdf)

#     with open(sortie_texte, 'w', encoding='utf-8') as fichier_texte:
#             for page_num in range(doc.page_count):
#                 page = doc[page_num]
#                 texte_page = page.get_text()
#                 fichier_texte.write(texte_page)
            
            
#     doc.close()

def lire_pdf(chemin_du_pdf):
    doc = fitz.open(chemin_du_pdf)
    texte_complet = ""

    for page_num in range(doc.page_count):
        page = doc[page_num]
        texte_page = page.get_text()
        texte_complet += texte_page

    doc.close()

    return texte_complet



def extract_information_from_pdf(chemin_du_pdf):
    # chemin_du_pdf = './Articles/Article_10.pdf'
    # sortie_texte = 'out.txt'

    # lire_pdf_first_page(chemin_du_pdf, sortie_texte)
    premiere_page=lire_pdf_first_page(chemin_du_pdf)

    # file_path = 'out.txt'  
    # with open(file_path, 'r', encoding='utf-8') as file:
    #     file_content = file.read()


    client = OpenAI(
        api_key="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"
    )

    # prompt="From the provided page of the PDF, please extract the following information exactly as it appears in the text and present it in the specified format: \n Title: [the title] \n Keywords: [keyword1, keyword2, ...] \n Institution: [institution name] \n Authors' names: [author name 1, author name 2, ...] \n Abstract: [the complete text of the abstract] \n here is the text extracted from the PDF : "+file_content
    prompt="From the provided page of the PDF, please extract the following information exactly as it appears in the text and present it in the specified format: \n Title: [the title] \n Keywords: [keyword1, keyword2, ...] \n Institution: [institution name] \n Authors' names: [author name 1, author name 2, ...] \n Abstract: [the complete text of the abstract] \n here is the text extracted from the PDF : "+premiere_page


    chat_completion = client.chat.completions.create(
        messages = [
            {
                "role":"user",
                "content":prompt
            },    
        ],
        model="gpt-3.5-turbo"
    )

    print(chat_completion.choices[0].message.content)

    dt_title = re.compile("(?<=Title: ).+")
    # The Title var
    if dt_title.search(chat_completion.choices[0].message.content) is not None:
        title=dt_title.search(chat_completion.choices[0].message.content).group(0)
    else:
        title=''

    dt_keywords = re.compile("(?<=Keywords: ).+")
    # The keywords var
    if dt_keywords.search(chat_completion.choices[0].message.content) is not None:
        keywords=dt_keywords.search(chat_completion.choices[0].message.content).group(0)
        mots_cles = keywords.split(', ')
    else:
        mots_cles=[]


    dt_institution = re.compile("(?<=Institution: ).+")
    # The institution var
    if dt_institution.search(chat_completion.choices[0].message.content) is not None:
        institution=dt_institution.search(chat_completion.choices[0].message.content).group(0)
        institutions=institution.split(', ')
    else:
        institutions=[]

    dt_authors = re.compile("(?<=Authors' names: ).+")
    # The authors var
    if dt_authors.search(chat_completion.choices[0].message.content) is not None:
        authors=dt_authors.search(chat_completion.choices[0].message.content).group(0)
        auteurs = authors.split(', ')
    else:
        auteurs=[]

    dt_abstract = re.compile("(?<=Abstract: ).+")
    # The Abstract var
    if dt_abstract.search(chat_completion.choices[0].message.content) is not None:
        abstract=dt_abstract.search(chat_completion.choices[0].message.content).group(0)
    elif re.compile("(?<=Abstract:\n).+").search(chat_completion.choices[0].message.content) is not None:
        abstract=dt_abstract.search(chat_completion.choices[0].message.content).group(0)
    elif re.compile("(?<=Abstract: \n).+").search(chat_completion.choices[0].message.content) is not None:
        abstract=dt_abstract.search(chat_completion.choices[0].message.content).group(0)
    else:
        abstract=''


    print('\n')
    print(abstract)
    print('\n')
    print(auteurs)
    print('\n')
    print(institution)
    print('\n')
    print(mots_cles)
    print('\n')
    print(title)


    # Extraction text integral
    # lire_pdf(chemin_du_pdf,sortie_texte)
    pdf_complet= lire_pdf(chemin_du_pdf)
    # with open(sortie_texte, 'r', encoding='utf-8') as file:
    #     file_content = file.read()

    # Trouver l'index du mot-clé "Introduction" ou "Motivation"
    index_intro_motivation = min(
        pdf_complet.find("Introduction"),
        pdf_complet.find("Motivation"),
        key=lambda x: x if x != -1 else float('inf')
    )

    # Trouver l'index du mot-clé "References" ou "REFERENCES"
    index_references = min(
        pdf_complet.find("REFERENCES"), 
        pdf_complet.find("References"), 
        key=lambda x: x if x != -1 else float('inf')
    )

    # Extraire tout ce qui se trouve entre "Introduction" et "References"
    text_integral = pdf_complet[index_intro_motivation:index_references]

    # Extraire les references
    references = pdf_complet[index_references + len("References"):]

    print(text_integral)
    print('\n')
    print(references)
    
    # Retrieve or create Author instances for each author name
    author_instances = [Author.objects.get_or_create(name=author_name)[0] for author_name in auteurs]

    # Retrieve or create Institution instances for each institution name
    institution_instances = [Institution.objects.get_or_create(name=institution_name)[0] for institution_name in institutions]

    # Retrieve or create Keyword instances for each keyword
    keyword_instances = [Keyword.objects.get_or_create(name=keyword)[0] for keyword in mots_cles]

    # Retrieve or create Reference instances for each reference
    # reference_instances = [Reference.objects.get_or_create(name=reference)[0] for reference in references]

    # Create the Article instance
    article_instance = Article.objects.create(
        title=title,
        abstract=abstract,
        full_text=text_integral,  
        pdf_url=chemin_du_pdf,      
    )

    # Use set() method to assign values to many-to-many fields
    article_instance.authors.set(author_instances)
    article_instance.institutions.set(institution_instances)
    article_instance.keywords.set(keyword_instances)
    # article_instance.references.set(reference_instances)

    return article_instance