// -------------------- Preloader --------------------
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const body = document.querySelector('body');

    // We want to ensure our new logo animation has time to play.
    // The total animation time is 1.5s (1s draw + 0.5s fill).
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
        if (body) {
            body.classList.remove('loading');
        }
    }, 1500); // Synced with the total CSS animation duration
});
// -------------------- Hamburger Menu --------------------
const hamburger = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".nav-links");
const heroIcons = document.querySelector(".icon-container");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }
});

if (heroIcons) {
    heroIcons.addEventListener("click", (e) => {
        const icon = e.target.closest(".icon");
        if (!icon) return; // Exit if the click wasn't on an icon

        // Only prevent default for placeholder icons with href="#"
        if (icon.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });
}

// -------------------- Contact Form (with EmailJS) --------------------
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const formStatus = document.getElementById("form-status");

    // Initialize EmailJS with your Public Key
    // IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual public key from your EmailJS account
    emailjs.init("YOUR_PUBLIC_KEY");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Show a "Sending..." message to the user
        formStatus.textContent = "Sending...";
        formStatus.style.color = "#d1d5db";

        // IMPORTANT: Replace with your Service ID and Template ID from your EmailJS account
        const serviceID = "YOUR_SERVICE_ID";
        const templateID = "YOUR_TEMPLATE_ID";

        emailjs.sendForm(serviceID, templateID, e.target)
            .then(() => {
                formStatus.textContent = "Thank you for your message!";
                formStatus.style.color = "#a994ee";
                contactForm.reset();
            }, (err) => {
                formStatus.textContent = "Oops! Something went wrong. Please try again.";
                formStatus.style.color = "#ff6b6b"; // A distinct error color
                console.error("EmailJS Error:", JSON.stringify(err));
            });
    });
}

// -------------------- Typing Animation Function --------------------
function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.innerHTML = ""; // Clear the element's content
    const cursor = '<span class="typing-cursor">|</span>';
    element.innerHTML = cursor; // Show cursor immediately

    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + cursor;
            i++;
            setTimeout(type, speed);
        } else {
            // Typing finished, remove cursor and execute callback if it exists
            element.innerHTML = text;
            if (callback) {
                callback();
            }
        }
    }
    type();
}

// -------------------- Portfolio Filtering --------------------
const portfolioNav = document.querySelector(".portfolio-nav");
const projectCards = document.querySelectorAll(".project-card");

if (portfolioNav) {
    portfolioNav.addEventListener("click", (e) => {
        const clickedItem = e.target.closest(".icon-nav-item");
        if (!clickedItem) return;

        e.preventDefault();

        portfolioNav.querySelector(".active").classList.remove("active");
        clickedItem.classList.add("active");

        const filter = clickedItem.dataset.filter;
        projectCards.forEach(card => {
            card.classList.toggle("hide", filter !== "all" && card.dataset.category !== filter);
        });
    });
}

// -------------------- Scroll Animations --------------------
const createObserver = (callback, options) => {
    return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);
};

// A helper function to apply the observer to elements matching a selector
const observeElements = (selector, options) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
        const observer = createObserver(el => el.classList.add('visible'), options);
        elements.forEach(el => observer.observe(el));
    }
};

// Special observer for the About Me section to trigger typing
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const aboutObserver = createObserver(target => {
        // Check the flag to ensure it only runs once
        if (target.dataset.typed === 'false') {
            target.dataset.typed = 'true'; // Set flag to true

            // Add 'visible' class to trigger animations for title, buttons, and image
            target.classList.add('visible');

            const p1 = document.getElementById('about-p1');
            const p2 = document.getElementById('about-p2');
            const text1 = p1.textContent.trim();
            const text2 = p2.textContent.trim();
            const typingSpeed = 30; // milliseconds per character

            // Hide original paragraphs until typing starts
            p1.textContent = '';
            p2.textContent = '';

            // Start typing the first paragraph, then the second as a callback
            typeWriter(p1, text1, typingSpeed, () => {
                typeWriter(p2, text2, typingSpeed);
            });
        }
    }, { threshold: 0.4 }); // Trigger when 40% of the section is visible
    aboutObserver.observe(aboutSection);
}

observeElements('.skills-section', { threshold: 0.2 });
observeElements('.project-card', { threshold: 0.1 });
observeElements('.reveal-on-scroll', { threshold: 0.2 });

// -------------------- Particles.js Background --------------------
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 60,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#a994ee"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": true
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#7173e3",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 100,
                    "duration": 0.4
                },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}
