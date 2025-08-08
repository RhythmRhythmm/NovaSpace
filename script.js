document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const customCursor = document.getElementById('custom-cursor');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const navbar = document.getElementById('navbar');
    const magneticBtn = document.getElementById('magnetic-btn');
    const navLinks = document.querySelectorAll('.nav-link');
    const marquee = document.getElementById('marquee');

    // --- Custom Cursor Logic ---
    document.addEventListener('mousemove', (e) => {
        customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
    });

    // --- Magnetic Button Effect ---
    if (magneticBtn) {
        magneticBtn.addEventListener('mousemove', (e) => {
            const rect = magneticBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            magneticBtn.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
        });

        magneticBtn.addEventListener('mouseleave', () => {
            magneticBtn.style.transform = 'translate(0, 0)';
        });
    }

    // --- Dark/Light Mode Toggle Logic ---
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            body.classList.add('light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light');
            body.classList.add('dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Set initial theme from local storage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.remove('dark');
        body.classList.add('light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // --- Scroll Events: Progress Bar & Sticky Navbar ---
    window.addEventListener('scroll', () => {
        // Scroll progress bar
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollPercent = (scrollY / (docHeight - windowHeight)) * 100;
        scrollProgressBar.style.width = scrollPercent + '%';

        // Sticky navbar effect
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling for Nav Links ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - navbar.offsetHeight,
                behavior: 'smooth'
            });
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate-in');
                } else if (entry.target.classList.contains('service-card')) {
                    entry.target.classList.add('animate-in');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    });
    
    document.querySelectorAll('.timeline-item, .service-card').forEach(item => {
        observer.observe(item);
    });
});
