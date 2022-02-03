from rest_framework import serializers
from .models import *
from decimal import Decimal
import math

# -------------------- Model ViewSet Serializers --------------------

# User Serializer
class APIUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = APIUser
        fields = ['id','username', 'name', 'email', 'password', 'dob', 'pps_number', 'address', 'phone_number', 'balance']
    
    def create(self, validated_data):
        username = validated_data['username']
        name = validated_data['name']
        email = validated_data['email']
        password = validated_data['password']
        dob = validated_data['dob']
        pps_number = validated_data['pps_number']
        address = validated_data['address']
        phone_number = validated_data['phone_number']

        # Create new user
        new_user = APIUser.objects.create_user(username=username,
            name=name,
            email=email,
            password=password,
            dob=dob,
            pps_number=pps_number,
            address=address,
            phone_number=phone_number)
        new_user.save()

        # Todo: Create new Leaderboard position for user
        new_leaderboard = Leaderboard.objects.create(user_id = new_user)
        new_leaderboard.save()

        return new_user

# Stock Serializer
class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id', 'name', 'description', 'logo', 'url', 'ticker']

# Leaderboard Serializer
class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = ['id', 'user_id', 'points']

# Points Serializer
class PointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Point
        fields = ['trans_type', 'points']

# StockBalance Serializer
class StockBalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockBalance
        fields = ['id', 'user_id', 'stock_id', 'quantity', 'total_purchase_value', 'average_value']

# Stock Transaction Serializer
class StockTransactionSerializer(serializers.ModelSerializer):
    stock_id = serializers.PrimaryKeyRelatedField(queryset=Stock.objects.all(), allow_null=True, required=False)
    
    class Meta:
        model = StockTransaction
        fields = ['stock_id', 'quantity', 'stock_price']

# Transaction Serializer
class TransactionSerializer(serializers.ModelSerializer):
    type = serializers.PrimaryKeyRelatedField(queryset=TransactionType.objects.all(), required=True)
    stock = StockTransactionSerializer(required=False)

    class Meta:
        model = Transaction
        fields = ['id', 'user_id', 'type', 'total', 'datetime', 'stock']
    
    def create(self, validated_data):
        '''
        Creates a transaction entry in both the Transaction and StockTransaction table
        '''
        user = validated_data['user_id']
        total = validated_data['total']
        type = validated_data['type']

        # If transaction was for a trade (buy or sell)
        if type.name == "Buy" or type.name == "Sell":
            stock_data = validated_data.pop('stock')
            stock_id = stock_data['stock_id']
            stock_price = stock_data['stock_price']

            # Buy Stock
            if type.name == "Buy":
                if user.balance >= total:
                    # Create a new transaction object
                    transaction = Transaction.objects.create(
                        user_id=user,
                        type=type,
                        total=total
                    )

                    # Create a stock transaction
                    stock_transaction = StockTransaction.objects.create(
                        transaction_id=transaction,
                        stock_id = stock_id,
                        stock_price=stock_price,
                    )

                    # Update Account Balance
                    user.balance -= total
                    user.save()

                    stock_bal, created = StockBalance.objects.get_or_create(user_id=user, stock_id=stock_id)

                    # If a stock balance instance exists
                    if not created:
                        # Update Stock Balance
                        stock_bal.quantity += Decimal(stock_transaction.quantity())
                        stock_bal.total_purchase_value += total
                        stock_bal.save()
                    else:
                        stock_bal.quantity = Decimal(stock_transaction.quantity())
                        stock_bal.total_purchase_value = total
                        stock_bal.save()

                    # Update leaderboard score
                    leaderboard = Leaderboard.objects.get(user_id=user)
                    points = Point.objects.get(trans_type=type)
                    leaderboard.points += points.points
                    leaderboard.save()

                    return transaction
                else:
                    raise serializers.ValidationError("User Balance is too low")

            # Sell Stock
            if type.name == "Sell":
                try:
                    # Check Stock Balance Exists
                    stock_bal = StockBalance.objects.get(user_id=user,stock_id=stock_id.id)
                except:
                    # User has no stock balance 
                    raise serializers.ValidationError("User doesn't own selected stock")

                if stock_bal.quantity >= Decimal(total/stock_price):
                    # Create a new transaction object
                    transaction = Transaction.objects.create(
                        user_id=user,
                        type=type,
                        total=total
                    )

                    # Create a stock transaction
                    stock_transaction = StockTransaction.objects.create(
                        transaction_id=transaction,
                        stock_id = stock_id,
                        stock_price=stock_price,
                    )

                    # Update Stock Balance
                    stock_bal.total_purchase_value -= Decimal(stock_bal.average_value() * Decimal(stock_transaction.quantity()))
                    stock_bal.quantity -= Decimal(stock_transaction.quantity())
                    stock_bal.save()
                    
                    # Update Account Balance
                    user.balance += total
                    user.save()

                    # Update leaderboard score
                    leaderboard = Leaderboard.objects.get(user_id=user)
                    points = Point.objects.get(trans_type=type)
                    leaderboard.points += points.points
                    leaderboard.save()
                    
                    return transaction
                else:
                    raise serializers.ValidationError("Stock Balance is too low")
        else:
            # Add Funds
            if type.name == "Add":
                # Create a new transaction object
                transaction = Transaction.objects.create(
                    user_id=user,
                    type=type,
                    total=total
                )
                    
                # Update Account Balance
                user.balance += total
                user.save()
                
                return transaction

            # Withdraw Funds
            if type.name == "Withdraw" and user.balance >= total:
                # Create a new transaction object
                transaction = Transaction.objects.create(
                    user_id=user,
                    type=type,
                    total=total
                )
                    
                # Update Account Balance
                user.balance -= total
                user.save()

                return transaction
            else:
                raise serializers.ValidationError("User Balance is too low")
        raise serializers.ValidationError("Invalid Transaction type")
