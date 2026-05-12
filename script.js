// ========== LOADER WITH TYPING EFFECT ==========
const loaderTexts = [
    'Muhammad Qamar...',
    'Loading portfolio...',
    'Almost ready...'
];

let loaderTextIndex = 0;
let loaderCharIndex = 0;
let loaderBarWidth = 0;
const loaderTextEl = document.getElementById('loaderText');
const loaderBarFill = document.getElementById('loaderBarFill');
const loaderPercent = document.getElementById('loaderPercent');

function typeLoaderText() {
    if (!loaderTextEl) return;
    const currentText = loaderTexts[loaderTextIndex];
    if (loaderCharIndex < currentText.length) {
        loaderTextEl.textContent += currentText[loaderCharIndex];
        loaderCharIndex++;
        setTimeout(typeLoaderText, 60);
    }
}

// Animate loader bar
const loaderInterval = setInterval(() => {
    loaderBarWidth += 2;
    if (loaderBarWidth >= 100) {
        loaderBarWidth = 100;
        clearInterval(loaderInterval);
    }
    if (loaderBarFill) {
        loaderBarFill.style.width = loaderBarWidth + '%';
    }
    if (loaderPercent) {
        loaderPercent.textContent = loaderBarWidth + '%';
    }
}, 25);

typeLoaderText();

window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
        // Animate skill bars after loader
        animateSkillBars();
    }, 1800);
});

setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
}, 3000);


// ========== CUSTOM CURSOR ==========
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor effects on interactive elements
document.querySelectorAll('a, button, .project-card-port, .service-card-port, .tech-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        if (cursorFollower) {
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        if (cursorFollower) {
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
        }
    });
});


// ========== NAVBAR ==========
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
        if (navbar) navbar.style.borderBottomColor =
            'rgba(255,255,255,0.08)';
        if (backToTop) backToTop.classList.add('show');
    } else {
        if (navbar) navbar.style.borderBottomColor =
            'rgba(255,255,255,0.06)';
        if (backToTop) backToTop.classList.remove('show');
    }

    // Active nav link on scroll
    updateActiveNavLink();
});


// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
    });
});


// ========== ACTIVE NAV ON SCROLL ==========
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}


// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(
            this.getAttribute('href')
        );
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});


// ========== BACK TO TOP ==========
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// ========== ANIMATED COUNTERS ==========
function animateCounters() {
    document.querySelectorAll('.counter-hero').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let current = 0;
        const step = target / 60;

        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + '+';
            }
        };
        update();
    });
}

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);


// ========== SKILL BARS ==========
function animateSkillBars() {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);


// ========== PROJECT FILTER ==========
function filterProjects(category, btn) {
    document.querySelectorAll('.filter-port')
        .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.project-card-port').forEach(card => {
        if (category === 'all' ||
            card.dataset.cat === category) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInProject 0.5s ease';
        } else {
            card.classList.add('hidden');
        }
    });
}


// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactForm.style.display = 'none';
        if (formSuccess) {
            formSuccess.classList.add('show');
        }
    });
}


// ========== SCROLL ANIMATIONS ==========
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll(
    '.service-card-port, .project-card-port,' +
    '.testimonial-port-card, .tech-card,' +
    '.exp-card, .about-highlight-item,' +
    '.contact-info-item, .process-port-card,' +
    '.tool-badge, .skill-bar-item'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    scrollObserver.observe(el);
});


// ========== PARALLAX HERO GLOWS ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const glows = document.querySelectorAll('.hero-glow');
    glows.forEach((glow, i) => {
        const speed = 0.3 + (i * 0.1);
        glow.style.transform = `translateY(${scrolled * speed}px)`;
    });
});


// ==================================
// ULTRA INTERACTIVE EFFECTS
// ==================================


// ========== MOUSE FOLLOW LIGHT ON CARDS ==========
document.querySelectorAll('.service-card-port').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
    });
});


