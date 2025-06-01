# Elite Renovations Website

A responsive website for Elite Renovations with contact form functionality using Python backend.

## Features

- Modern, responsive design that works on all devices (mobile, tablet, desktop) 
- Contact form with reCAPTCHA protection and Python backend
- Portfolio gallery with filtering
- Multilingual support (English and Greek)
- Testimonials section with auto-rotation
- Service highlights
- Fully responsive navigation

## Technologies Used

- HTML5 and CSS3 with variables for theming
- Vanilla JavaScript (no frameworks)
- Python Flask backend for form processing
- Google reCAPTCHA for spam protection
- SMTP email sending
- FontAwesome for icons
- Google Fonts for typography

## Project Structure

```
/
├── index.html         # Main HTML file
├── app.py             # Python Flask backend
├── requirements.txt   # Python dependencies
├── contact-form.log   # Log file for form submissions
├── css/
│   └── styles.css     # All styles for the website
├── js/
│   └── script.js      # JavaScript for interactivity
├── languages/
│   ├── en.js          # English translations
│   └── el.js          # Greek translations
└── images/            # Folder for all images
```

## Setup Instructions

### 1. Google reCAPTCHA Setup

1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Sign up and register a new site
3. Choose reCAPTCHA v2 "I'm not a robot" Checkbox
4. Add your domain(s) to the list of allowed domains
5. Get your Site Key and Secret Key

### 2. Update Configuration

1. In `index.html`, replace `YOUR_SITE_KEY_HERE` with your reCAPTCHA site key
2. In `app.py`, update the following:
   - `RECAPTCHA_SECRET_KEY` with your reCAPTCHA secret key
   - `EMAIL_ADDRESS` with your email address
   - `EMAIL_PASSWORD` with your email password
   - `SMTP_SERVER` with your SMTP server (e.g., "smtp.gmail.com")
   - `SMTP_PORT` with your SMTP port (commonly 587 for TLS)

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Application

For development:
```bash
python app.py
```

For production, use Gunicorn:
```bash
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

## Customization

### Changing Colors

The color scheme can be easily modified by editing the CSS variables at the top of the `styles.css` file:

```css
:root {
    --primary-color: #3a5a78;
    --secondary-color: #f8a631;
    --accent-color: #e74c3c;
    /* other variables */
}
```

## Troubleshooting

### Email Not Sending

If emails aren't being sent:

1. Check `contact-form.log` for error messages
2. Make sure your SMTP server and port are correct
3. For Gmail, you need to:
   - Enable 2-factor authentication
   - Generate an App Password and use it instead of your regular password
   - Allow less secure apps access if using an older account

### reCAPTCHA Issues

1. Make sure your site key is correctly added to `index.html`
2. Make sure your secret key is correctly added to `app.py`
3. Ensure your domain is added to the allowed domains list in reCAPTCHA admin

### Python Flask Server

If the server isn't starting:
```bash
# Check if port is already in use
Get-NetTCPConnection -LocalPort 8000 -State Listen

# Kill the process using the port
Stop-Process -Id (Get-NetTCPConnection -LocalPort 8000 -State Listen).OwningProcess
```

### Adding Real Images

Replace the placeholder images in the portfolio section with real photos:

1. Add your images to the `images/` folder
2. Update the image paths in `index.html`

## Notes for Further Development

- The contact form currently doesn't send data anywhere. You'll need to connect it to a backend service or email API.
- For production, optimize images and minify CSS/JS files
- Consider adding a project detail page for each renovation project

## License

This project is licensed under the MIT License.
