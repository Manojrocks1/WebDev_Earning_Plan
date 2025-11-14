 // Initialize AOS animation
    AOS.init({ duration: 1000, once: true });

    // Sidebar controls
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');

    menuBtn.onclick = () => {
      sidebar.classList.remove('translate-x-full');
      overlay.classList.remove('hidden');
    };

    closeBtn.onclick = () => {
      sidebar.classList.add('translate-x-full');
      overlay.classList.add('hidden');
    };

    overlay.onclick = () => {
      sidebar.classList.add('translate-x-full');
      overlay.classList.add('hidden');
    };

    // Scroll-to-top button visibility
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) scrollTopBtn.classList.remove('hidden');
      else scrollTopBtn.classList.add('hidden');
    });

    // Smooth scroll to top
    scrollTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // --- Feature 1: Active Navigation Link Highlighting ---

// Get all navigation links and section elements
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section');

// Function to remove the active class from all links
function removeActiveClasses() {
    navLinks.forEach(link => link.classList.remove('nav-active'));
}

// Configuration for the Intersection Observer
// rootMargin: Defines the area around the root (viewport) to start intersecting.
// '0px 0px -20% 0px' means the section is considered active when 80% up the screen.
const observerOptions = {
    root: null, // Default viewport
    rootMargin: '0px 0px -20% 0px', 
    threshold: 0.1 // Triggers when 10% of the section is visible
};

// Callback function executed when an observed element intersects the viewport
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // If the section is intersecting (visible)
        if (entry.isIntersecting) {
            removeActiveClasses(); // Clear all current active states

            // Get the ID of the visible section (e.g., 'home', 'about')
            const currentSectionId = entry.target.id; 
            
            // Find the corresponding navigation link using its href attribute
            const targetLink = document.querySelector(`header nav a[href="#${currentSectionId}"]`);
            
            // Add the custom 'nav-active' class to highlight it
            if (targetLink) {
                targetLink.classList.add('nav-active');
            }
        }
    });
}, observerOptions);

// Observe all section elements
sections.forEach(section => {
    sectionObserver.observe(section);
});