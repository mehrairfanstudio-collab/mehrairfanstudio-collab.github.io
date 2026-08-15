/* ========================================
   CONTACT PAGE JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (!validateForm(formData)) {
                alert('Please fill in all required fields.');
                return;
            }

            // Log form data (in production, you'd send this to a server)
            console.log('Form submitted:', formData);

            // Show success message
            showSuccessMessage();

            // Reset form
            this.reset();
        });
    }
}

function validateForm(data) {
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    return true;
}

function showSuccessMessage() {
    const formWrapper = document.querySelector('.contact-form-wrapper');
    
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <div class="success-content">
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you within 24-48 hours.</p>
        </div>
    `;

    // Add styles for success message
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            background: #4CAF50;
            color: white;
            padding: 2rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            animation: slideDown 0.5s ease forwards;
        }

        .success-content h3 {
            color: white;
            margin-bottom: 0.5rem;
        }

        .success-content p {
            margin: 0;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    if (!document.querySelector('style[data-success-msg]')) {
        style.setAttribute('data-success-msg', 'true');
        document.head.appendChild(style);
    }

    // Insert success message
    formWrapper.insertBefore(successMsg, formWrapper.firstChild);

    // Remove success message after 5 seconds
    setTimeout(function() {
        successMsg.style.animation = 'slideUp 0.5s ease forwards';
        setTimeout(function() {
            successMsg.remove();
        }, 500);
    }, 5000);
}

// Email link handling
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href.startsWith('mailto:')) {
        // Allow default behavior for mailto links
        return;
    }
});
