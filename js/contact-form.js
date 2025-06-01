document.addEventListener('DOMContentLoaded', function() {
    // Get the contact form element
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Determine translations based on saved language or html lang attribute
        const currentLanguage = localStorage.getItem('language') || document.documentElement.lang || 'en';
        const translations = currentLanguage === 'el' ? elTranslations : enTranslations;

        contactForm.addEventListener('submit', function(e) {
            // Prevent the default form submission
            e.preventDefault();
            
            // Show loading state with translation
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = translations.form_sending;
            submitButton.disabled = true;

             // Remove any previous messages
            const prevMsg = document.querySelector('.success-message, .error-message');
            if (prevMsg) prevMsg.remove();

            // Get form data
            const formData = new FormData(contactForm);
            
            // Send form data via AJAX
            fetch('send-email.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;

                // Remove any previous messages
                const prevMsg = document.querySelector('.success-message, .error-message');
                if (prevMsg) prevMsg.remove();

                // Create and show the message
                const messageElement = document.createElement('div');
                messageElement.className = data.success ? 'success-message' : 'error-message';
                messageElement.setAttribute('role', 'alert');
                messageElement.setAttribute('tabindex', '-1');
                messageElement.innerHTML = `
                    <span class="msg-icon">${data.success ? '✔️' : '❌'}</span>
                    <span class="msg-text">${data.success ? translations.form_success : translations.form_error}</span>
                `;
                // Insert after the form for better UX
                contactForm.parentElement.insertBefore(messageElement, contactForm.nextSibling);

                if (data.success) {
                    // Hide the form on success
                    contactForm.style.display = 'none';
                    contactForm.reset();
                }

                // Focus the message for accessibility
                messageElement.focus();

                // After 18 seconds, remove message and show form again if success
                setTimeout(() => {
                    messageElement.remove();
                    if (data.success) contactForm.style.display = '';
                }, 18000);
            })
            .catch(() => {
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;

                // Remove any previous messages
                const prevMsg = document.querySelector('.success-message, .error-message');
                if (prevMsg) prevMsg.remove();

                // Show error message below the form
                const messageElement = document.createElement('div');
                messageElement.className = 'error-message';
                messageElement.setAttribute('role', 'alert');
                messageElement.setAttribute('tabindex', '-1');
                messageElement.innerHTML = `
                    <span class="msg-icon">❌</span>
                    <span class="msg-text">${translations.form_error}</span>
                `;
                contactForm.parentElement.insertBefore(messageElement, contactForm.nextSibling);
                messageElement.focus();

                setTimeout(() => {
                    messageElement.remove();
                }, 18000);
            });
        });
    }
});
