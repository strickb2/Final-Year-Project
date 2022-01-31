from .finnhub.current_value import CurrentValue
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

    def get_queryset(self):
        stock_id = self.request.query_params.get('stock_id')
        if stock_id is not None:
            return Stock.objects.filter(id=stock_id)
        else:
            return Stock.objects.all()

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
        stock_id = self.request.query_params.get('stock_id')
        if user.is_superuser:
            return StockBalance.objects.all()
        else:
            if stock_id:
                return StockBalance.objects.filter(user_id=user.id, stock_id=stock_id)
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
        data = CurrentValue(ticker).get_values()
        return Response(data)
