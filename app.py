#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Elite Renovations Contact Form Handler
A simple Flask application to process contact form submissions 
and send emails with reCAPTCHA verification.
"""

from flask import Flask, request, jsonify
import os
import smtplib
import requests
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from flask_cors import CORS  # For handling cross-origin requests
import sys

# Try to import config, or use example values
try:
    import config
    print("Loaded configuration from config.py")
except ImportError:
    print("Config file not found. Using example values. Please create a config.py file for production.")
    import config_example as config
    
# Configure logging
logging.basicConfig(
    filename=getattr(config, 'LOG_FILE', 'contact-form.log'),
    level=getattr(config, 'LOG_LEVEL', 'INFO'),
    format='[%(asctime)s] %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# Create Flask app
app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)  # Enable CORS for all routes

# Import configuration from config.py
RECAPTCHA_SECRET_KEY = getattr(config, 'RECAPTCHA_SECRET_KEY', 'YOUR_RECAPTCHA_SECRET_KEY')
EMAIL_ADDRESS = getattr(config, 'EMAIL_ADDRESS', 'contact@anakainiseis.eu')
EMAIL_PASSWORD = getattr(config, 'EMAIL_PASSWORD', 'your_email_password')
EMAIL_RECIPIENT = getattr(config, 'EMAIL_RECIPIENT', EMAIL_ADDRESS)
SMTP_SERVER = getattr(config, 'SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = getattr(config, 'SMTP_PORT', 587)

# Serve static files
@app.route('/')
def index():
    return app.send_static_file('index.html')

# Email sending function
def send_email(name, email, phone, service, message):
    try:
        # Create email
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_RECIPIENT
        msg['Reply-To'] = email
        msg['Subject'] = f"New Contact Form Submission - {name}"
        
        # Email body
        email_body = f"""
        New contact form submission from Elite Renovations website:
        
        Name: {name}
        Email: {email}
        Phone: {phone or 'Not provided'}
        Service Interested In: {service or 'Not specified'}
        
        Message:
        {message}
        
        Submitted on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        IP Address: {request.remote_addr}
        User Agent: {request.user_agent.string if request.user_agent else 'Not available'}
        """
        
        msg.attach(MIMEText(email_body, 'plain', 'utf-8'))
        
        logging.info(f"Attempting to send email via {SMTP_SERVER}:{SMTP_PORT}")
        
        # Connect to SMTP server and send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Enable TLS encryption
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
            
        logging.info(f"Email sent successfully from {email} to {EMAIL_RECIPIENT}")
        return True, "Email sent successfully"
            
    except Exception as e:
        error_msg = str(e)
        logging.error(f"Failed to send email: {error_msg}")
        return False, f"Failed to send email: {error_msg}"

# Verify reCAPTCHA
def verify_recaptcha(recaptcha_response):
    try:
        payload = {
            'secret': RECAPTCHA_SECRET_KEY,
            'response': recaptcha_response
        }
        
        response = requests.post('https://www.google.com/recaptcha/api/siteverify', data=payload)
        result = response.json()
        
        if result['success']:
            return True
        else:
            logging.warning(f"reCAPTCHA verification failed: {result.get('error-codes', [])}")
            return False
            
    except Exception as e:
        logging.error(f"reCAPTCHA verification error: {str(e)}")
        return False

# Form submission endpoint
@app.route('/send-email', methods=['POST'])
def handle_form_submission():
    try:
        # Get form data
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        phone = request.form.get('phone', '').strip()
        service = request.form.get('service', '').strip()
        message = request.form.get('message', '').strip()
        website = request.form.get('website', '')  # Honeypot field
        recaptcha_response = request.form.get('g-recaptcha-response', '')
        
        # Log the submission attempt
        logging.info(f"Form submission attempt from {email}")
        
        # Check honeypot (spam check)
        if website:
            logging.warning(f"Spam detected (honeypot): {email}")
            return jsonify({
                'success': False,
                'message': 'Spam detected'
            }), 400
        
        # Validate required fields
        if not all([name, email, message]):
            return jsonify({
                'success': False,
                'message': 'Missing required fields'
            }), 400
        
        # Validate email format (basic check)
        if '@' not in email or '.' not in email:
            return jsonify({
                'success': False,
                'message': 'Invalid email format'
            }), 400
        
        # Verify reCAPTCHA
        if not verify_recaptcha(recaptcha_response):
            return jsonify({
                'success': False,
                'message': 'reCAPTCHA verification failed'
            }), 400
        
        # Send email
        success, message_result = send_email(name, email, phone, service, message)
        
        if success:
            return jsonify({
                'success': True,
                'message': 'Thank you! Your message has been sent successfully.'
            })
        else:
            return jsonify({
                'success': False,
                'message': message_result
            }), 500
            
    except Exception as e:
        logging.error(f"Error processing form: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An unexpected error occurred. Please try again later.'
        }), 500

# Custom error handlers
@app.errorhandler(404)
def not_found(error):
    return app.send_static_file('index.html')

@app.errorhandler(500)
def server_error(error):
    logging.error(f"Server error: {str(error)}")
    return jsonify({
        'success': False,
        'message': 'Server error occurred'
    }), 500

# Run the app
if __name__ == '__main__':
    # For development
    app.run(host='0.0.0.0', port=8000, debug=False)
