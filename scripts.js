// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'md:hidden fixed top-4 right-4 z-50 p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none';
    mobileMenuButton.innerHTML = `
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    `;
    document.body.appendChild(mobileMenuButton);

    const nav = document.querySelector('nav');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu fixed inset-0 bg-white z-40 hidden';
    mobileMenu.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full space-y-8">
            <a href="#services" class="text-xl text-gray-700 hover:text-blue-600">Services</a>
            <a href="#about" class="text-xl text-gray-700 hover:text-blue-600">About</a>
            <a href="#contact" class="text-xl text-gray-700 hover:text-blue-600">Contact</a>
            <a href="tel:413-887-8817" class="text-xl bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Call Now</a>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });
});

// Form handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Add animation to button
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Here you would typically send the data to your backend
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'mt-4 p-4 bg-green-100 text-green-700 rounded-md animate-fade-in';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            this.appendChild(successMessage);
            
            // Reset form
            this.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'mt-4 p-4 bg-red-100 text-red-700 rounded-md animate-fade-in';
            errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
            this.appendChild(errorMessage);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        } finally {
            // Reset button
            submitButton.innerHTML = 'Send Message';
            submitButton.disabled = false;
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation classes to elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .shadow-md').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Add hover scale effect to cards
document.querySelectorAll('.shadow-md').forEach(card => {
    card.classList.add('hover-scale');
});
