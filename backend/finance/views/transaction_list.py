from finance.models import Transaction
from finance.serializers.transaction import TransactionSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView

class TransactionListView(ListAPIView):
  serializer_class = TransactionSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return Transaction.objects.filter(user=self.request.user).order_by("-date")