// Bootstrap handles the navbar toggle automatically
// This script is reserved for additional custom functionality

// Close navbar when a link is clicked on mobile
document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', () => {
        const navbarToggle = document.querySelector('.navbar-toggler');
        const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            navbarToggle.click();
        }
    });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const lightIcon = document.getElementById('lightIcon');
const darkIcon = document.getElementById('darkIcon');
const htmlElement = document.documentElement;

// Load saved theme preference from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark-mode');
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'inline-block';
    } else {
        htmlElement.classList.remove('dark-mode');
        lightIcon.style.display = 'inline-block';
        darkIcon.style.display = 'none';
    }
}

// Toggle theme and save preference
function toggleTheme() {
    htmlElement.classList.toggle('dark-mode');
    
    const isDarkMode = htmlElement.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Toggle icon visibility
    if (isDarkMode) {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'inline-block';
    } else {
        lightIcon.style.display = 'inline-block';
        darkIcon.style.display = 'none';
    }
}

// Add click event listener to toggle button
themeToggle.addEventListener('click', toggleTheme);

// Initialize theme on page load
initializeTheme();


// Active Page Indicator
function updateActiveLink() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPath = window.location.pathname.toLowerCase();
    
    // Remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Determine which page we're on
    let activePage = 'home'; // default
    
    if (currentPath.includes('menu')) {
        activePage = 'menu';
    } else if (currentPath.includes('promo')) {
        activePage = 'promo';
    } else if (currentPath.includes('about')) {
        activePage = 'about';
    } else if (currentPath === '/index.html' || currentPath === '/' || currentPath.endsWith('index.html')) {
        activePage = 'home';
    }
    
    // Add active class to corresponding link
    navLinks.forEach(link => {
        const href = link.getAttribute('href').toLowerCase();
        
        if (activePage === 'home' && (href === '/index.html' || href === 'index.html')) {
            link.classList.add('active');
        } else if (activePage === 'menu' && href.includes('menu')) {
            link.classList.add('active');
        } else if (activePage === 'promo' && href.includes('promo')) {
            link.classList.add('active');
        } else if (activePage === 'about' && href.includes('about')) {
            link.classList.add('active');
        }
    });
}

// Update active link on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
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

