"""
Configuration for Elite Renovations contact form
This file contains sensitive information - do not commit to version control
"""

# reCAPTCHA configuration
RECAPTCHA_SITE_KEY = "6LcXXXXXXXXXXXXXXXXXXXXX"  # Replace with your actual site key
RECAPTCHA_SECRET_KEY = "6LcXXXXXXXXXXXXXXXXXXXXX"  # Replace with your actual secret key

# Email configuration
EMAIL_ADDRESS = "contact@anakainiseis.eu"
EMAIL_PASSWORD = "your-password-here"  # Replace with your actual email password
EMAIL_RECIPIENT = "contact@anakainiseis.eu"  # Where to send contact form submissions
SMTP_SERVER = "smtp.gmail.com"  # Replace with your SMTP server
SMTP_PORT = 587  # Common TLS port

# Logging
LOG_FILE = "contact-form.log"
LOG_LEVEL = "INFO"  # DEBUG, INFO, WARNING, ERROR, CRITICAL

# Security
ENABLE_HONEYPOT = True
MAX_SUBMISSIONS_PER_IP = 5  # Maximum number of submissions per IP address per hour
