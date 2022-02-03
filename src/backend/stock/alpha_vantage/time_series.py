from .queries import QueryBuilder
from datetime import datetime
from ..finnhub.current_value import CurrentValue
import requests

class TimeSeries:
    ''' 
    TimeSeries: Formats data from Alpha Vantage for frontend use
    '''
    def __init__(self, ticker):
        self.ticker = ticker
        self.current = CurrentValue(ticker)
        self.queries = self._queries()
    
    def graph_data(self):
        graph_data = {}
        for time_period in self.queries:
            data = self._get_data(self.queries[time_period])
            if 'Note' in data:
                graph_data[time_period] = {'error' : 'API Call Limit'}
            else:
                graph_data[time_period] = data
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
            if 'error' in data[time_period]:
                # Check not 'Error Message'
                result[time_period] = {data[time_period]['error']}
                break
            if time_period == "day":
                result[time_period] = {
                    'x_labels' : [],
                    'y_labels' : []
                }
                time_period_data = data[time_period]['Time Series (Daily)'] # Gets the list of day instances
                
                # Format first 20 dates for x-axis of chart
                dates = list(time_period_data.keys())

                # If it doesnt include todays date
                if str(datetime.now().strftime('%d %b')) in dates:
                    # Start List with todays date
                    result[time_period]['x_labels'].append(str(datetime.now().strftime('%d %b')))
                    # Start List with current stock value
                    result[time_period]['y_labels'].append(str(self.current.get_values()['c']))

                for date in dates[:9]:
                    date_split = datetime.strptime(date, "%Y-%m-%d")
                    result[time_period]['x_labels'].append(date_split.strftime('%d %b'))
                    # Add corresponding close value for given date to y-axis
                    result[time_period]['y_labels'].append(time_period_data[date]['4. close'])
            if time_period == "month":
                result[time_period] = {}
                if 'error' in data[time_period]:
                    # Check not 'Error Message'
                    result[time_period] = {data[time_period]['error']}
                    break
                else:
                    time_period_data = data[time_period]['Monthly Time Series'] # Gets the list of month instances
                    # Start List with todays date
                    result[time_period]['x_labels'] = [str(datetime.now().strftime('%d %b'))]
                    # Start List with current stock value
                    result[time_period]['y_labels'] = [str(self.current.get_values()['c'])]
                    # Format first 20 dates for x-axis of chart
                    dates = list(time_period_data.keys())
                    for date in dates[1:9]:
                        date_split = datetime.strptime(date, "%Y-%m-%d")
                        result[time_period]['x_labels'].append(date_split.strftime('%d %b'))
                        # Add corresponding close value for given date to y-axis
                        result[time_period]['y_labels'].append(time_period_data[date]['4. close'])
            
            result[time_period]['x_labels'].reverse()
            result[time_period]['y_labels'].reverse()
        return result
