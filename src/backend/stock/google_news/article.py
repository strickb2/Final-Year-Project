from .queries import QueryBuilder
import requests, json

class GoogleNews:
    def __init__(self, query):
        self.query = query
    
    def getArticles(self):
        titles = []
        data = self._get_data()
        if data['status'] == 'ok':
            i = 0
            for article in data['articles']:
                if article['title'] in titles:
                    del data['articles'][i]
                else:
                    titles.append(article['title'])
                    i+=1
            return data
        else:
            return {'error': 'No News Available at this time'}

    def _get_data(self):
        url = QueryBuilder(self.query).query()
        response = requests.get(url)
        data = response.json()
        return data