// Theme Toggle (Light / Dark Mode)
const themeToggle = document.getElementById('themeToggle');
const sunIcon = themeToggle.querySelector('.fa-sun');
const moonIcon = themeToggle.querySelector('.fa-moon');

function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'flex';
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    sunIcon.style.display = 'flex';
    moonIcon.style.display = 'none';
  }
}

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark-mode');
  setTheme(isDark ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') setTheme('dark');
else setTheme('light');

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// FormSubmit feedback (optional: handle success message)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 3000);
  });
}