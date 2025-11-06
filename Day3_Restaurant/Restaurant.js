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