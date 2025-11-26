from django.urls import path

from apps.users.views import UserLoginView, MeView
from apps.users.views import UserSignupView

urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='user-signup'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('me/', MeView.as_view(), name='user-me'),
]
