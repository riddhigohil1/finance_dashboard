from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from finance.models import CategoryRule
from finance.serializers.category_rule import CategoryRuleSerializer

class CategoryRuleViewSet(viewsets.ModelViewSet):
    """Admin only CRUD for category rules"""
    queryset = CategoryRule.objects.select_related("category").all()
    serializer_class = CategoryRuleSerializer
    permission_classes = [IsAdminUser]