from django.utils.timezone import now
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    def validate(self, data):
        """Ensure no duplicate task title exists in the same active period."""
        user = self.context['request'].user
        title = data.get("title")
        due_date = data.get("due_date")

        existing_task = Task.objects.filter(title=title, user=user, is_completed=False, due_date=due_date).exclude(due_date__lt=now())

        if existing_task.exists():
            raise serializers.ValidationError("A task with this title is already active. Complete it before adding a new one.")

        return data
