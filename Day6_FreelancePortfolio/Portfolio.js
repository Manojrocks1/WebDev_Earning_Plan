    {/* ---------- Typing animation ---------- */}
    (function typing(){
      const el = document.getElementById('typed');
      const text = "Hi, I'm Manoj Kumar 👋";
      let i = 0;
      function type() {
        el.textContent = text.slice(0, i++);
        if(i <= text.length) {
          setTimeout(type, 45);
        } else {
          // remove caret after finish
          el.style.borderRight = 'none';
        }
      }
      type();
    })();

     {/* ---------- Mobile menu + overlay ---------- */}
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('overlay');
    const closeMenu = document.getElementById('close-menu');

    function openMenu() {
      mobileMenu.classList.remove('translate-x-full');
      overlay.classList.remove('hidden');
    }
    function closeMenuFn() {
      mobileMenu.classList.add('translate-x-full');
      overlay.classList.add('hidden');
    }

    menuBtn?.addEventListener('click', openMenu);
    closeMenu?.addEventListener('click', closeMenuFn);
    overlay?.addEventListener('click', closeMenuFn);

    // Close when clicking mobile links
    document.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', closeMenuFn));

    /* ---------- Scroll reveal (intersection observer) ---------- */
    const observers = document.querySelectorAll('.fade-in');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const delay = parseFloat(entry.target.dataset.delay || 0);
        if(entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), delay * 300);
        }
      });
    }, { threshold: 0.15 });

    observers.forEach(el => io.observe(el));

    /* ---------- Active nav link highlighting ---------- */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = ['home','services','work','contact'].map(id => document.getElementById(id));

    function onScroll() {
      const scrollY = window.scrollY + 120; // offset for navbar
      let current = 'home';
      sections.forEach(sec => {
        if(!sec) return;
        if(scrollY >= sec.offsetTop) current = sec.id;
      });
      navLinks.forEach(link => {
        link.classList.toggle('text-green-600', link.getAttribute('href') === '#' + current);
      });

      // show scroll-to-top
      const toTop = document.getElementById('toTop');
      if(window.scrollY > 400) toTop.style.display = 'block'; else toTop.style.display = 'none';
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    // scroll-to-top button
    document.getElementById('toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ---------- small accessibility tweak: close mobile menu on ESC ---------- */
    window.addEventListener('keydown', e => {
      if(e.key === 'Escape') closeMenuFn();
    });