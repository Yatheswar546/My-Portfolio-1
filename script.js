/* =====================================================
   DEVELOPER PORTFOLIO - MAIN JAVASCRIPT
   Handles navigation, animations, and form validation
   ===================================================== */

// Initialize Lucide icons
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initSkillAnimations();
    initContactForm();
});

/* ===================== NAVIGATION ===================== */
function initNavigation() {
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Handle scroll state for navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        // Update active nav link based on scroll position
        updateActiveNavLink();
    }

    // Toggle mobile menu
    function toggleMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
    }

    // Close mobile menu when clicking a link
    function closeMobileMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll("section[id]");
        const scrollPosition = window.scrollY + 150;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    // Event listeners
    window.addEventListener("scroll", handleScroll);
    hamburger.addEventListener("click", toggleMenu);
    navLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navMenu.classList.contains("active")) {
            closeMobileMenu();
        }
    });

    // Initial state check
    handleScroll();
}

/* ===================== SMOOTH SCROLL ===================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            // Skip if it is just "#"
            if (href === "#") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.getElementById("navbar").offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

/* ===================== SCROLL ANIMATIONS ===================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for elements in the same section
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 50);
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    animatedElements.forEach((element) => {
        observer.observe(element);
    });
}

/* ===================== SKILL BAR ANIMATIONS ===================== */
function initSkillAnimations() {
    const skillItems = document.querySelectorAll(".skill-item");
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    skillItems.forEach((item) => {
        observer.observe(item);
    });
}

/* ============================================
   Training Photos Slider
   ============================================ */

const trainingSlider = document.getElementById('training-slider');
const trainingSlides = document.querySelectorAll('.training-slide');
const trainingPrev = document.querySelector('.training-prev');
const trainingNext = document.querySelector('.training-next');
const trainingDots = document.querySelectorAll('.training-dot');

if (trainingSlider && trainingSlides.length > 0) {

    let trainingCurrent = 0;

    function getTrainingSlidesPerView() {
        return window.innerWidth <= 768 ? 1 : 2;
    }

    function updateTrainingSlider() {

        const slidesPerView = getTrainingSlidesPerView();
        const maxIndex = Math.max(
            0,
            trainingSlides.length - slidesPerView
        );

        trainingCurrent = Math.min(trainingCurrent, maxIndex);

        const slideWidth = trainingSlides[0].offsetWidth;
        const gap = 16;

        trainingSlider.style.transform =
            `translateX(-${trainingCurrent * (slideWidth + gap)}px)`;

        trainingDots.forEach((dot, index) => {
            dot.classList.toggle(
                'active',
                index === trainingCurrent
            );
        });
    }


    trainingNext?.addEventListener('click', () => {

        const slidesPerView = getTrainingSlidesPerView();
        const maxIndex = Math.max(
            0,
            trainingSlides.length - slidesPerView
        );

        if (trainingCurrent < maxIndex) {
            trainingCurrent++;
        } else {
            trainingCurrent = 0;
        }

        updateTrainingSlider();
    });


    trainingPrev?.addEventListener('click', () => {

        const slidesPerView = getTrainingSlidesPerView();
        const maxIndex = Math.max(
            0,
            trainingSlides.length - slidesPerView
        );

        if (trainingCurrent > 0) {
            trainingCurrent--;
        } else {
            trainingCurrent = maxIndex;
        }

        updateTrainingSlider();
    });


    trainingDots.forEach((dot, index) => {

        dot.addEventListener('click', () => {
            trainingCurrent = index;
            updateTrainingSlider();
        });

    });


    window.addEventListener('resize', updateTrainingSlider);

    updateTrainingSlider();
}

/* ============================================
   Student Feedback Slider
   ============================================ */

const feedbackSlider = document.getElementById('feedback-slider');
const feedbackSlides = document.querySelectorAll('.feedback-slide');
const feedbackPrev = document.querySelector('.feedback-prev');
const feedbackNext = document.querySelector('.feedback-next');
const feedbackDotsContainer = document.getElementById('feedback-dots');

if (
    feedbackSlider &&
    feedbackSlides.length > 0 &&
    feedbackDotsContainer
) {

    let feedbackCurrent = 0;


    /* --------------------------------------------
       Determine cards visible at once
       -------------------------------------------- */

    function getFeedbackSlidesPerView() {

        if (window.innerWidth <= 768) {
            return 1;
        }

        if (window.innerWidth <= 1024) {
            return 2;
        }

        return 3;
    }


    /* --------------------------------------------
       Calculate number of pages
       -------------------------------------------- */

    function getFeedbackPageCount() {

        const slidesPerView = getFeedbackSlidesPerView();

        return Math.max(
            1,
            Math.ceil(
                feedbackSlides.length / slidesPerView
            )
        );
    }


    /* --------------------------------------------
       Create dots automatically
       -------------------------------------------- */

    function createFeedbackDots() {

        feedbackDotsContainer.innerHTML = '';

        const pageCount = getFeedbackPageCount();

        for (let i = 0; i < pageCount; i++) {

            const dot = document.createElement('button');

            dot.className = 'feedback-dot';

            if (i === feedbackCurrent) {
                dot.classList.add('active');
            }

            dot.setAttribute(
                'aria-label',
                `Go to feedback page ${i + 1}`
            );

            dot.addEventListener('click', () => {

                feedbackCurrent = i;

                updateFeedbackSlider();

            });

            feedbackDotsContainer.appendChild(dot);
        }
    }


    /* --------------------------------------------
       Update slider position
       -------------------------------------------- */

    function updateFeedbackSlider() {

        const slidesPerView = getFeedbackSlidesPerView();

        const pageCount = getFeedbackPageCount();

        /* Keep current page valid after resizing */
        feedbackCurrent = Math.min(
            feedbackCurrent,
            pageCount - 1
        );


        /*
         * Move by the number of cards visible.
         *
         * Each card has a 1.25rem gap.
         */
        const slideWidth = feedbackSlides[0].offsetWidth;

        const gap = 20;

        const moveAmount =
            feedbackCurrent *
            slidesPerView *
            (slideWidth + gap);


        feedbackSlider.style.transform =
            `translateX(-${moveAmount}px)`;


        /* Update dots */

        const dots =
            feedbackDotsContainer.querySelectorAll(
                '.feedback-dot'
            );

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                'active',
                index === feedbackCurrent
            );

        });
    }


    /* --------------------------------------------
       Next
       -------------------------------------------- */

    feedbackNext?.addEventListener('click', () => {

        const pageCount = getFeedbackPageCount();

        if (feedbackCurrent < pageCount - 1) {

            feedbackCurrent++;

        } else {

            feedbackCurrent = 0;

        }

        updateFeedbackSlider();

    });


    /* --------------------------------------------
       Previous
       -------------------------------------------- */

    feedbackPrev?.addEventListener('click', () => {

        const pageCount = getFeedbackPageCount();

        if (feedbackCurrent > 0) {

            feedbackCurrent--;

        } else {

            feedbackCurrent = pageCount - 1;

        }

        updateFeedbackSlider();

    });


    /* --------------------------------------------
       Handle browser resizing
       -------------------------------------------- */

    window.addEventListener(
        'resize',
        () => {

            feedbackCurrent = 0;

            createFeedbackDots();

            updateFeedbackSlider();

        }
    );


    /* --------------------------------------------
       Initial setup
       -------------------------------------------- */

    createFeedbackDots();

    updateFeedbackSlider();

}

/* ===================== UTILITY FUNCTIONS ===================== */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
