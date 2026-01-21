from django.urls import path
from account import views as UserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
  path('register/', UserView.RegisterView.as_view(), name='register'),
  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('profile-view/', UserView.ProfileView.as_view(), name='profile'),
]