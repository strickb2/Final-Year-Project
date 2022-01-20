from .queries import QueryBuilder
from datetime import datetime
import requests

class TimeSeries:
    ''' 
    TimeSeries: Formats data from Alpha Vantage for frontend use
    '''
    def __init__(self, ticker):
        self.ticker = ticker
        self.queries = self._queries()
    
    def graph_data(self):
        graph_data = {}
        for time_period in self.queries:
            graph_data[time_period] = self._get_data(self.queries[time_period])
            break
        graph_data = self._time_period_format(graph_data)
        return graph_data
    
    def _queries(self):
        return QueryBuilder(self.ticker).queries()
    
    def _get_data(self, url):
        response = requests.get(url)
        data = response.json()
        return data
    
    def _time_period_format(self, data):
        result = {}
        for time_period in data:
            if time_period == "day":
                result[time_period] = {}
                time_period_data = data[time_period]['Time Series (Daily)'] # Gets the list of day instances
            if time_period == "month":
                result[time_period] = {}
                time_period_data = data[time_period]['Time Series (Monthly)'] # Gets the list of month instances
            # else:
                # Raise Error
            
            result[time_period]['x_labels'] = []
            result[time_period]['y_labels'] = []

            # Format first 20 dates for x-axis of chart
            dates = list(time_period_data.keys())
            for date in dates[:20]:
                date_split = datetime.strptime(date, "%Y-%m-%d")
                result[time_period]['x_labels'].append(date_split.strftime('%d %b'))
                # Add corresponding close value for given date to y-axis
                result[time_period]['y_labels'].append(time_period_data[date]['4. close'])

            return result
            
    
    
    # data = {
    #     'current' : 1203
    #     'graph': {
    #         'day': {
    #             'x_label' : [1,2,3],
    #             'y_label' : ['a','b','c']
    #         },
    #         'month': {
    #             'x_label' : [1,2,3],
    #             'y_label' : ['a','b','c']
    #         }
    #     }
    # }
