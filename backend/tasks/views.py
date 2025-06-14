from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from .models import Task
from .serializers import TaskSerializer
from rest_framework.exceptions import NotAuthenticated

class TaskListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            raise NotAuthenticated("Authentication credentials were not provided or expired.")
        return Task.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        if not user or not user.is_authenticated:
            raise NotAuthenticated("Authentication credentials were not provided or expired.")
        serializer.save(user=user)


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]  # ⬅️ ADD THIS
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        if not user or not user.is_authenticated:
            raise NotAuthenticated("Session expired. Please log in again.")
        return Task.objects.filter(user=user)

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refreshToken')

        if not refresh_token:
            return JsonResponse({"detail": "Refresh token missing."}, status=400)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = refresh.access_token

            if not request.user or not request.user.is_authenticated:
                return JsonResponse({"detail": "User not authenticated."}, status=401)

            new_refresh_token = RefreshToken.for_user(request.user)

            response = JsonResponse({
                'access': str(access_token),
                'refresh': str(new_refresh_token),
            })

            response.set_cookie(
                key='accessToken',
                value=str(access_token),
                httponly=True,
                secure=True,
                samesite='none',
                max_age=12 * 60 * 60
            )

            response.set_cookie(
                key='refreshToken',
                value=str(new_refresh_token),
                httponly=True,
                secure=True,
                samesite='none',
                max_age=7 * 24 * 60 * 60
            )

            return response

        except Exception as e:
            return JsonResponse({"detail": str(e)}, status=400)
