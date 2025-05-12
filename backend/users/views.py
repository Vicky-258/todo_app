from django.http import JsonResponse
from .serializers import UserRegistrationSerializer
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # 🔐 Create tokens for the new user
            refresh = RefreshToken.for_user(user)

            # 🍪 Prepare response
            res = Response({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                }
            }, status=status.HTTP_201_CREATED)

            # 🍪 Set HttpOnly cookies
            res.set_cookie(
                key='accessToken',
                value=str(refresh.access_token),
                httponly=True,
                secure=True,         # Use only over HTTPS in prod
                samesite='none',
                max_age=12 * 60 * 60
            )
            res.set_cookie(
                key='refreshToken',
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite='none',
                max_age=7 * 24 * 60 * 60
            )

            return res
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # 🍪 Get tokens from response data
        access_token = response.data.get("access")
        refresh_token = response.data.get("refresh")

        # 🍪 Set them as HttpOnly cookies
        response.set_cookie(
            key='accessToken',
            value=access_token,
            httponly=True,
            secure=True,
            samesite='none',
            max_age=12 * 60 * 60
        )
        response.set_cookie(
            key='refreshToken',
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite='none',
            max_age=7 * 24 * 60 * 60
        )

        return response

@api_view(['POST'])
def logout_view(request):
    response = JsonResponse({'message': 'Logged out successfully'})

    # ✅ Delete the correct cookies
    response.delete_cookie('accessToken')
    response.delete_cookie('refreshToken')

    return response
