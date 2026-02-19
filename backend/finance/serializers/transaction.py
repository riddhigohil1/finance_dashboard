from rest_framework import serializers
from finance.models import Transaction
from .category import CategorySerializer

class TransactionSerializer(serializers.ModelSerializer):
  category = CategorySerializer(read_only=True)
  
  class Meta:
    model = Transaction
    fields = "__all__"