document.addEventListener('DOMContentLoaded', function() {
    // Initialize language functionality - Updated v2.1
    initializeLanguage();
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Testimonial slider
    const dots = document.querySelectorAll('.dot');
    const testimonials = document.querySelector('.testimonials-slider');
    let currentTestimonial = 0;
    const testimonialCount = document.querySelectorAll('.testimonial').length;

    // Initialize testimonial display
    updateTestimonialDisplay();

    // Set up dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentTestimonial = index;
            updateTestimonialDisplay();
        });
    });

    // Auto-rotate testimonials
    setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCount;
        updateTestimonialDisplay();
    }, 8000);

    function updateTestimonialDisplay() {
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentTestimonial) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Move testimonials slider
        testimonials.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    }    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Ensure we're preventing the default form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // This prevents the browser from submitting the form normally
            
            // Execute reCAPTCHA v3 verification
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.ready(function() {
                    grecaptcha.execute('6Ld1dlIrAAAAADYYUe7WXzX912pxtElLmep58xLt', {action: 'submit'})
                    .then(function(token) {                        // Add the token to the form
                        document.getElementById('recaptcha_token').value = token;
                        
                        // Continue with form submission
                        submitContactForm(token);
                    })
                    .catch(function(error) {
                        console.error('reCAPTCHA error:', error);
                        const currentLanguage = localStorage.getItem('language') || 'en';
                        const translations = currentLanguage === 'el' ? elTranslations : enTranslations;
                        showFormMessage(translations.form_captcha_error || '⚠️ reCAPTCHA verification failed', 'error');
                    });
                });
            } else {
                submitContactForm('');
            }
        });
    }
      function submitContactForm(recaptchaToken) {
        const contactForm = document.getElementById('contactForm');
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // We don't need to append the token again since we're now using the correct name in the hidden input
          // Client-side validation for required fields
        const formDataObj = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim(),
            website: document.getElementById('website').value // Honeypot field
        };
        
        if (!validateForm(formDataObj)) {
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalBtnText = submitBtn.textContent;
        const currentLanguage = localStorage.getItem('language') || 'en';
        const translations = currentLanguage === 'el' ? elTranslations : enTranslations;
        
        submitBtn.textContent = translations.form_sending || 'Sending...';
        submitBtn.disabled = true;        // Send form data to PHP backend
        fetch('send-email.php', {
            method: 'POST',
            body: formData // Using FormData instead of JSON for captcha
        })
            .then(response => response.json())
            .then(data => {
                const currentLanguage = localStorage.getItem('language') || 'en';
                const translations = currentLanguage === 'el' ? elTranslations : enTranslations;
                
                if (data.success) {
                    showFormMessage(data.message || translations.form_success || '✨ Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
                    contactForm.reset();
                    // Reset reCAPTCHA
                    if (typeof grecaptcha !== 'undefined') {
                        grecaptcha.reset();
                    }
                } else {
                    showFormMessage(data.message || translations.form_error || '😔 Oops! Something went wrong. Please try again or contact us directly at contact@anakainiseis.eu', 'error');
                }
            }).catch(error => {
                console.error('Error:', error);
                const currentLanguage = localStorage.getItem('language') || 'en';
                const translations = currentLanguage === 'el' ? elTranslations : enTranslations;
                showFormMessage(translations.form_error || '😔 Oops! Something went wrong. Please try again or contact us directly at contact@anakainiseis.eu', 'error');
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
      // Client-side form validation
    function validateForm(data) {
        // Clear previous error messages
        clearFormErrors();
        
        let isValid = true;
        const currentLanguage = localStorage.getItem('language') || 'en';
        const translations = currentLanguage === 'el' ? elTranslations : enTranslations;
        
        // Name validation
        if (data.name.length < 2) {
            showFieldError('name', translations.form_error_name_length || 'Name must be at least 2 characters long');
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFieldError('email', translations.form_error_email_invalid || 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation (optional but if provided, should be valid)
        if (data.phone && data.phone.length > 0) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
                showFieldError('phone', translations.form_error_phone_invalid || 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Message validation
        if (data.message.length < 10) {
            showFieldError('message', translations.form_error_message_short || 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        if (data.message.length > 2000) {
            showFieldError('message', translations.form_error_message_long || 'Message cannot exceed 2000 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Show field-specific error
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        // Remove existing error
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error class to field
        field.classList.add('error');
        
        // Create and append error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    // Clear all form errors
    function clearFormErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const errorFields = document.querySelectorAll('.form-group input.error, .form-group textarea.error, .form-group select.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }
      // Show form submission message
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-response-message');
        if (existingMessage) {
            existingMessage.style.animation = 'slideOutToTop 0.3s ease-in forwards';
            setTimeout(() => {
                if (existingMessage.parentNode) {
                    existingMessage.remove();
                }
            }, 300);
        }
        
        // Wait a bit before showing new message if there was an existing one
        setTimeout(() => {
            // Create message element
            const messageDiv = document.createElement('div');
            messageDiv.className = `form-response-message ${type}`;
            messageDiv.innerHTML = message; // Use innerHTML to support emojis and HTML
            
            // Insert message before form
            const contactForm = document.getElementById('contactForm');
            contactForm.parentNode.insertBefore(messageDiv, contactForm);
            
            // Auto-remove message after 8 seconds (longer for success messages)
            const autoRemoveTime = type === 'success' ? 8000 : 6000;
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.style.animation = 'slideOutToTop 0.3s ease-in forwards';
                    setTimeout(() => {
                        if (messageDiv.parentNode) {
                            messageDiv.remove();
                        }
                    }, 300);
                }
            }, autoRemoveTime);
            
            // Scroll to message smoothly
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, existingMessage ? 350 : 0);
    }
});

// Language functionality
function initializeLanguage() {
    const langEN = document.getElementById('langEN');
    const langEL = document.getElementById('langEL');
    const htmlTag = document.querySelector('html');
    
    // Check for saved language preference in local storage
    const savedLanguage = localStorage.getItem('language');
    
    // If no language is saved, detect browser language
    if (!savedLanguage) {
        const browserLanguage = navigator.language.split('-')[0]; // Gets language code like 'en' or 'el'
        
        // Check if we support this language, default to 'en' if not
        const supportedLanguage = (browserLanguage === 'el') ? 'el' : 'en';
        setLanguage(supportedLanguage);
        updateActiveLanguageButton(supportedLanguage);
    } else {
        setLanguage(savedLanguage);
        updateActiveLanguageButton(savedLanguage);
    }
    
    // Add event listeners for language buttons
    langEN.addEventListener('click', function() {
        setLanguage('en');
        updateActiveLanguageButton('en');
    });
    
    langEL.addEventListener('click', function() {
        setLanguage('el');
        updateActiveLanguageButton('el');
    });
}

// Update active state of language buttons
function updateActiveLanguageButton(language) {
    // First remove active class from all buttons
    const langButtons = document.querySelectorAll('.language-btn');
    langButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Then add active class to the selected language button
    if (language === 'en') {
        document.getElementById('langEN').classList.add('active');
    } else if (language === 'el') {
        document.getElementById('langEL').classList.add('active');
    }
}

// Function to set the language
function setLanguage(language) {
    const htmlTag = document.querySelector('html');
    
    // Update HTML lang attribute
    htmlTag.setAttribute('lang', language);
    
    // Save selected language to local storage
    localStorage.setItem('language', language);
    
    // Apply translations
    applyTranslations(language);
}

// Function to apply translations
function applyTranslations(language) {
    // Select the current translation set based on language
    const currentTranslations = language === 'el' ? elTranslations : enTranslations;
    
    // Get all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    // Loop through elements and update content
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        
        // Check if the key exists in translations
        if (currentTranslations[key]) {
            element.textContent = currentTranslations[key];
        }
    });
    
    // Handle placeholder translations
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (currentTranslations[key]) {
            element.placeholder = currentTranslations[key];
        }
    });
    
    // Special handling for elements with HTML content
    const htmlElements = document.querySelectorAll('[data-i18n-html]');
    htmlElements.forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        if (currentTranslations[key]) {
            element.innerHTML = currentTranslations[key];
        }
    });
    
    // Update document title based on language
    document.title = language === 'el' ? 'Elite Renovations - Μεταμορφώστε το Χώρο Σας' : 'Elite Renovations - Transform Your Space';
}
