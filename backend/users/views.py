import sys
import traceback

from django.http import JsonResponse
from .serializers import CustomTokenObtainPairSerializer
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.exceptions import ValidationError
from .serializers import (UserRegistrationSerializer, UserProfileSerializer,
                          PasswordChangeSerializer, EmailUpdateSerializer,
                          ProfilePicSerializer)

class UserRegistrationView(APIView):
    def post(self, request):
        try:
            print("📩 Incoming registration payload:", request.data)
            sys.stdout.flush()

            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                refresh = RefreshToken.for_user(user)

                res = Response({
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    }
                }, status=status.HTTP_201_CREATED)

                res.set_cookie(
                    key='accessToken',
                    value=str(refresh.access_token),
                    httponly=True,
                    secure=True,
                    samesite="None",
                    max_age=12 * 60 * 60
                )
                res.set_cookie(
                    key='refreshToken',
                    value=str(refresh),
                    httponly=True,
                    secure=True,
                    samesite="None",
                    max_age=7 * 24 * 60 * 60
                )

                return res

            print("❌ Validation errors:", serializer.errors)
            sys.stdout.flush()
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print("🔥 SERVER ERROR on register:", str(e))
            traceback.print_exc()
            sys.stdout.flush()
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

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
            samesite='None',
            max_age=12 * 60 * 60
        )
        response.set_cookie(
            key='refreshToken',
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite='None',
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

class UsernameUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        if not request.user or not request.user.is_authenticated:
            raise NotAuthenticated("Authentication credentials were not provided.")

        print(request.data)
        user = request.user
        current_password = request.data.get('current_password')

        if not user.check_password(current_password):
            raise ValidationError({"current_password": "Incorrect current password."})

        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Username updated successfully.",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                }
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordChangeView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        if not request.user or not request.user.is_authenticated:
            raise NotAuthenticated("Authentication credentials were not provided.")

        serializer = PasswordChangeSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data["new_password"])
            user.save()

            return Response(
                {"message": "Password updated successfully."},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EmailUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        if not request.user or not request.user.is_authenticated:
            raise NotAuthenticated("Authentication credentials were not provided.")

        serializer = EmailUpdateSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.update(request.user, serializer.validated_data)
            return Response({
                "message": "Email updated successfully.",
                "user": {
                    "id": request.user.id,
                    "username": request.user.username,
                    "email": request.user.email
                }
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if not user or not user.is_authenticated:
            raise NotAuthenticated("User is not authenticated.")

        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "profilePic": request.build_absolute_uri(user.profile_pic.url) if user.profile_pic else None
        })


class ProfilePicUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        user = request.user
        serializer = ProfilePicSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile picture updated successfully."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
