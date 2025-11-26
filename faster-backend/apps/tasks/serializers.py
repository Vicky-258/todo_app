from rest_framework import serializers
from .models import Task
from django.utils import timezone
from .enum import TaskPriority

class TaskSerializer(serializers.ModelSerializer):
    priority = serializers.ChoiceField(choices=TaskPriority.choices)
    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ("id", "user", "created_at", "updated_at")

    def create(self, validated_data):
        request = self.context.get("request")
        if request and request.user:
            validated_data["user"] = request.user
        return super().create(validated_data)

    def validate_due_date(self, value):
        if value and value < timezone.now():
            raise serializers.ValidationError("Due date cannot be in the past.")
        return value
