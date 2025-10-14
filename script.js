// ====================================================================
// 4. script.js - UI Logic and Multilingualism
// ====================================================================

document.addEventListener('DOMContentLoaded', () => {
    setYear();
    setupScrollAnimations();
    loadLanguage(); 
    setupHeaderScroll();
});

// Sets the current year in the Footer
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
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// ====================================================================
// B. Multilingualism Logic (EN, IT, ES)
// ====================================================================

function switchLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('danubria_lang', lang);

    // Update all elements with language attributes
    document.querySelectorAll('[data-lang-en]').forEach(element => {
        const langAttribute = `data-lang-${lang}`;
        
        if (element.hasAttribute(langAttribute)) {
            // Check if it's a selectable option
            if (element.tagName === 'OPTION') {
                 // Update OPTION text (for select menus)
                element.textContent = element.getAttribute(langAttribute);
            } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                // Update placeholder text for input fields
                element.setAttribute('placeholder', element.getAttribute(langAttribute));
            } else if (element.tagName !== 'SELECT' && element.tagName !== 'INPUT') {
                // Update text content for typical elements (a, h1, p, h2, label, button)
                element.textContent = element.getAttribute(langAttribute);
            }
        }
    });
    
    // Ensure the language switcher itself shows the correct selection
    const langSwitcher = document.getElementById('language-switcher');
    if (langSwitcher && langSwitcher.value !== lang) {
        langSwitcher.value = lang;
    }
}

function loadLanguage() {
    const savedLang = localStorage.getItem('danubria_lang') || 'en'; // Default: EN
    switchLanguage(savedLang);
}

// ====================================================================
// C. Header Scroll Effect
// ====================================================================

function setupHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            // Only remove 'scrolled' class if not on the quote page, 
            // as the quote page header should always be scrolled/opaque
            if (!document.body.classList.contains('quote-page')) {
                header.classList.remove('scrolled');
            }
        }
    });

    // Add class for quote page body if needed (though CSS handles it directly now)
    if (window.location.pathname.includes('quote.html')) {
         header.classList.add('scrolled');
    }
}
