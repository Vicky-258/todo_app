from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone
from .enum import TaskPriority

class Task(models.Model):
    title = models.CharField(max_length=255)
    desc = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)
    due_time = models.TimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    priority = models.CharField(
        max_length=10,
        choices=TaskPriority.choices,
        default=TaskPriority.MEDIUM
    )
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="tasks")

    @property
    def days_till_due(self):
        if not self.due_date:
            return None
        return (self.due_date - timezone.now().date()).days


    def __str__(self):
        return f"{self.title} - {self.user.username}"
