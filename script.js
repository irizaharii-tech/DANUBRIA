// ====================================================================
// 5. script.js - UI Logic and Multilingualism
// ====================================================================

document.addEventListener('DOMContentLoaded', () => {
    setYear();
    setupScrollAnimations();
    loadLanguage(); // Load saved language on page load
    setupLanguageSwitcherForQuotePage();
});

// Set current year in the Footer
function setYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ====================================================================
// A. Scroll Animations Logic (Intersection Observer)
// ====================================================================

function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('is-visible');
                // Stop observing after the animation runs once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to all elements with the .animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// ====================================================================
// B. Multilingualism Logic (English, Italian, Spanish)
// ====================================================================

function switchLanguage(lang) {
    // 1. Change the document's language attribute
    document.documentElement.lang = lang;
    
    // 2. Save the selected language in localStorage
    localStorage.setItem('danubria_lang', lang);

    // 3. Iterate through all elements with language attributes
    document.querySelectorAll('[data-lang-en]').forEach(element => {
        const langAttribute = `data-lang-${lang}`;
        
        if (element.hasAttribute(langAttribute)) {
            // Update text content
            if (element.tagName === 'INPUT' && element.type === 'text') {
                // For inputs with text placeholder, you might use 'placeholder' attribute
                // For simplicity here, we only use textContent
            } else if (element.tagName === 'OPTION') {
                // Update OPTION text (for select menus)
                element.textContent = element.getAttribute(langAttribute);
            } else if (element.tagName !== 'SELECT' && element.tagName !== 'INPUT') {
                // Update text content for typical elements (a, h1, p, h2, label, button)
                element.textContent = element.getAttribute(langAttribute);
            }
        }
    });
}

function loadLanguage() {
    const savedLang = localStorage.getItem('danubria_lang') || 'en'; // Default: EN
    switchLanguage(savedLang);
}

// Ensure the language switcher on the quote page loads the correct selection
function setupLanguageSwitcherForQuotePage() {
    const langSwitcher = document.getElementById('language-switcher');
    if (langSwitcher) {
        langSwitcher.value = localStorage.getItem('danubria_lang') || 'en';
    }
}


// ====================================================================
// C. UI Header Logic (Change background on Scroll)
// ====================================================================

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        // Apply semi-opaque background for better readability when scrolling
        header.style.backgroundColor = 'rgba(10, 15, 26, 0.95)';
    } else {
        // Keep header transparent at the top of the page (for the cinematic Hero section)
        header.style.backgroundColor = 'transparent';
    }
});
