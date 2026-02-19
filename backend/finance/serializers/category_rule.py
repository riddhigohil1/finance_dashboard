from rest_framework import serializers
from finance.models import CategoryRule,Category

class CategoryRuleSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)

    class Meta:
        model = CategoryRule
        fields = ['id', 'keyword',  'category_id','category_name', 'created_at', 'updated_at']