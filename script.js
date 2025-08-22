// Enhanced Portfolio JavaScript

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const loadingScreen = document.getElementById('loadingScreen');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('checkbox');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Dark Mode Toggle
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('checkbox');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (themeToggle) themeToggle.checked = savedTheme === 'dark';
    } else {
        // Default to light mode
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.checked = false;
        localStorage.setItem('theme', 'light');
    }
}

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
        
        // Update navbar immediately after theme change
        setTimeout(() => {
            const scrollEvent = new Event('scroll');
            window.dispatchEvent(scrollEvent);
        }, 50);
    });
}

// Initialize theme on page load
initializeTheme();

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Back to Top Button
function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', toggleBackToTop);

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = navToggle.querySelectorAll('.bar');
    bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
    bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger bars
        const bars = navToggle.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 70;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const lightBg = isDark ? 'rgba(26, 26, 26, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    const lightBgDefault = isDark ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    const shadowColor = isDark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.15)';
    const shadowColorDefault = isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)';
    
    if (window.scrollY > 50) {
        navbar.style.background = lightBg;
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = `0 2px 30px ${shadowColor}`;
    } else {
        navbar.style.background = lightBgDefault;
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = `0 2px 20px ${shadowColorDefault}`;
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .about-text, .info-card, .contact-item, .certification-item');
    animatedElements.forEach(el => observer.observe(el));
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:sudhanshushekhar692004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you! Your default email client will open with the message.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Project card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) rotateY(5deg)';
            card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Skills animation on scroll
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        }, index * 100);
    });
}

// Statistics counter animation
function animateCounters() {
    const stats = document.querySelectorAll('.stat h4');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 50);
    });
}

// Trigger animations when sections come into view
const statsSection = document.querySelector('.about-stats');
const skillsSection = document.querySelector('.skills');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (statsSection) statsObserver.observe(statsSection);
if (skillsSection) skillsObserver.observe(skillsSection);

// Form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('name').trim()) {
        errors.push('Name is required');
    }
    
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.get('subject').trim()) {
        errors.push('Subject is required');
    }
    
    if (!formData.get('message').trim()) {
        errors.push('Message is required');
    }
    
    return errors;
}

// Enhanced contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            showNotification(errors.join('. '), 'error');
            return;
        }
        
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link with better formatting
        const mailtoLink = `mailto:sudhanshushekhar692004@gmail.com?subject=${encodeURIComponent(`Portfolio Contact: ${subject}`)}&body=${encodeURIComponent(`
Hello Sudhanshu,

