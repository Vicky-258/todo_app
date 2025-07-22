from django.urls import path
from .views import (UserRegistrationView, CustomTokenObtainPairView, logout_view,
                    EmailUpdateView, UsernameUpdateView, PasswordChangeView, UserProfileView,
                    ProfilePicUpdateView)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('logout/', logout_view),
    path('profile/update/username/', UsernameUpdateView.as_view(), name='username-update'),
    path('profile/update/password/', PasswordChangeView.as_view(), name='password-update'),
    path('profile/update/email/', EmailUpdateView.as_view(), name='update-email'),
    path("profile/", UserProfileView.as_view(), name="user-profile"),
    path('profile/update/picture/', ProfilePicUpdateView.as_view(), name='profile-pic-update'),

]