// ========== 3D TILT EFFECT ==========
function add3DTilt(elements) {
    elements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            el.style.transform = 
                `perspective(1000px) 
                 rotateX(${rotateX}deg) 
                 rotateY(${rotateY}deg) 
                 translateY(-10px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

add3DTilt(document.querySelectorAll('.exp-card'));
add3DTilt(document.querySelectorAll('.tech-card'));
add3DTilt(document.querySelectorAll('.reason-card'));


// ========== MAGNETIC BUTTONS ==========
function magneticButton(elements) {
    elements.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = 
                `translate(${x * 0.2}px, ${y * 0.2}px) 
                 translateY(-5px) scale(1.05)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

magneticButton(document.querySelectorAll('.btn-primary-hero'));
magneticButton(document.querySelectorAll('.nav-hire-btn'));


// ========== TYPING EFFECT FOR HERO TITLE ==========
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
        heroTitle.style.animation = 'titlePulse 0.6s ease';
    });
    heroTitle.addEventListener('animationend', () => {
        heroTitle.style.animation = '';
    });
}

const titlePulseStyle = document.createElement('style');
titlePulseStyle.textContent = `
@keyframes titlePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
}`;
document.head.appendChild(titlePulseStyle);


// ========== PARALLAX FLOATING CARDS ==========
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.floating-card');
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        cards.forEach((card, i) => {
            const speed = (i + 1) * 0.3;
            card.style.transform = 
                `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}


// ========== RIPPLE EFFECT ON CLICK ==========
document.querySelectorAll(
    '.btn-primary-hero, .btn-secondary-hero, ' +
    '.nav-hire-btn, .service-cta-port, ' +
    '.filter-port, .nav-link'
).forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
@keyframes rippleEffect {
    to {
        transform: scale(2);
        opacity: 0;
    }
}`;
document.head.appendChild(rippleStyle);


// ========== TEXT REVEAL ON SCROLL ==========
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('h2, h3, .about-para').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    textRevealObserver.observe(el);
});


// ========== NUMBER COUNTER ANIMATION ==========
function animateCounter(el, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const update = () => {
        current += increment;
        if (current < target) {
            el.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(update);
        } else {
            el.textContent = target + '+';
        }
    };
    update();
}


// ========== CURSOR PARTICLES ON CLICK ==========
document.addEventListener('click', (e) => {
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 6px;
            height: 6px;
            background: var(--indigo);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99999;
        `;
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 / 6) * i;
        const distance = 50 + Math.random() * 30;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${x}px, ${y}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        setTimeout(() => particle.remove(), 800);
    }
});


// ========== PROFILE IMAGE TILT ==========
const profileImage = document.querySelector('.profile-image');
if (profileImage) {
    profileImage.addEventListener('mousemove', (e) => {
        const rect = profileImage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        profileImage.style.transform = 
            `perspective(1000px) 
             rotateX(${rotateX}deg) 
             rotateY(${rotateY}deg) 
             scale(1.05)`;
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileImage.style.transform = '';
    });
}


// ========== SMOOTH NAV INDICATOR ==========
let lastScroll = 0;
const navbar2 = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (navbar2) {
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar2.style.transform = 'translateY(-100%)';
        } else {
            navbar2.style.transform = 'translateY(0)';
        }
        navbar2.style.transition = 'transform 0.4s ease';
    }
    
    lastScroll = currentScroll;
});


// ========== HOVER SOUND EFFECT (Optional) ==========
function playHoverSound() {
    // Uncomment if you want subtle hover sounds
    // const audio = new Audio('hover.mp3');
    // audio.volume = 0.1;
    // audio.play();
}


// ========== STAGGER ANIMATION FOR LISTS ==========
function staggerAnimation(selector, delay = 100) {
    const items = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                items.forEach((item, i) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, i * delay);
                });
            }
        });
    }, { threshold: 0.2 });
    
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
}

staggerAnimation('.exp-card', 100);
staggerAnimation('.tech-card', 80);
staggerAnimation('.reason-card', 120);
staggerAnimation('.tool-badge', 60);


// ========== SHOW NOTIFICATION ON FORM SUBMIT ==========
const showNotification = (message, type = 'success') => {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--card);
        border: 1px solid var(--indigo);
        color: var(--text);
        padding: 16px 24px;
        border-radius: 12px;
        font-size: 0.88rem;
        font-weight: 600;
        z-index: 99999;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5),
                    0 0 30px rgba(99,102,241,0.3);
        transform: translateX(400px);
        transition: transform 0.4s ease;
    `;
    notif.innerHTML = `
        <i class="fas fa-check-circle" 
           style="color: var(--green); 
                  margin-right: 8px"></i>
        ${message}
    `;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notif.style.transform = 'translateX(400px)';
        setTimeout(() => notif.remove(), 400);
    }, 3000);
};


