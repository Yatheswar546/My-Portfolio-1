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

/* ===================== CONTACT FORM VALIDATION ===================== */
function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const fields = {
        name: {
            element: document.getElementById("name"),
            errorElement: null,
            validate: (value) => {
                if (!value.trim()) return "Name is required";
                if (value.trim().length < 2) return "Name must be at least 2 characters";
                return "";
            }
        },
        email: {
            element: document.getElementById("email"),
            errorElement: null,
            validate: (value) => {
                if (!value.trim()) return "Email is required";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return "Please enter a valid email address";
                return "";
            }
        },
        subject: {
            element: document.getElementById("subject"),
            errorElement: null,
            validate: () => "" // Optional field
        },
        message: {
            element: document.getElementById("message"),
            errorElement: null,
            validate: (value) => {
                if (!value.trim()) return "Message is required";
                if (value.trim().length < 10) return "Message must be at least 10 characters";
                return "";
            }
        }
    };
    // Get error message elements
    Object.keys(fields).forEach((key) => {
        const field = fields[key];
        field.errorElement = field.element.parentElement.querySelector(".error-message");
    });
    // Validate single field
    function validateField(fieldName) {
        const field = fields[fieldName];
        const value = field.element.value;
        const error = field.validate(value);
        if (error) {
            field.element.classList.add("error");
            field.errorElement.textContent = error;
            return false;
        } else {
            field.element.classList.remove("error");
            field.errorElement.textContent = "";
            return true;
        }
    }
    // Add blur validation for immediate feedback
    Object.keys(fields).forEach((key) => {
        fields[key].element.addEventListener("blur", () => {
            validateField(key);
        });
        // Clear error on input
        fields[key].element.addEventListener("input", () => {
            if (fields[key].element.classList.contains("error")) {
                validateField(key);
            }
        });
    });
    // Form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;
        // Validate all fields
        Object.keys(fields).forEach((key) => {
            if (!validateField(key)) {
                isValid = false;
            }
        });
        if (isValid) {
            // Simulate form submission
            const submitBtn = form.querySelector(".btn-submit");
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                submitBtn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";
                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = "";
                    lucide.createIcons();
                }, 3000);
            }, 1500);
        }
    });
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
