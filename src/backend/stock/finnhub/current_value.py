import requests, json

class CurrentValue:
    def __init__(self, ticker):
        self.ticker = ticker
        self.url = "https://finnhub.io/api/v1/quote?symbol=" + self.ticker + "&token=c7nf1t2ad3ifj5l0ckug"
    
    def get_values(self):
        response = requests.get(self.url)
        data = response.json()
        return data