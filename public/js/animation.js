/* ==========================================================================
   MGH WaveCraft — animation.js
   1. Reveal elements on scroll (.fade-in / .slide-up -> .visible)
   2. Simple hero parallax
   3. Counting statistics
   ========================================================================== */

// --- 1. Reveal on scroll ---------------------------------------------------
const revealItems = document.querySelectorAll(".fade-in, .slide-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
);

revealItems.forEach((item) => observer.observe(item));

// --- 2. Simple parallax on the hero media ----------------------------------
const heroMedia = document.querySelector(".hero-media");

window.addEventListener("scroll", () => {
  if (!heroMedia) return;
  const offset = window.scrollY * 0.25; // change 0.25 for a stronger effect
  heroMedia.style.transform = "translateY(" + offset + "px)";
});

// --- 3. Animated statistic counters ----------------------------------------
// Usage in HTML: <strong data-count="250" data-suffix="+">0</strong>
const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    let current = 0;
    const step = Math.max(1, Math.round(target / 60));

    const tick = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(tick);
      }
      el.textContent = current + suffix;
    }, 24);

    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach((el) => counterObserver.observe(el));
