from rest_framework.routers import DefaultRouter
from finance.views.category import CategoryViewSet
from django.urls import path
from finance.views.transaction_upload import UploadTransactionCSV
from finance.views.transaction_list import TransactionListView
from finance.views.category_rule import CategoryRuleViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='categories')
router.register('category-rules', CategoryRuleViewSet, basename='category-rules')

urlpatterns = [
  path("transactions/upload", UploadTransactionCSV.as_view(), name="transaction-upload"),
  path("transactions", TransactionListView.as_view(), name="transaction-list"),
]
urlpatterns += router.urls