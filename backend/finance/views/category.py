from rest_framework import viewsets
from finance.models.category import Category
from finance.serializers.category import CategorySerializer
from finance.permissions.category_permissions import IsAdminOrReadOnly

class CategoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing category instances.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAdminOrReadOnly]