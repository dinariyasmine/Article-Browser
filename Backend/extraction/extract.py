from openai import OpenAI
import fitz
import re
from app.models import Article,Author,Institution,Keyword

def lire_pdf_first_page(chemin_du_pdf):
    """
    Reads the text content of the first page of a PDF document.

    Parameters:
        chemin_du_pdf (str): The path to the PDF file.

    Returns:
        str: The text content of the first page.
    """
    # Open the PDF document
    doc = fitz.open(chemin_du_pdf)

    # Access the first page
    page = doc[0]

    # Get the text content of the first page
    texte_page = page.get_text()

    # Close the PDF document
    doc.close()

    return texte_page


def lire_pdf(chemin_du_pdf):
    """
    Reads the entire text content of a PDF document.

    Parameters:
        chemin_du_pdf (str): The path to the PDF file.

    Returns:
        str: The concatenated text content of all pages.
    """
    # Open the PDF document
    doc = fitz.open(chemin_du_pdf)

    # Initialize an empty string to store the complete text
    texte_complet = ""

    # Iterate through all pages in the PDF document
    for page_num in range(doc.page_count):
        # Access each page
        page = doc[page_num]

        # Get the text content of the page
        texte_page = page.get_text()

        # Concatenate the text content of each page
        texte_complet += texte_page

    # Close the PDF document
    doc.close()

    return texte_complet


def extract_information_from_pdf(chemin_du_pdf):
    """
    Extracts information from a PDF document using OpenAI's GPT-3.5-turbo model.

    Parameters:
        chemin_du_pdf (str): The path to the PDF file.

    Returns:
        Article: An instance of the Article model containing extracted information.
    """
    # Open the PDF document
    pdf_document = fitz.open(stream=chemin_du_pdf, filetype="pdf")

    # Access information about the PDF
    number_of_pages = pdf_document.page_count

    # Get text from the first page
    first_page = pdf_document[0]
    first_page_text = first_page.get_text()

    # Initialize OpenAI client
    client = OpenAI(
        api_key="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"
    )

    # Define a prompt for the OpenAI chat-based completion
    prompt = "From the provided page of the PDF, please extract the following information exactly as it appears in the text and present it in the specified format:\n Title: [the title] \n Keywords: [keyword1, keyword2, ...] \n Institution: [institution name] \n Authors' names: [author name 1, author name 2, ...] \n Abstract: [the complete text of the abstract]\n here is the text extracted from the PDF : " + first_page_text

    # Use OpenAI chat-based completion to extract information
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt
            },
        ],
        model="gpt-3.5-turbo"
    )

    # Print the generated completion
    print(chat_completion.choices[0].message.content)

    # Regular expressions to extract information from the OpenAI completion
    dt_title = re.compile("(?<=Title: ).+")
    dt_keywords = re.compile("(?<=Keywords: ).+")
    dt_institution = re.compile("(?<=Institution: ).+")
    dt_authors = re.compile("(?<=Authors' names: ).+")
    dt_abstract = re.compile("(?<=Abstract: ).+")

    # Extracted information from the OpenAI completion
    title = dt_title.search(chat_completion.choices[0].message.content).group(0) if dt_title.search(
        chat_completion.choices[0].message.content) is not None else ''
    keywords = dt_keywords.search(chat_completion.choices[0].message.content).group(0).split(
        ', ') if dt_keywords.search(chat_completion.choices[0].message.content) is not None else []
    institution = dt_institution.search(chat_completion.choices[0].message.content).group(
        0).split(', ') if dt_institution.search(chat_completion.choices[0].message.content) is not None else []
    authors = dt_authors.search(chat_completion.choices[0].message.content).group(
        0).split(', ') if dt_authors.search(chat_completion.choices[0].message.content) is not None else []
    abstract = dt_abstract.search(chat_completion.choices[0].message.content).group(
        0) if dt_abstract.search(chat_completion.choices[0].message.content) is not None else ''

    # Print extracted information for verification
    print('\n')
    print(abstract)
    print('\n')
    print(authors)
    print('\n')
    print(institution)
    print('\n')
    print(keywords)
    print('\n')
    print(title)

    # Extract full text and references from the entire PDF
    pdf_full_text = ""
    for page_num in range(number_of_pages):
        page = pdf_document[page_num]
        text_page = page.get_text()
        pdf_full_text += text_page

    # Find the index of the keywords "Introduction" or "Motivation"
    index_intro_motivation = min(
        pdf_full_text.find("Introduction"),
        pdf_full_text.find("Motivation"),
        key=lambda x: x if x != -1 else float('inf')
    )

    index_intro_motivation = min(
        pdf_full_text.find("Introduction"),
        pdf_full_text.find("Motivation"),
        pdf_full_text.find("INTRODUCTION"),
        pdf_full_text.find("USE CASES"),
        pdf_full_text.find("CASES"),
        key=lambda x: x if x != -1 else float('inf')
    )


    # Find the index of the keyword "References"
    index_references = min(
        pdf_full_text.find("REFERENCES"),
        pdf_full_text.find("References"),
        key=lambda x: x if x != -1 else float('inf')
    )

    # Extract everything between "Introduction" and "References"
    text_integral = pdf_full_text[index_intro_motivation:index_references]

    # Extract references
    references = pdf_full_text[index_references + len("References"):]

    # Retrieve or create Author instances for each author name
    author_instances = [Author.objects.get_or_create(name=author_name)[0] for author_name in authors]

    # Retrieve or create Institution instances for each institution name
    institution_instances = [Institution.objects.get_or_create(name=institution_name)[0] for institution_name in institution]

    # Retrieve or create Keyword instances for each keyword
    keyword_instances = [Keyword.objects.get_or_create(name=keyword)[0] for keyword in keywords]

    # Create the Article instance
    article_instance = Article.objects.create(
        title=title,
        abstract=abstract,
        full_text=text_integral,
        pdf_url='vide',
        references=references,
    )
    
    # Use set() method to assign values to many-to-many fields
    article_instance.authors.set(author_instances)
    article_instance.institutions.set(institution_instances)
    article_instance.keywords.set(keyword_instances)

    # Close the PDF document
    pdf_document.close()

    return article_instance