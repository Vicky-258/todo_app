from django.urls import path
from .views import UserRegistrationView, CustomTokenObtainPairView, logout_view

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('logout/', logout_view),
]
