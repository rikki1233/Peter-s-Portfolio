// Contact Form Handler
class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        this.submitBtn = document.querySelector('.btn-submit');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Send email using EmailJS
            await this.sendEmail(data);
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            this.showErrorMessage();
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm(data) {
        const errors = [];

        if (!data.name.trim()) {
            errors.push('Name is required');
        }

        if (!data.email.trim()) {
            errors.push('Email is required');
        } else if (!this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!data.message.trim()) {
            errors.push('Message is required');
        }

        if (errors.length > 0) {
            this.showValidationErrors(errors);
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async sendEmail(data) {
        // Configuration - Update these values based on your email service
        const EMAILJS_SERVICE_ID = 'service_contact_form';
        const EMAILJS_TEMPLATE_ID = 'template_contact';
        const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with your EmailJS public key
        
        // Alternative: Formspree form ID (if using Formspree instead)
        const FORMSPREE_FORM_ID = 'YOUR_FORM_ID'; // Replace with your Formspree form ID

        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            message: data.message,
            to_email: 'peterchinedum708@gmail.com'
        };

        // Try EmailJS first if configured
        if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
            try {
                // Initialize EmailJS
                emailjs.init(EMAILJS_PUBLIC_KEY);
                return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
            } catch (error) {
                console.warn('EmailJS failed, trying fallback:', error);
            }
        }

        // Fallback to Formspree if configured
        if (FORMSPREE_FORM_ID !== 'YOUR_FORM_ID') {
            return this.sendEmailFallback(data, FORMSPREE_FORM_ID);
        }

        // If no email service is configured, show setup message
        throw new Error('Email service not configured. Please check EMAIL_SETUP_GUIDE.md for setup instructions.');
    }

    async sendEmailFallback(data, formId) {
        // Using Formspree service
        const response = await fetch(`https://formspree.io/f/${formId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message,
                _replyto: data.email,
                _subject: `New Contact Form Submission from ${data.name}`
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        return response;
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.disabled = true;
            this.submitBtn.innerHTML = `
                <div style="width: 16px; height: 16px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <span>Sending...</span>
            `;
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = `
                <img src="images/39_124.svg" alt="">
                <span>Send Message</span>
            `;
        }
    }

    showSuccessMessage() {
        this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
    }

    showErrorMessage() {
        this.showMessage('Sorry, there was an error sending your message. Please try again or contact me directly at peterchinedum708@gmail.com', 'error');
    }

    showValidationErrors(errors) {
        const errorText = errors.join(', ');
        this.showMessage(errorText, 'error');
    }

    showMessage(text, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const message = document.createElement('div');
        message.className = `form-message form-message--${type}`;
        message.textContent = text;
        message.style.cssText = `
            padding: 12px 16px;
            margin-top: 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            ${type === 'success' 
                ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
                : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;

        // Insert after the form
        this.form.appendChild(message);

        // Auto remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                message.remove();
            }, 5000);
        }
    }
}

// Add CSS for loading animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .form-message {
        animation: fadeIn 0.3s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
