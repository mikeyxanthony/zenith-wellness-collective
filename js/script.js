/**
 * Elena Rossi - Sophisticated Interactions
 * CalmStudio-inspired JavaScript
 */

// ==========================================
// Mobile Navigation
// ==========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
    }
});

// ==========================================
// Smooth Scrolling
// ==========================================
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#') && href.length > 1 && !href.includes('privacy') && !href.includes('terms')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 40;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// Scroll Animations with Intersection Observer
// ==========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = el.classList.contains('fade-in-left') ? 'translateX(-30px)' : 
                         el.classList.contains('fade-in-right') ? 'translateX(30px)' : 
                         'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// ==========================================
// Navbar Scroll Effect
// ==========================================
let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(44, 44, 44, 0.08)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// Form Handling
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validation
        if (!formData.name || !formData.email) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!validateEmail(formData.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Success
        showNotification('Thank you for reaching out. I\'ll respond within 24 hours.', 'success');
        contactForm.reset();
        
        // In production, send to backend
        console.log('Form submitted:', formData);
    });
}

// ==========================================
// Email Validation
// ==========================================
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==========================================
// Notification System
// ==========================================
function showNotification(message, type = 'success') {
    // Remove existing
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#2C2C2C' : '#8B4513',
        color: '#F8F6F0',
        fontSize: '0.9375rem',
        fontWeight: '400',
        borderRadius: '2px',
        boxShadow: '0 8px 24px rgba(44, 44, 44, 0.2)',
        zIndex: '10000',
        animation: 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        maxWidth: '400px'
    });
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);

// ==========================================
// Micro-interactions: Card Hover Effects
// ==========================================
const cards = document.querySelectorAll('.approach-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = 'rgba(44, 44, 44, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--border)';
    });
});

// ==========================================
// Parallax Effect on Scroll (Subtle)
// ==========================================
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroContent && scrolled < 500) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = `${1 - (scrolled / 500)}`;
    }
});

// ==========================================
// Initialize on Load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Elena Rossi - Website Loaded');
    
    // Add subtle entrance animation to hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)';
            hero.style.opacity = '1';
        }, 100);
    }
});

// ==========================================
// Cursor Effect (Optional - Premium Touch)
// ==========================================
let cursor = null;
let cursorFollower = null;

if (window.innerWidth > 968) {
    // Create custom cursor elements
    cursor = document.createElement('div');
    cursorFollower = document.createElement('div');
    
    Object.assign(cursor.style, {
        width: '8px',
        height: '8px',
        background: 'var(--charcoal)',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'transform 0.15s ease'
    });
    
    Object.assign(cursorFollower.style, {
        width: '32px',
        height: '32px',
        border: '1px solid var(--soft-brown)',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9998',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });
    
    // Smooth follower movement
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Expand on hover
    const interactiveElements = document.querySelectorAll('a, button, .approach-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            cursorFollower.style.transform += ' scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
        });
    });
}