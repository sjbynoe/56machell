
Header
const topbar = document.getElementById('topbar');
window.addEventListener('scroll', () => {
    topbar.classList.toggle('solid', window.scrollY > 20);
});

// Mobile Menu
const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');

menuButton.addEventListener('click', () => {
    const opened = mainNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', opened);
});

// Close menu when a menu link is clicked
document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
    });
});

// Hero Slider
const slides = document.querySelectorAll('.hero-slide');
let index = 0;

if (slides.length > 1) {
    setInterval(() => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }, 4500);
}

// Footer Year
const year = document.getElementById('year');
if (year) {
    year.textContent = new Date().getFullYear();
}

// Lightbox Gallery
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');

document.querySelectorAll('[data-full]').forEach(button => {
    button.addEventListener('click', () => {
        lightboxImage.src = button.dataset.full;
        lightbox.showModal();
    });
});

if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        lightbox.close();
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.close();
        }
    });
}

