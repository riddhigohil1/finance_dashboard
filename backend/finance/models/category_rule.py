from django.db import models
from .category import Category

class CategoryRule(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='rules')
    keyword = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.keyword} -> {self.category.name}"  