let images = ["gambar/foto mts1.jpg", "gambar/foto guru.jpg", "gambar/foto mts2.jpg", "gambar/foto bersama.jpg", "gambar/foto mts3.jpg"];
let currentIndex = 0;
let bannerImage, dots;
let slideshowTimer;
let currentLightbox = null;

function handleKeyDown(e) {
    if (e.keyCode === 27) {
        if (currentLightbox === 'image') {
            closeLightbox();
        } else if (currentLightbox === 'video') {
            closeVideo();
        }
    }
}

function initBannerSlider() {
    bannerImage = document.getElementById("bannerImage");
    const dotsContainer = document.querySelector(".dots-container");

    if (dotsContainer) {
        dotsContainer.innerHTML = "";
        for (let i = 0; i < images.length; i++) {
            const dot = document.createElement("span");
            dot.className = "dot";
            dot.onclick = function () { goToSlide(i); };
            dotsContainer.appendChild(dot);
        }
        dots = document.querySelectorAll(".dot");
    }

    if (bannerImage) {
        showSlide(currentIndex);
        startSlideshow();
    }
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.style.display = "none";
        document.body.classList.remove('no-scroll');
        currentLightbox = null;
    }
}

function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;

    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = lightbox.querySelector(".close");

    document.querySelectorAll(".galeri-item img").forEach(img => {
        img.addEventListener("click", function () {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
            document.body.classList.add('no-scroll');
            currentLightbox = 'image';
        });
    });

    if (bannerImage) {
        bannerImage.addEventListener("click", function () {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
            document.body.classList.add('no-scroll');
            currentLightbox = 'image';
        });
    }

    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function initVideoLightbox() {
    const videoBtn = document.querySelector('.video-btn');
    if (videoBtn) {
        videoBtn.addEventListener('click', openVideo);
    }

    const videoLightbox = document.getElementById('videoLightbox');
    if (videoLightbox) {
        videoLightbox.addEventListener('click', function (e) {
            if (e.target === videoLightbox) {
                closeVideo();
            }
        });
    }
}

function showSlide(index) {
    if (!bannerImage || !dots) return;

    bannerImage.classList.add("fade-out");

    setTimeout(() => {
        bannerImage.src = images[index];
        bannerImage.classList.remove("fade-out");

        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[index]) dots[index].classList.add("active");
    }, 300);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
    resetSlideshow();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(currentIndex);
    resetSlideshow();
}

function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
    resetSlideshow();
}

function startSlideshow() {
    slideshowTimer = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showSlide(currentIndex);
    }, 5000);
}

function resetSlideshow() {
    clearInterval(slideshowTimer);
    startSlideshow();
}

function openVideo() {
    const videoLightbox = document.getElementById('videoLightbox');
    const videoFrame = document.getElementById('videoFrame');

    videoFrame.src = "https://www.youtube.com/embed/evv6wRzRGr4?autoplay=1";
    videoLightbox.style.display = "block";
    document.body.classList.add('no-scroll');
    currentLightbox = 'video';
}

function closeVideo() {
    const videoLightbox = document.getElementById('videoLightbox');
    const videoFrame = document.getElementById('videoFrame');

    videoFrame.src = "";
    videoLightbox.style.display = "none";
    document.body.classList.remove('no-scroll');
    currentLightbox = null;
}

const readMoreBtn = document.getElementById("readMoreBtn");
if (readMoreBtn) {
    readMoreBtn.addEventListener("click", function () {
        const target = document.getElementById("sambutan");
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initBannerSlider();
    initLightbox();
    initVideoLightbox();

    document.addEventListener('keydown', handleKeyDown);
});