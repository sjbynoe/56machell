
// Header
const topbar = document.getElementById('topbar');

window.addEventListener('scroll', () => {
    if (topbar) {
        topbar.classList.toggle('solid', window.scrollY > 20);
    }
});

// Mobile Menu
const menuButton = document.getElementById('menuButton');
const mainNav = document.getElementById('mainNav');

if (menuButton && mainNav) {

    menuButton.addEventListener('click', () => {
        const opened = mainNav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', opened);
    });

    document.querySelectorAll('#mainNav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });
}

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

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');

const galleryButtons = Array.from(document.querySelectorAll('[data-full]'));

let currentPhotoIndex = 0;

function showPhoto(index) {
    currentPhotoIndex =
        (index + galleryButtons.length) % galleryButtons.length;

    const button = galleryButtons[currentPhotoIndex];

    lightboxImage.src = button.dataset.full;

    const img = button.querySelector('img');
    if (img) {
        lightboxImage.alt = img.alt;
    }
}

function closeGallery() {
    if (lightbox.open) {
        lightbox.close();
    }
}

galleryButtons.forEach((button, index) => {

    button.addEventListener('click', (e) => {

        e.preventDefault();

        currentPhotoIndex = index;
        showPhoto(index);

        button.blur();

        lightbox.showModal();

        setTimeout(() => {
            if (document.activeElement) {
                document.activeElement.blur();
            }
        }, 0);
    });

});

if (prevPhoto) {
    prevPhoto.addEventListener('click', (e) => {
        e.stopPropagation();
        showPhoto(currentPhotoIndex - 1);
    });
}

if (nextPhoto) {
    nextPhoto.addEventListener('click', (e) => {
        e.stopPropagation();
        showPhoto(currentPhotoIndex + 1);
    });
}

if (closeLightbox) {
    closeLightbox.addEventListener('click', (e) => {
        e.stopPropagation();
        closeGallery();
    });
}

lightbox.addEventListener('click', (e) => {

    if (
        e.target !== lightboxImage &&
        e.target !== prevPhoto &&
        e.target !== nextPhoto &&
        e.target !== closeLightbox
    ) {
        closeGallery();
    }

});

document.addEventListener('keydown', (e) => {

    if (!lightbox.open) return;

    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPhoto(currentPhotoIndex - 1);
    }

    if (e.key === 'ArrowRight') {
        e.preventDefault();
        showPhoto(currentPhotoIndex + 1);
    }

    if (e.key === 'Escape') {
        e.preventDefault();
        closeGallery();
    }

});


gtag('event','gallery_photo_view',{
  image: imageSrc
});