console.log(
    '%c👋 Hi there!\n' +
    '%cBuilt with ❤️ by Muhammad Qamar\n' +
    '%cInterested in working together?\n' +
    '%cWhatsApp: +92 333 9422451',
    'color: #6366F1; font-size: 24px; font-weight: bold;',
    'color: #06B6D4; font-size: 14px;',
    'color: #94A3B8; font-size: 12px;',
    'color: #25D366; font-size: 14px; font-weight: bold;'
);

// ========================================
// NEW SECTIONS FUNCTIONALITY
// ========================================


// ========== STATS COUNTER ANIMATION ==========
function animateStatsCounters() {
    document.querySelectorAll('.stat-counter-number')
            .forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2500;
        let current = 0;
        const step = target / (duration / 16);
        
        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + '+';
            }
        };
        update();
    });
}

const statsObserverNew = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatsCounters();
                statsObserverNew.disconnect();
            }
        });
    }, 
    { threshold: 0.3 }
);

const statsSectionNew = document.querySelector('.stats-counter-grid');
if (statsSectionNew) {
    statsObserverNew.observe(statsSectionNew);
}


// ========== FAQ TOGGLE ==========
function toggleFaqPort(element) {
    const answer = element.nextElementSibling;
    const isOpen = answer.classList.contains('open');
    
    document.querySelectorAll('.faq-port-answer')
            .forEach(a => a.classList.remove('open'));
    document.querySelectorAll('.faq-port-question')
            .forEach(q => q.classList.remove('open'));
    
    if (!isOpen) {
        answer.classList.add('open');
        element.classList.add('open');
    }
}


// ========== NEWSLETTER SUBSCRIBE ==========
function subscribeNewsletter(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input').value;
    
    // Show success notification
    showSubscribeSuccess();
    
    // Reset form
    form.reset();
}

function showSubscribeSuccess() {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--card);
        border: 1px solid var(--green);
        color: var(--text);
        padding: 16px 24px;
        border-radius: 12px;
        font-size: 0.88rem;
        font-weight: 600;
        z-index: 99999;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5),
                    0 0 30px rgba(16,185,129,0.3);
        transform: translateX(400px);
        transition: transform 0.4s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    notif.innerHTML = `
        <i class="fas fa-check-circle" 
           style="color: var(--green);
                  font-size: 1.2rem"></i>
        <div>
            <strong>Subscribed!</strong>
            <div style="font-size: 0.78rem;
                        color: var(--text-muted);
                        margin-top: 2px">
                You'll hear from me soon!
            </div>
        </div>
    `;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notif.style.transform = 'translateX(400px)';
        setTimeout(() => notif.remove(), 400);
    }, 4000);
}


// ========== ANIMATE PROGRESS BARS ==========
const progressObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll(
                    '.progress-bar, .lang-progress-bar'
                );
                bars.forEach(bar => {
                    const currentWidth = bar.style.getPropertyValue('--progress') || 
                                        bar.style.getPropertyValue('--lvl');
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = currentWidth;
                    }, 200);
                });
                progressObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

document.querySelectorAll(
    '.tech-category-card, .language-card'
).forEach(el => progressObserver.observe(el));


// ========== NEW SECTIONS SCROLL ANIMATIONS ==========
const newSectionsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
    '.stat-counter-card, .pricing-card-port,' +
    '.faq-port-item, .blog-port-card,' +
    '.achievement-port-card, .tech-category-card,' +
    '.language-card, .pricing-guarantee'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    newSectionsObserver.observe(el);
});


// ========== UPDATE NAVBAR LINKS ==========
// Add any new section IDs to your navbar
// You may want to update the hamburger menu
// to include these new sections