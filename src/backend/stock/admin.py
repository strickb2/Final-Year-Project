from django.contrib import admin
from .models import *

# Register your models here.

# User
admin.site.register(APIUser)

# Transactions
admin.site.register(TransactionType)
admin.site.register(Transaction)
admin.site.register(StockTransaction)

# Balance
admin.site.register(StockBalance)

# General
admin.site.register(Stock)

# Gamified Section
admin.site.register(Leaderboard)
admin.site.register(Point)

