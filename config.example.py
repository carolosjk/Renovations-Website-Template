# Configuration settings for Elite Renovations contact form
# Fill in your actual values and rename this file to config.py

# reCAPTCHA configuration
RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY" 
RECAPTCHA_SECRET_KEY = "YOUR_RECAPTCHA_SECRET_KEY"

# Email configuration 
EMAIL_ADDRESS = "contact@anakainiseis.eu"
EMAIL_PASSWORD = "your_email_password"
EMAIL_RECIPIENT = "contact@anakainiseis.eu"  # Where to send contact form submissions
SMTP_SERVER = "your.smtp.server"  # e.g. smtp.gmail.com
SMTP_PORT = 587  # Common TLS port

# Logging
LOG_FILE = "contact-form.log"
LOG_LEVEL = "INFO"  # DEBUG, INFO, WARNING, ERROR, CRITICAL

# Security
ENABLE_HONEYPOT = True
MAX_SUBMISSIONS_PER_IP = 5  # Maximum number of submissions per IP address per hour
