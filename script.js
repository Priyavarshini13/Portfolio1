document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       AMBIENT CURSOR GLOW
       ========================================================================== */
    const cursorGlow = document.getElementById('cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        // Offset by half of glow's width/height (300px)
        const x = e.clientX;
        const y = e.clientY;
        
        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;
    });

    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-link-btn');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        
        // Toggle hamburger bars to 'X' pattern
        const bars = mobileToggle.querySelectorAll('.bar');
        if (mobileMenu.classList.contains('open')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            const bars = mobileToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    /* ==========================================================================
       SCROLLED NAVBAR ACTION
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       ROLE TYPEWRITER EFFECT
       ========================================================================== */
    const typewriter = document.getElementById('typewriter');
    const words = [
        "AI/ML Engineer",
        "Full-Stack Developer",
        "Cloud Enthusiast",
        "GSoC Contributor",
        "Gemini Student Ambassador",
        "Sustainability Innovator"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typewriter.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Regular typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing loop
    typeEffect();

    /* ==========================================================================
       EXPERIENCE TIMELINE TABS
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Set active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Set active pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `tab-${targetTab}`) {
                    pane.classList.add('active');
                }
            });
        });
    });

    /* ==========================================================================
       PROJECT FILTERING SYSTEM
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Set active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                    // Add micro fade-in animation
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.4s, transform 0.4s';
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ==========================================================================
       INTERSECTION OBSERVER (ANIMATE ON SCROLL)
       ========================================================================== */
    const animElements = document.querySelectorAll('.scroll-animate');
    const statCards = document.querySelectorAll('.stat-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // If it's a section containing stats, animate progress bars
                if (entry.target.classList.contains('about-stats-container') || entry.target.id === 'about') {
                    statCards.forEach(card => card.classList.add('visible'));
                }
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animElements.forEach(el => scrollObserver.observe(el));

    // Fallback: trigger stats progress bars if about section is initially visible
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        scrollObserver.observe(aboutSection);
    }

    /* ==========================================================================
       CONTACT FORM SUBMISSION TOAST
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const successToast = document.getElementById('contact-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable submit button and show loading state
            formSubmitBtn.disabled = true;
            const originalText = formSubmitBtn.innerHTML;
            formSubmitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin icon-right"></i>';
            
            // Simulate API request delay
            setTimeout(() => {
                // Show success toast
                successToast.style.display = 'block';
                
                // Reset button and form
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = originalText;
                contactForm.reset();
                
                // Hide toast after 5 seconds
                setTimeout(() => {
                    successToast.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
});
