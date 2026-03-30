// ===== DOM Content Loaded =====
window.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio site loaded!");

  // Initialize all animations
  initScrollAnimations();
  initNavbarScroll();
  initSkillBars();
  initTypingEffect();
  initCustomCursor();
  initScrollProgress();
  initCounterAnimation();
  initTiltEffect();
  initActiveNavHighlight();
  initParallaxEffect();
});

// ===== Typing Effect =====
function initTypingEffect() {
  const typingText = document.querySelector('.typing-text');
  if (!typingText) return;

  const text = typingText.dataset.text;
  let index = 0;
  let isDeleting = false;
  let pauseEnd = false;

  function type() {
    const currentText = text.substring(0, index);
    typingText.textContent = currentText;

    if (!isDeleting && index < text.length) {
      index++;
      setTimeout(type, 150);
    } else if (!isDeleting && index === text.length) {
      pauseEnd = true;
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 2000);
    } else if (isDeleting && index > 0) {
      index--;
      setTimeout(type, 75);
    } else if (isDeleting && index === 0) {
      isDeleting = false;
      setTimeout(type, 500);
    }
  }

  setTimeout(type, 1000);
}

// ===== Custom Cursor =====
function initCustomCursor() {
  const cursorFollower = document.querySelector('.cursor-follower');
  const cursorDot = document.querySelector('.cursor-dot');
  
  if (!cursorFollower || !cursorDot || window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth cursor follower animation
  function animateCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .cert-card, .social-icon');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorFollower.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hover'));
  });
}

// ===== Scroll Progress Bar =====
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}

// ===== Counter Animation =====
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const target = parseInt(entry.target.dataset.target);
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        function updateCounter() {
          current += step;
          if (current < target) {
            entry.target.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target;
          }
        }
        updateCounter();
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ===== 3D Tilt Effect =====
function initTiltEffect() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.setProperty('--rotateX', rotateX + 'deg');
      card.style.setProperty('--rotateY', rotateY + 'deg');
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rotateX', '0deg');
      card.style.setProperty('--rotateY', '0deg');
    });
  });
}

// ===== Active Nav Highlight =====
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// ===== Parallax Effect =====
function initParallaxEffect() {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
  });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));
}

// ===== Navbar Scroll Effect =====
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== Skill Bars Animation =====
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.dataset.progress;
        entry.target.style.width = progress + '%';
      }
    });
  }, {
    threshold: 0.5
  });

  skillBars.forEach(bar => observer.observe(bar));
}

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile nav if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});
