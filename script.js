// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 1000);
});

// Mobile Menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const burger = document.querySelector('.burger');
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const burger = document.querySelector('.burger');
    navLinks.classList.remove('active');
    burger.classList.remove('active');
    document.body.style.overflow = '';
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            closeMenu();
        }
    });
});

// Scroll to about section
function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: 'smooth'
    });
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('nav');
    
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    } else {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    }
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Achievement tabs with slideshow initialization
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.achievement-content');
let swiperInstances = {};

function initializeSwiper(tabId) {
    if (!swiperInstances[tabId]) {
        const swiper = new Swiper(`.swiper-${tabId}`, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: `.swiper-${tabId} .swiper-pagination`,
                clickable: true,
            },
            navigation: {
                nextEl: `.swiper-${tabId} .swiper-button-next`,
                prevEl: `.swiper-${tabId} .swiper-button-prev`,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 1000
        });
        swiperInstances[tabId] = swiper;
    }
}

// Initialize first swiper
setTimeout(() => {
    initializeSwiper('nations7');
}, 1000);

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        const activeContent = document.getElementById(tabId);
        activeContent.classList.add('active');
        
        // Initialize swiper for active tab
        initializeSwiper(tabId);
        
        // Restart autoplay for active swiper
        if (swiperInstances[tabId]) {
            swiperInstances[tabId].autoplay.start();
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.fullName.value,
            email: this.email.value,
            phone: this.phone.value,
            program: this.interest.value,
            message: this.message.value
        };
        
        if (!formData.name || !formData.email || !formData.phone || !formData.program) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show success animation
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Request Sent!</span>';
        submitBtn.style.background = '#10B981';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            alert(`Thank you ${formData.name}! Your free trial request has been submitted. We will contact you within 24 hours at ${formData.phone}.`);
            contactForm.reset();
        }, 2000);
    });
}

// Back to top functionality
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Class details modal
function showClassDetails(className) {
    const classDetails = {
        'master-circle': {
            title: "Master's Circle",
            description: "Exclusive mentorship program for 5th Dan and above black belts. This program focuses on advanced combat systems, leadership development, and philosophical mastery under direct guidance of Grand Master Shihan.",
            details: "By appointment only. Limited to 5 students per session. Includes personalized training plans, advanced kata analysis, and tournament strategy development."
        },
        'black-belt-mentorship': {
            title: "Black Belt Mentorship",
            description: "Intensive training program for 1st to 4th Dan black belts. Focus on refining advanced techniques, developing teaching skills, and preparing for higher Dan examinations.",
            details: "Saturday 9AM-12PM. Includes sparring drills, kata refinement, and teaching methodology workshops."
        },
        'competition-training': {
            title: "Competition Training",
            description: "Advanced training program for tournament preparation. Focus on sparring techniques, competition strategy, weight management, and mental conditioning.",
            details: "Mon/Wed/Fri 7PM-8:30PM. Open to color belts and above. Includes mock tournaments and video analysis."
        },
        'technique-mastery': {
            title: "Technique Mastery",
            description: "Intermediate program for yellow to brown belts. Focus on refining fundamental techniques, kata precision, and building strong foundation for black belt progression.",
            details: "Tue/Thu 6PM-7PM. Includes partner drills, kata practice, and basic sparring techniques."
        },
        'kids-karate': {
            title: "Kids Karate (6-12)",
            description: "Age-appropriate martial arts training focusing on discipline, respect, coordination, and basic self-defense. Builds confidence and character in a fun, safe environment.",
            details: "Saturday 10AM-11AM (Beginner) & 2PM-3PM (Intermediate). Includes games, basic techniques, and belt progression system."
        },
        'teen-program': {
            title: "Teen Program (13-17)",
            description: "Specialized training for teenagers focusing on confidence building, focus development, and practical self-defense skills. Prepares for belt progression and competitions.",
            details: "Mon/Wed 5PM-6:30PM. Includes fitness training, technique drills, and character development."
        },
        'adult-beginners': {
            title: "Adult Beginners",
            description: "Perfect starting point for adults with no prior martial arts experience. Learn fundamentals, build fitness, and develop confidence in a supportive, structured environment.",
            details: "Tue/Thu 7PM-8PM. No experience required. Includes basic techniques, fitness training, and self-defense principles."
        },
        'fitness-karate': {
            title: "Fitness Karate",
            description: "High-intensity workout combining traditional karate techniques with modern fitness training. Improves cardiovascular health, strength, flexibility, and overall conditioning.",
            details: "Saturday 9AM-10AM. All fitness levels welcome. Includes cardio drills, strength exercises, and technique practice."
        }
    };
    
    const detail = classDetails[className];
    if (detail) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: var(--dark);
                padding: 3rem;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                border: 3px solid var(--primary);
                box-shadow: 0 20px 60px rgba(220, 38, 38, 0.3);
                position: relative;
                animation: fadeInUp 0.5s ease;
            ">
                <button onclick="this.parentElement.parentElement.remove()" style="
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: var(--primary);
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: var(--transition);
                ">&times;</button>
                
                <h3 style="
                    color: var(--primary);
                    font-family: 'Bebas Neue', cursive;
                    font-size: 2.5rem;
                    letter-spacing: 2px;
                    margin-bottom: 1.5rem;
                ">${detail.title}</h3>
                
                <p style="
                    color: #ddd;
                    line-height: 1.8;
                    margin-bottom: 1.5rem;
                    font-size: 1.1rem;
                ">${detail.description}</p>
                
                <div style="
                    background: rgba(255,255,255,0.05);
                    padding: 1.5rem;
                    border-radius: 10px;
                    border-left: 4px solid var(--gold);
                    margin-top: 2rem;
                ">
                    <h4 style="
                        color: var(--gold-light);
                        margin-bottom: 1rem;
                        font-family: 'Bebas Neue', cursive;
                        letter-spacing: 1px;
                    ">Program Details</h4>
                    <p style="color: #aaa; line-height: 1.6;">${detail.details}</p>
                </div>
                
                <button onclick="window.location.href='#contact'; this.parentElement.parentElement.remove();" style="
                    background: var(--primary);
                    color: white;
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 30px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-top: 2rem;
                    cursor: pointer;
                    transition: var(--transition);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <i class="fas fa-calendar-check"></i>
                    <span>Book This Class</span>
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Close modal on escape key
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
    }
}

// Initialize animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.why-card, .instructor-card, .social-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize JotForm Chatbot
window.addEventListener('load', function() {
    if (typeof JF !== 'undefined') {
        JF.initialize({
            widgetId: '019bb337b32876dd842ea8d72391c40bdc58',
            container: document.getElementById('jotform-chat'),
            base: 'https://form.jotform.com/',
            windowTitle: 'Shitoku-kai Karate Assistant',
            height: 600,
            width: 400,
            initChat: false
        });
    }
});

// Add CSS for new animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);