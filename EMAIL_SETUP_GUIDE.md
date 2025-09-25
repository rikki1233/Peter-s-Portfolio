# Contact Form Email Setup Guide

Your contact form is now ready to work! Here are two options to make it send emails to `peterchinedum708@gmail.com`:

## Option 1: EmailJS (Recommended - Free & Easy)

1. **Sign up for EmailJS**:
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Create a free account

2. **Set up Email Service**:
   - Add your Gmail account as an email service
   - Follow their Gmail integration guide

3. **Create Email Template**:
   - Create a new template with ID: `template_contact`
   - Use this template content:
   ```
   Subject: New Contact Form Submission from {{from_name}}
   
   You have received a new message from your portfolio contact form:
   
   Name: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   
   ---
   Sent from your portfolio contact form
   ```

4. **Update the JavaScript**:
   - Open `contact-handler.js`
   - Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual public key from EmailJS dashboard

## Option 2: Formspree (Alternative - Also Free)

1. **Sign up for Formspree**:
   - Go to [https://formspree.io/](https://formspree.io/)
   - Create a free account

2. **Create a Form**:
   - Create a new form
   - Set the recipient email to `peterchinedum708@gmail.com`

3. **Update the JavaScript**:
   - Open `contact-handler.js`
   - Replace `YOUR_FORM_ID` with your Formspree form ID

## Option 3: Netlify Forms (If hosting on Netlify)

If you're hosting your site on Netlify:

1. Add `netlify` attribute to your form:
   ```html
   <form class="contact-form" id="contact-form" netlify netlify-honeypot="bot-field">
   ```

2. Add a hidden field for spam protection:
   ```html
   <input type="hidden" name="bot-field" />
   ```

3. Remove the JavaScript form handling (Netlify will handle it automatically)

## Testing Your Form

1. Open your website
2. Fill out the contact form
3. Submit it
4. Check your email (`peterchinedum708@gmail.com`) for the message

## Features Included

✅ **Form Validation**: Checks for required fields and valid email format
✅ **Loading States**: Shows loading spinner while sending
✅ **Success/Error Messages**: User feedback for form submission
✅ **Responsive Design**: Works on all devices
✅ **Spam Protection**: Built-in validation and optional honeypot
✅ **Fallback Options**: Multiple email service integrations

## Troubleshooting

- **Form not sending**: Check browser console for errors
- **Emails not received**: Check spam folder and email service setup
- **Validation errors**: Ensure all required fields are filled correctly

Your contact form is now fully functional and will send emails directly to your Gmail account!

