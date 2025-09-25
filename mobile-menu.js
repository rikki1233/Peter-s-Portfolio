// Mobile Hamburger Menu Handler
class MobileMenu {
    constructor() {
        this.hamburgerButton = document.getElementById('hamburger-menu');
        this.mobileNav = document.getElementById('mobile-nav');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        this.body = document.body;
        this.isOpen = false;
        
        this.init();
    }

    init() {
        if (this.hamburgerButton && this.mobileNav) {
            // Toggle menu on hamburger click
            this.hamburgerButton.addEventListener('click', this.toggleMenu.bind(this));
            
            // Close menu when clicking on nav links
            this.mobileNavLinks.forEach(link => {
                link.addEventListener('click', this.closeMenu.bind(this));
            });
            
            // Close menu when clicking outside
            this.mobileNav.addEventListener('click', (e) => {
                if (e.target === this.mobileNav) {
                    this.closeMenu();
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeMenu();
                }
            });
            
            // Handle window resize
            window.addEventListener('resize', this.handleResize.bind(this));
        }
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.hamburgerButton.classList.add('active');
        this.mobileNav.classList.add('active');
        this.body.classList.add('mobile-menu-open');
        
        // Add smooth scroll behavior for mobile nav links
        this.addSmoothScroll();
    }

    closeMenu() {
        this.isOpen = false;
        this.hamburgerButton.classList.remove('active');
        this.mobileNav.classList.remove('active');
        this.body.classList.remove('mobile-menu-open');
    }

    handleResize() {
        // Close menu on desktop resize
        if (window.innerWidth > 768 && this.isOpen) {
            this.closeMenu();
        }
    }

    addSmoothScroll() {
        // Add smooth scrolling behavior for mobile navigation
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Only handle anchor links
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Close menu first
                        this.closeMenu();
                        
                        // Smooth scroll to target after a short delay
                        setTimeout(() => {
                            targetElement.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }, 300);
                    }
                }
            });
        });
    }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
});

