
// --- Smooth scroll with navbar offset ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#' || href.indexOf('http') === 0) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const nav = document.querySelector('.navbar'); 
    const navHeight = nav ? nav.offsetHeight : 0;
    const offset = 10;
    const targetY = target.getBoundingClientRect().top + window.pageYOffset - navHeight - offset;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });
});

// --- Fade-in sections on scroll ---
const sections = document.querySelectorAll('.content-section, .hero-content');

window.addEventListener('scroll', () => {
  const triggerBottom = window.innerHeight * 0.85;

  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
});
const images = document.querySelectorAll(".carousel-images img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

function showImage(index) {
  images.forEach(img => img.classList.remove("active"));
  images[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

// Fade-in effect when section scrolls into view
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2, // triggers when 20% visible
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
