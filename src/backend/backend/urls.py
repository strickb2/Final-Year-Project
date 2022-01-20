from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from stock import views

# Create Router for DRF to access views
router = routers.DefaultRouter()
router.register(r'users', views.APIUserViewSet)
router.register(r'user/stockbalance', views.StockBalanceViewSet)
router.register(r'stocks/general', views.StockViewSet)
router.register(r'transactions', views.TransactionViewSet, basename="AllTransactions")

urlpatterns = [
    path('',include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('register/', views.UserRegistrationAPIView.as_view(), name="register"),
    path('transactions/create/', views.CreateTransactionAPIView.as_view()),
    path('api/alphavantage/timeseries/', views.TimeSeriesAPIView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
