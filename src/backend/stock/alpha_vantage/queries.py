class QueryBuilder:
    '''
    QueryBuilder: Class to create queries to AlphaVantage for a particular stock to retrieve 
                  time-series set.
                  Returns queries in format {'day': url, 'month': url}
    '''
    def __init__(self, ticker):
        self.API_KEY_ALPHAVANTAGE = "&apikey=4YQOSWHV8VSJ29ND" # Normally stored as env var and called from os
        self.url = "https://www.alphavantage.co/query?function="
        self.ticker = "&symbol=" + ticker
    
    # Return day and month queries
    def queries(self):
        queries = {}
        queries['day'] = QueryBuilder._joiner(self, 'TIME_SERIES_DAILY')
        queries['month'] = QueryBuilder._joiner(self, 'TIME_SERIES_MONTHLY')
        return queries
    
    # Construct URL with vars
    def _joiner(self, time_period_function):
        return self.url + time_period_function + self.ticker + self.API_KEY_ALPHAVANTAGE