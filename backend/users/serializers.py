from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from typing import Any


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['id'] = user.id
        return token

    def validate(self, attrs):
        data: dict[str, Any] = super().validate(attrs)

        # Include additional user info in response
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
        }

        return data

class UserProfileSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'current_password']

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({
                "current_password": "Current password is incorrect."
            })
        return value


class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value

    def validate_new_password(self, value):
        # Optional: Add custom password policy here
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value

class EmailUpdateSerializer(serializers.Serializer):
    new_email = serializers.EmailField()
    current_password = serializers.CharField(write_only=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Incorrect password.")
        return value

    def validate_new_email(self, value):
        user_model = self.context['request'].user.__class__
        if user_model.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use.")
        return value

    def update(self, instance, validated_data):
        instance.email = validated_data['new_email']
        instance.save()
        return instance

class ProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['profile_pic']

