from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class APIUser(AbstractUser):
    username = models.CharField(max_length=50, null=False, unique=True)
    name = models.CharField(max_length=100, null=False)
    email = models.CharField(max_length=150, null=False, unique=True)
    password = models.CharField(max_length=23, null=False)
    dob = models.DateField(null=False)
    pps_number = models.CharField(max_length=20, null=False, unique=True)
    address = models.CharField(max_length=250, null=False)
    phone_number = models.CharField(max_length=15, null=False)
    balance = models.DecimalField(max_digits=6, decimal_places=2, default=0.00, blank=True)

    REQUIRED_FIELDS = ['name', 'email', 'dob', 'pps_number', 'address', 'phone_number']

class Stock(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=400, null=False)
    logo = models.ImageField(upload_to='stocks')
    url = models.URLField()
    ticker = models.CharField(max_length=15, null=False) # This is a stock abbr name

    def __str__(self):
        return self.name + " (" + self.ticker + ")"

class TransactionType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=10, null=False)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE)
    type = models.ForeignKey(TransactionType, on_delete=models.CASCADE)
    datetime = models.DateTimeField(auto_now_add=True) # Automatically set current datetime
    total = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)

    def __str__(self):
        return self.user_id.name + " | " + self.type.name + " | €" + str(self.total) + " | " + str(self.datetime).split(".")[0]

class StockTransaction(models.Model):
    transaction_id = models.OneToOneField(Transaction, related_name='stock', on_delete=models.CASCADE, primary_key=True)
    stock_id = models.ForeignKey(Stock, related_name='stock_id', on_delete=models.CASCADE)
    stock_price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)

    def __str__(self):
        return "T" + str(self.transaction_id.id) + ": " + self.stock_id.name + " at " + str(self.stock_price)
    
    def quantity(self):
        return round(float(self.transaction_id.total / self.stock_price), 8)

class StockBalance(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE)
    stock_id = models.ForeignKey(Stock, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=14, decimal_places=12, default=0.00000000000000)
    total_purchase_value = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)

    def __str__(self):
        return self.user_id.name + " | " + self.stock_id.name + " x " + str(self.quantity) + " | Total Value: €" + str(self.total_purchase_value)
    
    def average_value(self):
        if self.quantity > 0:
            return round(self.total_purchase_value/self.quantity, 2)
        else:
            return 0
        

class Leaderboard(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(APIUser, on_delete=models.CASCADE)
    points = models.IntegerField(default=0) # Calculated field in TransactionSerializer.create()

    def __str__(self):
        return self.user_id.name + " | " + str(self.points)

class Point(models.Model):
    id = models.AutoField(primary_key=True)
    trans_type = models.ForeignKey(TransactionType, on_delete=models.CASCADE)
    points = models.IntegerField()

    def __str__(self):
        return self.trans_type.name + " | " + str(self.points)
