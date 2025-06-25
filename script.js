document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const accountToggle = document.getElementById('accountToggle');
    const modal = document.getElementById('loginSignupModal');
    const closeBtn = document.querySelector('.close');
    const tabButtons = document.querySelectorAll('.tab-button');
    const formContainers = document.querySelectorAll('.form-container');
    const switchToSignup = document.getElementById('switchToSignup');
    const wrist = document.querySelector("#wrist-timer");

    let currentSlide = 0;

    // Initialize ScrollMagic
    const controller = new ScrollMagic.Controller();

    // Toggle mobile navigation
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

    // Toggle search container
    searchToggle.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
    });

    // Close search container when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target) && !searchToggle.contains(e.target)) {
            searchContainer.classList.remove('active');
        }
    });

    // Slider functionality
    function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Auto slide
    setInterval(() => showSlide(currentSlide + 1), 5000);

    // Scroll animations
    const animateSections = document.querySelectorAll('.animate-section');
    animateSections.forEach(section => {
        new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 0.8,
            reverse: false
        })
        .setClassToggle(section, 'active')
        .addTo(controller);
    });

    // Collection card animations
    const collectionCards = document.querySelectorAll('.collection-card, .service-item, .collection-item');
    collectionCards.forEach(card => {
        new ScrollMagic.Scene({
            triggerElement: card,
            triggerHook: 0.9,
            reverse: false
        })
        .setClassToggle(card, 'active')
        .addTo(controller);
    });

    // Scroll to top functionality
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
            scrollToTopBtn.classList.add('bounce');
        } else {
            scrollToTopBtn.classList.remove('show');
            scrollToTopBtn.classList.remove('bounce');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Stop bouncing animation when button is hovered
    scrollToTopBtn.addEventListener('mouseenter', () => {
        scrollToTopBtn.classList.remove('bounce');
    });

    scrollToTopBtn.addEventListener('mouseleave', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('bounce');
        }
    });

    // Login/Signup Modal Functionality

    accountToggle.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            formContainers.forEach(container => container.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${tabName}Form`).classList.add('active');
        });
    });

    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        tabButtons.forEach(btn => btn.classList.remove('active'));
        formContainers.forEach(container => container.classList.remove('active'));
        
        tabButtons[1].classList.add('active');
        document.getElementById('signupForm').classList.add('active');
    });

    
    //welcome note animation
    const speed = 150;

    let text = ['W', 'R', 'I', 'S', 'T', ' ', 'T', 'I', 'M', 'E', 'R'];
    let isSonata = false;
    let i = 0;
    wrist.innerHTML = ''
    setInterval(() => {
    if(i < text.length)
       wrist.innerHTML += text[i++];
    else{
        if(!isSonata){ 
            isSonata = !isSonata;
            text = ['S', 'O', 'N', 'A', 'T', 'A'];
         }
         else{
            isSonata = !isSonata;
            text = ['W', 'R', 'I', 'S', 'T', ' ', 'T', 'I', 'M', 'E', 'R'];
         }
        i = 0;
        wrist.innerHTML = '';
    }

    },speed)


    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Responsive navigation
    function checkScreenSize() {
        if (window.innerWidth > 768) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize(); // Initial check
});
