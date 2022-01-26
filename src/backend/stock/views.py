import requests
from rest_framework import viewsets, generics, filters
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .alpha_vantage.time_series import TimeSeries
from .google_news.article import GoogleNews


# ----------------------- Model View Sets ------------------------

class APIUserViewSet(viewsets.ModelViewSet):
    '''
    API Endpoint: Returns the current User object
    '''
    queryset = APIUser.objects.all()
    serializer_class = APIUserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        pk = self.kwargs.get('pk')
        if pk == "current":
            return self.request.user

        return super(APIUserViewSet, self).get_object()

class StockViewSet(viewsets.ModelViewSet):
    '''
    API Endpoint: Lists the stored Stocks Data
    '''
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = [AllowAny] # No login required
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'ticker']

class TransactionViewSet(viewsets.ModelViewSet):
    '''
    API Endpoint: Lists All Transactions
    '''
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer    
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Transaction.objects.all()
        else:
            return Transaction.objects.filter(user_id=user.id)

class StockBalanceViewSet(viewsets.ModelViewSet):
    '''
    API Endpoint: Lists User Stock Balance
    '''
    queryset = StockBalance.objects.all()
    serializer_class = StockBalanceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return StockBalance.objects.all()
        else:
            return StockBalance.objects.filter(user_id=user.id)

class LeaderboardViewSet(viewsets.ModelViewSet):
    '''
    API Endpoint: List of top 20 users and current users position
    '''
    queryset = Leaderboard.objects.all()
    serilizer_class = LeaderboardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return StockBalance.objects.all()
        else:
            return {'leaderboard' : StockBalance.objects.all(), 'user': StockBalance.objects.filter(user_id=user.id)}
# --------------------- Create Model Objects ---------------------

# Create user object
class UserRegistrationAPIView(generics.CreateAPIView):
    '''
    API Endpoint: Create a user object
    '''
    queryset = APIUser.objects.all()
    serializer_class = APIUserSerializer
    permission_classes = [AllowAny] # No login required

class CreateTransactionAPIView(generics.CreateAPIView):
    '''
    API Endpoint: Creates a transaction
    '''
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

# ---------------------- Alpha Vantage Data ----------------------
class TimeSeriesAPIView(APIView):
    '''
    API Endpoint: Retrieves and alters Alpha Vantage time series data
    '''
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        ticker = request.query_params['ticker']
        graph_data = TimeSeries(ticker).graph_data()
        return Response(graph_data)

# ---------------------- Google News Data ----------------------
class GoogleNewsAPIView(APIView):
    '''
    API Endpoint: Retrieves news articles from Google News for a stock
    '''
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        ticker = request.query_params['query']
        queries = GoogleNews(ticker).getArticles()
        return Response(queries)

# ---------------------- Finnhub Data ----------------------
class FinnHubAPIView(APIView):
    '''
    API Endpoint: Retrieves current stock value from Finnhub.io
    '''
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        ticker = request.query_params['ticker']
        url = "https://finnhub.io/api/v1/quote?symbol=" + ticker + "&token=c7nf1t2ad3ifj5l0ckug"
        response = requests.get(url)
        data = response.json()
        if response.status_code == 200:
            return Response({ ticker : data})
        else:
            return Response(data)
