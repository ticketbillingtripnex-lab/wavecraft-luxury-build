/* ==========================================================================
   MGH WaveCraft — animation.js
   1. Cinematic reveal on scroll   2. Counting statistics
   (Parallax, tilt and text splitting live in js/premium.js)
   ========================================================================== */

// --- 1. Reveal on scroll ---------------------------------------------------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -70px 0px" }
);

function observeReveals() {
  document
    .querySelectorAll(".fade-in:not(.visible), .slide-up:not(.visible), .reveal:not(.visible)")
    .forEach((item) => observer.observe(item));
}
observeReveals();
window.mghObserveReveals = observeReveals;

// --- 2. Animated statistic counters ----------------------------------------
// Usage: <strong data-count="250" data-suffix="+">0</strong>
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const duration = 1600;
      const start = performance.now();

      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));
