from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from apps.users.serializers import UserLoginSerializer, UserSerializer

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]
    authentication_classes = []  # Disable old JWT auth for login

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        user_data = UserSerializer(user).data

        # Generate tokens
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        # Prepare response
        response = Response({
            "message": "Login successful",
            "user": user_data
        }, status=status.HTTP_200_OK)

        # Clear old cookies first
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        # Set HttpOnly cookies
        response.set_cookie(
            key="access_token",
            value=str(access),
            httponly=True,
            secure=False,  # ⚡ True in production with HTTPS
            samesite='Lax',
            path='/'
        )
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite='Lax',
            path='/'
        )

        return response
