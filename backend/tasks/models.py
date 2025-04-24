from django.db import models
from django.conf import settings

class Task(models.Model):

    Low = 'Low'
    High = 'High'
    Medium = 'Medium'

    PRIORITY_CHOICES = [
        (Low, 'Low'),
        (Medium, 'Medium'),
        (High, 'High'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(null=True)
    is_completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Medium')
    due_date = models.DateTimeField(blank=True, null=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, db_index=True)  # Link task to a user

    def __str__(self):
        return self.title  # Show task title in Django admin

