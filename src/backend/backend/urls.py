from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from stock import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Create Router for DRF to access views
router = routers.DefaultRouter()
router.register(r'users', views.APIUserViewSet)
router.register(r'user/stockbalance', views.StockBalanceViewSet)
router.register(r'stocks/general', views.StockViewSet)
router.register(r'transactions/all', views.TransactionViewSet, basename="AllTransactions")
router.register(r'leaderboard', views.TransactionViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.UserRegistrationAPIView.as_view(), name="register"),
    path('transactions/create/', views.CreateTransactionAPIView.as_view(), name='transaction'),
    path('api/alphavantage/timeseries/', views.TimeSeriesAPIView.as_view()),
    path('api/googlenews/articles/', views.GoogleNewsAPIView.as_view()),
    path('api/finnhub/currentvalue/', views.FinnHubAPIView.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
