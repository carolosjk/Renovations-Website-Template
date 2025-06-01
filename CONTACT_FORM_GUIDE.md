# Elite Renovations Contact Form Setup Guide

This document provides instructions for setting up and troubleshooting the contact form for the Elite Renovations website.

## Overview

The contact form uses PHPMailer for reliable email delivery and Google reCAPTCHA v3 for spam protection. The main files involved are:

- `index.html`: Contains the contact form HTML
- `js/script.js`: Contains the JavaScript for form submission
- `send-email.php`: Processes the form data and sends emails
- `phpmailer/`: Directory containing PHPMailer library

## Setup Instructions

### 1. Verify PHPMailer Installation

PHPMailer needs to be properly installed with all required files in place:

```
phpmailer/
  src/
    Exception.php
    PHPMailer.php
    SMTP.php
```

If any of these files are missing, download them from the official PHPMailer repository:
https://github.com/PHPMailer/PHPMailer/

### 2. Configure Email Settings

In `send-email.php`, check that the email configuration is correct:

```php
$config = [
    'recaptcha_site_key' => 'YOUR_SITE_KEY',
    'recaptcha_secret_key' => 'YOUR_SECRET_KEY',
    'recaptcha_min_score' => 0.5,
    'smtp_server' => 'smtp.gmail.com',
    'smtp_port' => 587,
    'smtp_username' => 'your-email@gmail.com',
    'smtp_password' => 'your-app-password', 
    'sender_name' => 'Elite Renovations',
    'sender_email' => 'your-email@gmail.com',
    'recipient_email' => 'recipient@example.com',
    'log_file' => 'contact-form.log'
];
```

For Gmail, you must use an "App Password" instead of your regular password.

### 3. Verify reCAPTCHA Configuration

Ensure your reCAPTCHA keys are correctly set in both the JavaScript and PHP:

In `index.html`:
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_SITE_KEY"></script>
```

In `js/script.js`:
```javascript
grecaptcha.execute('YOUR_SITE_KEY', {action: 'submit'})
```

In `send-email.php`:
```php
'recaptcha_site_key' => 'YOUR_SITE_KEY',
'recaptcha_secret_key' => 'YOUR_SECRET_KEY',
```

### 4. Test the Form

1. Fill out the form with valid data
2. Check for any JavaScript errors in the browser console
3. Monitor the `contact-form.log` file for server-side errors
4. Verify that emails are being delivered

## Troubleshooting

### Common Issues:

1. **500 Server Error**:
   - Check that PHPMailer files exist and are properly included
   - Verify PHP version compatibility (PHPMailer 6.x requires PHP >= 5.5)
   - Check server permissions for log files

2. **Form Submits but No Email Received**:
   - Verify SMTP credentials
   - Check if reCAPTCHA verification is passing
   - Look for errors in the log file
   - Test with a basic PHP `mail()` function

3. **reCAPTCHA Issues**:
   - Confirm site and secret keys match
   - Ensure domain is authorized in Google reCAPTCHA console
   - Check network tab to see if reCAPTCHA API calls are succeeding

### Testing Tools

Several testing scripts are included:
- `test-form.html`: Basic form that tests submission
- `form-debug-direct.php`: Returns detailed debug information
- `send-email-working.php`: Simplified email handler
- `phpmailer_test.php`: Tests if PHPMailer is installed correctly

## Papaki.gr Hosting Notes

For Papaki.gr hosting:

1. Ensure PHP version is 7.4+ with required extensions
2. PHPMailer should be fully compatible
3. SMTP settings need to be adjusted for your specific mail server
4. Contact Papaki support if you encounter permission issues

## Support

If you encounter issues that can't be resolved with this guide, please contact:

- Developer: support@eliterenovations.com
- Technical Support: tech@anakainiseis.eu

---

Last updated: June 1, 2025
