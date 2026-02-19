from django.contrib import admin
from finance.models.category import Category
from finance.models.category_rule import CategoryRule

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_at', 'updated_at')

@admin.register(CategoryRule)
class CategoryRuleAdmin(admin.ModelAdmin):
    list_display = ('id', 'keyword', 'category', 'created_at', 'updated_at')
    search_fields = ('keyword', 'category__name') 
    list_filter = ('category',)
