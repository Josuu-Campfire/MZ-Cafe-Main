// Load navbar and footer from components.html
function loadComponents() {
    fetch('/components.html')
        .then(response => response.text())
        .then(html => {
            // Parse the HTML to extract navbar and footer
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const navbar = doc.querySelector('nav');
            const footer = doc.querySelector('footer');
            
            // Insert navbar at the beginning of body
            if (navbar) {
                document.body.insertBefore(navbar, document.body.firstChild);
            }
            
            // Insert footer at the end of body
            if (footer) {
                document.body.appendChild(footer);
            }
            
            // Re-initialize mobile menu functionality
            setupMobileMenu();
            
            // Re-initialize theme functionality
            initializeTheme();
            toggleThemeListeners();
            
            // Re-initialize active page indicator
            updateActiveLink();
        })
        .catch(error => console.error('Error loading components:', error));
}

// Setup mobile menu functionality
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuDropdown = document.getElementById('mobileMenuDropdown');

    if (mobileMenuToggle && mobileMenuDropdown) {
        // Toggle dropdown when button is clicked
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuDropdown.classList.toggle('active');
        });

        // Close dropdown when a link is clicked
        document.querySelectorAll('.mobile-menu-dropdown .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuDropdown.classList.remove('active');
            });
        });

        // Close dropdown when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && !e.target.closest('#mobileMenuToggle')) {
                mobileMenuDropdown.classList.remove('active');
            }
        });
    }
}

// Check if this is a subpage (not index.html)
const isSubpage = window.location.pathname.includes('/Pages/');

// Load components if on a subpage, otherwise navbar/footer are already in the HTML
if (isSubpage) {
    document.addEventListener('DOMContentLoaded', () => {
        loadComponents();
        // Initialize theme listeners after DOM is ready
        setTimeout(toggleThemeListeners, 100);
    });
} else {
    // For index.html, just setup the mobile menu
    document.addEventListener('DOMContentLoaded', () => {
        setupMobileMenu();
        initializeTheme();
        toggleThemeListeners();
    });
}

// Dark Mode Toggle
const htmlElement = document.documentElement;

// Load saved theme preference from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const lightIcon = document.getElementById('lightIcon');
    const darkIcon = document.getElementById('darkIcon');
    const lightIconMobile = document.getElementById('lightIconMobile');
    const darkIconMobile = document.getElementById('darkIconMobile');
    
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark-mode');
        if (lightIcon) lightIcon.style.display = 'none';
        if (darkIcon) darkIcon.style.display = 'inline-block';
        if (lightIconMobile) lightIconMobile.style.display = 'none';
        if (darkIconMobile) darkIconMobile.style.display = 'inline-block';
    } else {
        htmlElement.classList.remove('dark-mode');
        if (lightIcon) lightIcon.style.display = 'inline-block';
        if (darkIcon) darkIcon.style.display = 'none';
        if (lightIconMobile) lightIconMobile.style.display = 'inline-block';
        if (darkIconMobile) darkIconMobile.style.display = 'none';
    }
}

// Toggle theme and save preference
function toggleTheme() {
    htmlElement.classList.toggle('dark-mode');
    
    const isDarkMode = htmlElement.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    const lightIcon = document.getElementById('lightIcon');
    const darkIcon = document.getElementById('darkIcon');
    const lightIconMobile = document.getElementById('lightIconMobile');
    const darkIconMobile = document.getElementById('darkIconMobile');
    
    // Toggle icon visibility for desktop
    if (lightIcon && darkIcon) {
        if (isDarkMode) {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'inline-block';
        } else {
            lightIcon.style.display = 'inline-block';
            darkIcon.style.display = 'none';
        }
    }
    
    // Toggle icon visibility for mobile
    if (lightIconMobile && darkIconMobile) {
        if (isDarkMode) {
            lightIconMobile.style.display = 'none';
            darkIconMobile.style.display = 'inline-block';
        } else {
            lightIconMobile.style.display = 'inline-block';
            darkIconMobile.style.display = 'none';
        }
    }
}

// Attach theme toggle listeners
function toggleThemeListeners() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    
    // Remove old listeners and add new ones
    if (themeToggle) {
        themeToggle.removeEventListener('click', toggleTheme);
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (themeToggleMobile) {
        themeToggleMobile.removeEventListener('click', toggleTheme);
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
}


// Active Page Indicator
function updateActiveLink() {
    // Active link indicators have been disabled - no visual feedback needed
}

// Active link indicator disabled on page load
document.addEventListener('DOMContentLoaded', () => {
    // updateActiveLink() call removed
    // Ensure theme listeners are set up
    setTimeout(toggleThemeListeners, 50);
});

// Handle delivery scroll on home page
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If it's a hash link (#delivery) on the current page, prevent default and scroll
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

