from datetime import date, timedelta

class QueryBuilder:
    '''
    QueryBuilder: Class to create queries to AlphaVantage for a particular stock to retrieve 
                  time-series set.
                  Returns queries in format {'day': url, 'month': url}
    '''
    def __init__(self, query):
        self.API_KEY_GOOGLENEWS = "&apikey=103bf205dc1f4ceabff77c4c05584253" # Normally stored as env var and called from os
        self.url = "https://newsapi.org/v2/everything?"
        self.q = "q=" + str(query)
    
    # Return day and month queries
    def query(self):
        return self._joiner()
    
    # Construct URL with vars
    def _joiner(self):
        from_date = "&from=" + str((date.today() - timedelta(days=1)).strftime('%Y-%m-%d')) # Oldest date to get article
        sort_by = "&sortby=relevancy"
        language = "&language=en"
        page_size = "&pageSize=5"
        return self.url + self.q + sort_by + from_date + language + page_size + self.API_KEY_GOOGLENEWS
