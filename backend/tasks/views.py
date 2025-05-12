from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from .models import Task
from .serializers import TaskSerializer

class TaskListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]  # ⬅️ ADD THIS
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]  # ⬅️ ADD THIS
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Get the refresh token from cookies
        refresh_token = request.COOKIES.get('refreshToken')

        if not refresh_token:
            return JsonResponse({"detail": "Refresh token missing."}, status=400)

        try:
            # Decode and validate the refresh token
            refresh = RefreshToken(refresh_token)
            # Create new access token using the refresh token
            access_token = refresh.access_token

            # Optionally, you can also rotate the refresh token (not always required)
            new_refresh_token = RefreshToken.for_user(request.user)
            response = JsonResponse({
                'access': str(access_token),
                'refresh': str(new_refresh_token),  # Optional, if you want to rotate refresh token
            })

            # Set both access token and refresh token in the cookies
            response.set_cookie(
                key='accessToken',
                value=str(access_token),
                httponly=True,
                secure=True,  # set secure to True in production
                samesite='None',
                max_age=12 * 60 * 60
            )

            # Set the new refresh token in the cookies
            response.set_cookie(
                key='refreshToken',
                value=str(new_refresh_token),
                httponly=True,
                secure=True,  # set secure to True in production
                samesite='None',
                max_age= 7 * 24 * 60 * 60
            )

            return response
        except Exception as e:
            return JsonResponse({"detail": str(e)}, status=400)