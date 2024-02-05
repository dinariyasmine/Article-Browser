from elasticsearch_dsl import Document, Text, Keyword, Date, Boolean
from elasticsearch_dsl.connections import connections

# Specify the complete Elasticsearch URL
connections.create_connection(
    hosts=['http://elasticsearch:9200'],
    headers={'Content-Type': 'application/json'},
)




class ArticleIndex(Document):
    title = Text(analyzer='snowball', fields={'raw': Keyword()})
    abstract = Text(analyzer='snowball')
    authors = Text(analyzer='snowball')
    institutions = Text(analyzer='snowball')
    keywords = Text(analyzer='snowball')
    references = Text(analyzer='snowball')
    text = Text(analyzer='snowball')
    pdf_url = Keyword()
    validated = Boolean()  # Add the validated field
    date = Date()  # Add the Date field

    class Index:
        name = 'article_index'
        
        
