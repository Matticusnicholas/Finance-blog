// The Money Blog - Main JavaScript

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;

        // In a real implementation, this would send to a backend
        // For now, just show a confirmation
        const button = this.querySelector('button');
        const originalText = button.textContent;

        button.textContent = 'Subscribed!';
        button.style.backgroundColor = '#2f855a';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            this.reset();
        }, 2000);
    });
}

// Reading progress indicator for articles
const articleContent = document.querySelector('.article-content');
if (articleContent) {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #38a169, #2d5a87);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    });
}

// Add copy functionality to code blocks
document.querySelectorAll('.article-content code').forEach(codeBlock => {
    if (codeBlock.parentElement.tagName === 'PRE') {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        codeBlock.parentElement.parentNode.insertBefore(wrapper, codeBlock.parentElement);
        wrapper.appendChild(codeBlock.parentElement);

        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 8px;
            font-size: 12px;
            background: #1a365d;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        `;

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.textContent);
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy';
            }, 2000);
        });

        wrapper.appendChild(copyButton);
    }
});

// Mobile navigation toggle
const header = document.querySelector('header');
const nav = document.querySelector('nav ul');

// Create mobile menu button
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.innerHTML = '&#9776;';
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.style.cssText = `
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
`;

// Insert mobile menu button
const headerContainer = document.querySelector('.header-container');
if (headerContainer) {
    headerContainer.appendChild(mobileMenuBtn);
}

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('mobile-open');
});

// Add mobile styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block !important;
        }
        nav ul {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%);
            padding: 1rem;
        }
        nav ul.mobile-open {
            display: flex;
        }
        nav ul li {
            margin: 0.5rem 0;
        }
    }
`;
document.head.appendChild(mobileStyles);

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add estimated reading time to articles
const articleHeader = document.querySelector('.article-header .meta');
if (articleContent && articleHeader) {
    const text = articleContent.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed

    // Reading time is already in the meta, but this could be used for dynamic calculation
}

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '&uarr;';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #1a365d;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
    } else {
        scrollTopBtn.style.opacity = '0';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Console message for developers
console.log('%cThe Money Blog', 'font-size: 24px; font-weight: bold; color: #1a365d;');
console.log('%cReal talk about personal finance.', 'font-size: 14px; color: #718096;');
