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

// FormSubmit feedback
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

// ========== 26‑IMAGE MARQUEE BUILDER ==========
(function buildMegaMarquee() {
  // Build array of exactly 26 images: header.jpeg + image1..image6 + image7..image25
  const imagePaths = [];
  imagePaths.push('images/header.jpeg');   // flagship
  for (let i = 1; i <= 6; i++) imagePaths.push(`images/image${i}.jpeg`);
  for (let i = 7; i <= 25; i++) imagePaths.push(`images/image${i}.jpeg`);
  // Total = 1 + 6 + 19 = 26

  function createMarqueeItem(imgSrc, altText) {
    const div = document.createElement('div');
    div.className = 'marquee-image-card';
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = altText || 'Salefu landscaping masterpiece';
    img.loading = 'lazy';
    div.appendChild(img);
    return div;
  }

  const leftStrip = document.getElementById('marqueeLeftStrip');
  const rightStrip = document.getElementById('marqueeRightStrip');

  function buildStrip(stripElement, imagesArray) {
    if (!stripElement) return;
    stripElement.innerHTML = '';
    // Append 3 full cycles for seamless infinite animation
    for (let rep = 0; rep < 3; rep++) {
      imagesArray.forEach((path, idx) => {
        const card = createMarqueeItem(path, `Project ${idx+1}`);
        stripElement.appendChild(card);
      });
    }
  }

  buildStrip(leftStrip, imagePaths);
  buildStrip(rightStrip, imagePaths);
})();