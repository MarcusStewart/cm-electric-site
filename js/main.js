// Mobile navigation toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu').querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if(navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Header background change on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Simple form submission handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Sending...';
        submitBtn.style.opacity = '0.7';
        
        // Simulate API call
        setTimeout(() => {
            contactForm.reset();
            submitBtn.innerText = 'Message Sent Successfully!';
            submitBtn.style.backgroundColor = '#10b981'; // Success green
            submitBtn.style.color = '#fff';
            
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.color = '';
                submitBtn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}

// Fade in elements on scroll observation
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title, .section-subtitle, .service-card, .pricing-card, .review-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Services Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const servicesGrid = document.querySelector('.services-grid');
    const serviceCards = document.querySelectorAll('.service-card');

    if (filterBtns.length > 0 && servicesGrid) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Return early if already active to prevent unnecessary re-render
                if (btn.classList.contains('active')) return;

                // Update active state class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                // Fade out grid before changing DOM layout
                servicesGrid.style.opacity = '0';
                
                // Wait for the opacity transition to end before updating display
                setTimeout(() => {
                    serviceCards.forEach(card => {
                        if (filter === 'all' || card.dataset.category === filter) {
                            card.style.display = 'block';
                            // Ensure the card remains fully visibly faded-in since intersection observer already triggered it
                            card.style.opacity = '1'; 
                            card.style.transform = 'translateY(0)';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    
                    // Fade grid back in
                    servicesGrid.style.opacity = '1';
                }, 300); // Wait 300ms matches the CSS transition ease
            });
        });
    }
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(accordion => {
        accordion.addEventListener('click', () => {
            const item = accordion.parentElement;
            
            // Close other accordions
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current accordion
            item.classList.toggle('active');
        });
    });
});
