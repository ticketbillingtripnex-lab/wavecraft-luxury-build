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
  const slider = document.querySelector(".slider");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector("img") : null;

  let index = 0;

  function goTo(i, direction = "next") {
    index = (i + slides.length) % slides.length;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    thumbs.forEach((t, n) => t.classList.toggle("active", n === index));
    if (slider) {
      slider.classList.add("is-transitioning");
      slider.style.setProperty("--tilt-x", direction === "prev" ? "-4deg" : "4deg");
      slider.style.setProperty("--tilt-y", direction === "prev" ? "2deg" : "-2deg");
      window.setTimeout(() => {
        slider.classList.remove("is-transitioning");
        slider.style.setProperty("--tilt-x", "0deg");
        slider.style.setProperty("--tilt-y", "0deg");
      }, 500);
    }
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1, "prev"));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1, "next"));
  thumbs.forEach((thumb, n) => thumb.addEventListener("click", () => goTo(n, n < index ? "prev" : "next")));

  if (slider) {
    slider.addEventListener("mousemove", (e) => {
      const rect = slider.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      slider.style.setProperty("--tilt-x", `${(x - 0.5) * 8}deg`);
      slider.style.setProperty("--tilt-y", `${(y - 0.5) * 8}deg`);
    });

    slider.addEventListener("mouseleave", () => {
      slider.style.setProperty("--tilt-x", "0deg");
      slider.style.setProperty("--tilt-y", "0deg");
    });
  }

  // Keyboard arrows
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(index - 1, "prev");
    if (e.key === "ArrowRight") goTo(index + 1, "next");
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
