from .queries import QueryBuilder
import requests, json

class GoogleNews:
    def __init__(self, query):
        self.query = query
    
    def getArticles(self):
        return self._get_data(QueryBuilder(self.query).query())

    def _get_data(self, url):
        response = requests.get(url)
        data = response.json()
        return data