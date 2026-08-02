/* ==========================================================================
   MGH WaveCraft — gallery.js
   Image slider with previous / next, thumbnails and fullscreen view.
   To add images: add another <img> inside .slider-track (and .thumbs).
   ========================================================================== */

const track = document.querySelector(".slider-track");

if (track) {
  const slides = Array.from(track.querySelectorAll("img"));
  const thumbs = Array.from(document.querySelectorAll(".thumbs img"));
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector("img") : null;

  let index = 0;

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    thumbs.forEach((t, n) => t.classList.toggle("active", n === index));
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));
  thumbs.forEach((thumb, n) => thumb.addEventListener("click", () => goTo(n)));

  // Keyboard arrows
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
    if (e.key === "Escape" && lightbox) lightbox.classList.remove("open");
  });

  // Fullscreen view
  slides.forEach((img) => {
    img.addEventListener("click", () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
        lightbox.classList.remove("open");
      }
    });
  }

  goTo(0);
}