You have received a new message from your portfolio website:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Best regards,
${name}
        `)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you for your message! Your email client will open shortly.', 'success');
        
        // Reset form with animation
        contactForm.reset();
        
        // Add send animation to button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sent!';
        submitBtn.style.background = '#27ae60';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 2000);
    });
}

// Add loading states to buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Skip for external links and form submissions
            if (this.href && !this.href.startsWith('#') && !this.href.startsWith('mailto:') && !this.href.startsWith('tel:')) {
                const originalText = this.textContent;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            }
        });
    });
});

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in-up');
        }
    }, 500);
    
    // Stagger animation for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.3s ease';
    });
});

// Project Filtering System
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                    card.style.display = 'block';
                    card.classList.add('show');
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                    card.classList.remove('show');
                }
            });
        });
    });
}

// Enhanced Skill Progress Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 500);
    });
}

// Circular Progress Animation
function animateCircularProgress() {
    const progressCircles = document.querySelectorAll('.skill-progress-circle');
    
    progressCircles.forEach(circle => {
        const progressValue = parseInt(circle.getAttribute('data-progress'));
        const progressBar = circle.querySelector('.progress-ring__circle');
        const circumference = 2 * Math.PI * 26; // radius = 26
        
        progressBar.style.strokeDasharray = circumference;
        progressBar.style.strokeDashoffset = circumference;
        
        // Animate the progress
        setTimeout(() => {
            const offset = circumference - (progressValue / 100) * circumference;
            progressBar.style.strokeDashoffset = offset;
        }, 500);
    });
}

// Enhanced Intersection Observer with multiple animations
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation
            entry.target.classList.add('fade-in-up');
            
            // Trigger skill bar animations when skills section is visible
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            
            // Trigger counter animations when about section is visible
            if (entry.target.classList.contains('about-stats')) {
                animateCounters();
            }
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Testimonial Carousel (Auto-rotate)
function initializeTestimonialCarousel() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.style.opacity = index === currentIndex ? '1' : '0.7';
            card.style.transform = index === currentIndex ? 'scale(1.02)' : 'scale(1)';
        });
        
        currentIndex = (currentIndex + 1) % testimonialCards.length;
    }
    
    // Start rotation every 4 seconds
    setInterval(rotateTestimonials, 4000);
}

// Enhanced Typing Effect with Multiple Texts
function enhancedTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const texts = [
        "Hi, I'm Sudhanshu Shekhar",
        "Founder of Garbage Cleaner and MilkoSys",
        "App & AI Developer",
        "Tech Innovator"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            heroTitle.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroTitle.innerHTML = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 100 : 150;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start typing effect after loading screen
    setTimeout(typeText, 2000);
}

// Particle Background Effect
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 5}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); }
            100% { transform: translateY(-100px) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced Form Handling with Better UX
function enhanceContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add floating labels effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.style.borderColor = 'var(--accent-primary)';
            } else {
                input.style.borderColor = '#e74c3c';
            }
        });
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all new features
    initializeProjectFilters();
    initializeTestimonialCarousel();
    enhancedTypingEffect();
    createParticles();
    enhanceContactForm();
    
    // Initialize enhanced skills features
    initializeEnhancedSkills();
    
    // Observe sections for animations
    const sectionsToObserve = document.querySelectorAll('section, .skill-category, .project-card, .testimonial-card, .timeline-item, .skill-category-enhanced');
    sectionsToObserve.forEach(section => {
        enhancedObserver.observe(section);
    });
    
    // Add stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add hover sound effects (optional)
    const interactiveElements = document.querySelectorAll('.btn, .project-card, .skill-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            // Add subtle scale effect
            element.style.transform = 'scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
    
    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Enhanced Skill Search and Filter Functionality
function initializeSkillSearch() {
    const searchInput = document.getElementById('skillSearch');
    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillCategories = document.querySelectorAll('.skill-category-enhanced');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterSkills(searchTerm, getActiveFilter());
        });
    }
    
    // Filter buttons functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterLevel = button.getAttribute('data-level');
            const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
            filterSkills(searchTerm, filterLevel);
        });
    });
    
    function getActiveFilter() {
        const activeButton = document.querySelector('.skill-filter-btn.active');
        return activeButton ? activeButton.getAttribute('data-level') : 'all';
    }
    
    function filterSkills(searchTerm, filterLevel) {
        skillCards.forEach(card => {
            const skillName = card.querySelector('h4').textContent.toLowerCase();
            const skillLevel = card.classList.contains('advanced') ? 'advanced' : 
                              card.classList.contains('intermediate') ? 'intermediate' : 'beginner';
            
            const matchesSearch = searchTerm === '' || skillName.includes(searchTerm);
            const matchesFilter = filterLevel === 'all' || skillLevel === filterLevel;
            
            if (matchesSearch && matchesFilter) {
                card.classList.remove('filtered-out');
                card.classList.add('filtered-in');
                card.style.display = 'block';
            } else {
                card.classList.add('filtered-out');
                card.classList.remove('filtered-in');
                card.style.display = 'none';
            }
        });
        
        // Hide/show categories if all skills in category are filtered out
        skillCategories.forEach(category => {
            const visibleCards = category.querySelectorAll('.skill-card:not(.filtered-out)');
            if (visibleCards.length === 0) {
                category.style.display = 'none';
            } else {
                category.style.display = 'block';
            }
        });
    }
}

// Skill Chart Functionality
function createSkillChart() {
    const canvas = document.getElementById('skillChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Custom skill data for Sudhanshu Shekhar
const skills = [
    { name: 'Python', level: 95, color: '#3776ab' },
    { name: 'Java', level: 85, color: '#f89820' },
    { name: 'Machine Learning', level: 90, color: '#e74c3c' },
    { name: 'C', level: 80, color: '#f7931a' },
    { name: 'App Development', level: 88, color: '#6c5ce7' },
    { name: 'AI & NLP', level: 87, color: '#fd79a8' }
];

    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const barWidth = (canvas.width - 100) / skills.length;
    const maxBarHeight = canvas.height - 100;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    skills.forEach((skill, index) => {
        const barHeight = (skill.level / 100) * maxBarHeight;
        const x = 50 + index * barWidth;
        const y = canvas.height - 50 - barHeight;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, skill.color);
        gradient.addColorStop(1, skill.color + '80');
        
        // Draw bar
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 10, barHeight);
        
        // Draw skill name
        ctx.fillStyle = '#666';
        ctx.font = '12px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText(skill.name, x + (barWidth - 10) / 2, canvas.height - 30);
        
        // Draw percentage
        ctx.fillStyle = '#333';
        ctx.font = 'bold 14px Poppins';
        ctx.fillText(skill.level + '%', x + (barWidth - 10) / 2, y - 10);
    });
}

// Animate skill chart on scroll
function animateSkillChart() {
    const chartSection = document.querySelector('.skill-comparison-section');
    if (!chartSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    createSkillChart();
                }, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(chartSection);
}

// Enhanced Skill Progress Animation with Stagger Effect
function enhancedSkillAnimation() {
    const skillCategories = document.querySelectorAll('.skill-category-enhanced');
    
    skillCategories.forEach((category, categoryIndex) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillCards = entry.target.querySelectorAll('.skill-card');
                    const progressCircles = entry.target.querySelectorAll('.skill-progress-circle');
                    
                    // Animate skill cards
                    skillCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                    
                    // Animate progress circles
                    setTimeout(() => {
                        animateCircularProgress();
                    }, skillCards.length * 150);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(category);
    });
}

// Skill Card Hover Effects with Sound Indication
function enhanceSkillCardInteraction() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // Enhanced hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.zIndex = '10';
            
            // Add glow effect to progress circle
            const progressCircle = card.querySelector('.progress-ring__circle');
            if (progressCircle) {
                progressCircle.style.filter = 'drop-shadow(0 0 8px currentColor)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.zIndex = '1';
            
            const progressCircle = card.querySelector('.progress-ring__circle');
            if (progressCircle) {
                progressCircle.style.filter = 'none';
            }
        });
        
        // Click to show more info (tooltip)
        card.addEventListener('click', () => {
            const skillName = card.querySelector('h4').textContent;
            const skillLevel = card.querySelector('.skill-level').textContent;
            const skillExperience = card.querySelector('.skill-experience').textContent;
            const skillPercentage = card.querySelector('.progress-text').textContent;
            
            showSkillTooltip(skillName, skillLevel, skillExperience, skillPercentage, card);
        });
    });
}

// Show skill information tooltip
function showSkillTooltip(name, level, experience, percentage, element) {
    // Remove existing tooltips
    const existingTooltips = document.querySelectorAll('.skill-tooltip');
    existingTooltips.forEach(tooltip => tooltip.remove());
    
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-header">
            <h4>${name}</h4>
            <span class="tooltip-close">&times;</span>
        </div>
        <div class="tooltip-content">
            <p><strong>Proficiency:</strong> ${level} (${percentage})</p>
            <p><strong>Experience:</strong> ${experience}</p>
            <div class="tooltip-actions">
                <button class="tooltip-btn" onclick="showSkillProjects('${name}')">View Projects</button>
            </div>
        </div>
    `;
    
    // Style the tooltip
    tooltip.style.cssText = `
        position: fixed;
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        min-width: 250px;
        max-width: 300px;
        font-family: 'Poppins', sans-serif;
    `;
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.top = (rect.top - 10) + 'px';
    tooltip.style.left = (rect.right + 10) + 'px';
    
    // Add to page
    document.body.appendChild(tooltip);
    
    // Close button functionality
    tooltip.querySelector('.tooltip-close').addEventListener('click', () => {
        tooltip.remove();
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(tooltip)) {
            tooltip.remove();
        }
    }, 5000);
}

// Function to show projects related to a skill (placeholder)
function showSkillProjects(skillName) {
    showNotification(`Showing projects related to ${skillName}`, 'info');
    // Here you could scroll to projects section and filter by skill
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize all enhanced skill features
function initializeEnhancedSkills() {
    initializeSkillSearch();
    animateSkillChart();
    enhancedSkillAnimation();
    enhanceSkillCardInteraction();
    
    // Set initial styles for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
}

// Console styling
console.log('%c🚀 Enhanced Portfolio with Advanced Skills Section Loaded! ', 'background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 10px; border-radius: 5px; font-weight: bold;');
console.log('%cDeveloped by Sudhanshu Shekhar', 'color: #3498db; font-weight: bold; font-size: 14px;');
console.log('%cAmritsar Group of Colleges Student', 'color: #9b59b6; font-weight: bold;');
console.log('%cPassionate about AI, ML, Data Science, and Innovative Solutions! 💻', 'color: #27ae60; font-weight: bold;');
console.log('%cNew Features: Skill Search, Interactive Charts, Advanced Filters, Tooltips', 'color: #e67e22; font-style: italic;');
