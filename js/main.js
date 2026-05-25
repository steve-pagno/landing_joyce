document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // STICKY HEADER & BACK-TO-TOP BUTTON
    // ==========================================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    const scrollThreshold = 100;

    function handleScrollEffects() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        // Sticky Nav
        if (scrollTop > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollTop > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScrollEffects);
    
    // Back to top click action
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // MOBILE NAVIGATION BURGER MENU
    // ==========================================
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        burger.classList.toggle('active');
        navMenu.classList.toggle('open');
        
        // Prevent body scrolling when menu is open
        if (navMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    burger.addEventListener('click', toggleMenu);

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside of the drawer
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== burger && !burger.contains(e.target)) {
            burger.classList.remove('active');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // ==========================================
    // ACTIVE NAV LINK HIGHLIGHTER ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 120; // offset to trigger active state slightly earlier

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (targetLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // ==========================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ==========================================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const animationOptions = {
        root: null, // use viewport
        threshold: 0.1, // trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // offset bottom trigger point
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, animationOptions);

    animateElements.forEach(element => {
        animationObserver.observe(element);
    });
});
