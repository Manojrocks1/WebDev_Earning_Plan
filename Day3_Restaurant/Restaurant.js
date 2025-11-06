// <!-- Minimal JS for mobile menu toggle + contact form demo

    // mobile menu toggle
    const mobileBtn = document.getElementById('mobileBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // contact form demo (no backend) - show success message and clear fields
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const status = document.getElementById('formStatus');
      status.textContent = 'Message sent! (Demo) — I will contact you soon.';
      status.style.color = 'green';
      this.reset();

      // small fade effect
      status.style.opacity = 1;
      setTimeout(() => { status.style.opacity = 0.9; }, 2000);
    });

    // Updated code

    // MENU FILTER FEATURE
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-filter');

    // Highlight active button
    filterButtons.forEach(btn => btn.classList.remove('bg-green-600', 'text-white'));
    button.classList.add('bg-green-600', 'text-white');

    // Filter menu items
    menuItems.forEach(item => {
      if (category === 'all' || item.classList.contains(category)) {
        item.classList.remove('hidden');
        item.classList.add('animate-fadeIn');
      } else {
        item.classList.add('hidden');
        item.classList.remove('animate-fadeIn');
      }
    });
  });
});