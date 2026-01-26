from rest_framework.routers import DefaultRouter
from finance.views.category import CategoryViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='categories')

urlpatterns = router.urls