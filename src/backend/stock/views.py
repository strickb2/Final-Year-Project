from sqlite3 import Time
from rest_framework import viewsets, generics
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, schema
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.renderers import JSONRenderer
from .alpha_vantage.time_series import TimeSeries
import requests, json


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
        
        queries = TimeSeries('AMZN').graph_data()
        
        return Response(queries)
