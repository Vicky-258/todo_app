# config/settings/dev.py

from .base import *

DEBUG = True

ALLOWED_HOSTS = ["*"]

# Add dev-specific apps if needed
# INSTALLED_APPS += ["debug_toolbar"] (we’ll do this later)
