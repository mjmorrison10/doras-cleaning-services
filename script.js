/* ============================================
   DORA'S CLEANING SERVICES — SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ===== SCROLL PROGRESS BAR =====
    const scrollProgress = document.getElementById('scrollProgress');
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    }

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ===== OPEN/CLOSED INDICATOR =====
    const openIndicator = document.getElementById('openIndicator');
    function updateOpenStatus() {
        if (!openIndicator) return;
        const now = new Date();
        const day = now.getDay(); // 0=Sun, 1=Mon, ...
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = hour + minute / 60;

        // Mon-Sat: 7AM-5PM
        const isOpen = (day >= 1 && day <= 6) && (currentTime >= 7 && currentTime < 17);

        const dot = openIndicator.querySelector('.open-dot');
        const text = openIndicator.querySelector('.open-text');

        if (isOpen) {
            openIndicator.classList.add('open');
            openIndicator.classList.remove('closed');
            text.textContent = 'Open Now';
        } else {
            openIndicator.classList.add('closed');
            openIndicator.classList.remove('open');
            text.textContent = 'Closed';
        }
    }

    // ===== MOBILE MENU =====
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenu.setAttribute('aria-hidden',
                !mobileMenu.classList.contains('active'));
            const expanded = mobileToggle.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', expanded);
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.setAttribute('aria-hidden', 'true');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');
    function handleBackToTop() {
        if (!backToTop) return;
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== SCROLL REVEAL =====
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Clear previous errors
            contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
            contactForm.querySelectorAll('.form-error').forEach(e => e.textContent = '');

            // Name validation
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                showFieldError('name', 'Please enter your name');
                isValid = false;
            }

            // Phone validation
            const phone = document.getElementById('phone');
            const phoneVal = phone.value.replace(/\D/g, '');
            if (!phoneVal || phoneVal.length < 7) {
                showFieldError('phone', 'Please enter a valid phone number');
                isValid = false;
            }

            // Email validation
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                showFieldError('email', 'Please enter a valid email address');
                isValid = false;
            }

            if (isValid) {
                contactForm.style.display = 'none';
                formSuccess.classList.add('active');
            }
        });
    }

    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorEl = document.getElementById(fieldId + '-error');
        if (field) field.closest('.form-group').classList.add('error');
        if (errorEl) errorEl.textContent = message;
    }

    // ===== COMBINED SCROLL HANDLER =====
    function onScroll() {
        updateScrollProgress();
        handleNavbarScroll();
        handleBackToTop();
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial calls
    updateScrollProgress();
    handleNavbarScroll();
    updateOpenStatus();
    handleBackToTop();

    // Update open status every minute
    setInterval(updateOpenStatus, 60000);
});
