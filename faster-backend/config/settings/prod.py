# config/settings/prod.py

from .base import *

DEBUG = False

ALLOWED_HOSTS = ["yourdomain.com", "api.yourdomain.com"]

# Future: Add production DB, cache, logging, security, etc.
