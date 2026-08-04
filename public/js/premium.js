/* ==========================================================================
   MGH WaveCraft — premium.js
   Cinematic layer: atmosphere, particles, word-by-word headlines, parallax,
   3D mouse tilt, glass light tracking, magnetic buttons, nav auto-hide.
   Vanilla ES6, GPU-friendly (transform / opacity only).
   ========================================================================== */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- 1. Ocean atmosphere + floating particles ------------------------- */
  function buildAtmosphere() {
    if (document.querySelector(".atmosphere")) return;
    const mesh = document.createElement("div");
    mesh.className = "atmosphere";
    document.body.prepend(mesh);

    if (reduced) return;
    const wrap = document.createElement("div");
    wrap.className = "particles";
    for (let i = 0; i < 18; i++) {
      const dot = document.createElement("i");
      const size = 3 + Math.random() * 6;
      dot.style.left = Math.random() * 100 + "vw";
      dot.style.width = dot.style.height = size + "px";
      dot.style.animationDuration = 22 + Math.random() * 26 + "s";
      dot.style.animationDelay = -Math.random() * 30 + "s";
      wrap.appendChild(dot);
    }
    document.body.prepend(wrap);
  }

  /* --- 2. Word-by-word cinematic headings ------------------------------- */
  function splitHeadings() {
    const targets = document.querySelectorAll("h1, h2, .quote");
    targets.forEach((el) => {
      if (el.dataset.split || el.children.length > 0) {
        if (el.querySelector("*")) return; // keep markup-rich headings intact
      }
      el.dataset.split = "true";
      const words = el.textContent.trim().split(/\s+/);
      el.textContent = "";
      words.forEach((word, i) => {
        const outer = document.createElement("span");
        outer.className = "split-word";
        const inner = document.createElement("span");
        inner.textContent = word;
        inner.style.transitionDelay = i * 0.055 + "s";
        outer.appendChild(inner);
        el.appendChild(outer);
        if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
      });
      el.classList.add("split-ready");
      if (!el.closest(".hero")) {
        el.classList.add("reveal");
      } else {
        requestAnimationFrame(() => el.classList.add("visible"));
      }
    });
  }

  /* --- 3. Auto-apply reveals to content blocks -------------------------- */
  function autoReveal() {
    const sel =
      "section p, section .btn, .card, .glass-card, .metric-card, .timeline-item, " +
      ".split img, .zoom-wrap, .gallery-shell, .thumbs, .logo-strip, .form-grid, .specs, .eyebrow";
    document.querySelectorAll(sel).forEach((el) => {
      if (el.closest(".hero") || el.closest(".footer")) return;
      if (el.classList.contains("fade-in") || el.classList.contains("slide-up")) return;
      el.classList.add("reveal");
    });
    // Stagger siblings inside grids
    document.querySelectorAll(".grid, .metric-grid, .form-grid").forEach((grid) => {
      Array.from(grid.children).forEach((child, i) => {
        if (i < 6) child.classList.add("delay-" + (i + 1));
      });
    });
  }

  /* --- 4. Scroll parallax ----------------------------------------------- */
  const parallaxItems = [];
  function collectParallax() {
    parallaxItems.length = 0;
    document.querySelectorAll("[data-parallax]").forEach((el) => {
      parallaxItems.push({ el, speed: parseFloat(el.dataset.parallax) || 0.15 });
    });
  }

  let ticking = false;
  function onScrollFrame() {
    const y = window.scrollY;
    parallaxItems.forEach(({ el, speed }) => {
      const rect = el.getBoundingClientRect();
      const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = "translate3d(0," + (-centerOffset * speed).toFixed(2) + "px,0)";
    });
    // Hero copy drifts up and fades as you scroll away
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      const p = Math.min(1, y / (window.innerHeight * 0.9));
      heroContent.style.transform = "translate3d(0," + (y * 0.22).toFixed(1) + "px,0)";
      heroContent.style.opacity = String(1 - p * 0.95);
    }
    const heroScroll = document.querySelector(".hero-scroll");
    if (heroScroll) heroScroll.style.opacity = String(Math.max(0, 1 - y / 300));
    ticking = false;
  }

  function requestFrame() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScrollFrame);
    }
  }

  /* --- 5. Navbar auto hide / reveal -------------------------------------- */
  function navBehaviour() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;
    let last = window.scrollY;
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY;
        navbar.classList.toggle("scrolled", y > 40);
        const menuOpen = navbar.querySelector(".nav-links.open");
        if (!menuOpen) {
          navbar.classList.toggle("hidden", y > last && y > 220);
        }
        last = y;
      },
      { passive: true }
    );
  }

  /* --- 6. 3D mouse tilt + glass light tracking --------------------------- */
  function tiltable() {
    if (reduced) return;
    document
      .querySelectorAll(".card, .glass-card, .metric-card, .gallery-panel, .zoom-wrap, .split img")
      .forEach((el) => el.setAttribute("data-tilt", ""));

    document.querySelectorAll("[data-tilt]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.classList.add("tilting");
        el.style.setProperty("--rx", ((px - 0.5) * 9).toFixed(2) + "deg");
        el.style.setProperty("--ry", ((0.5 - py) * 9).toFixed(2) + "deg");
        el.style.setProperty("--lift", "-8px");
        el.style.setProperty("--mx", px * 100 + "%");
        el.style.setProperty("--my", py * 100 + "%");
      });
      el.addEventListener("mouseleave", () => {
        el.classList.remove("tilting");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--lift", "0px");
      });
    });
  }

  /* --- 7. Hero depth from pointer ---------------------------------------- */
  function heroDepth() {
    if (reduced) return;
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const media = hero.querySelector(".hero-media");
    const content = hero.querySelector(".hero-content");
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      if (media) media.style.transform = `translate3d(${x * -26}px, ${y * -18}px, 0)`;
      if (content && window.scrollY < 80) {
        content.style.transform = `translate3d(${x * 16}px, ${y * 12}px, 0)`;
      }
    });
    hero.addEventListener("mouseleave", () => {
      if (media) media.style.transform = "";
    });
  }

  /* --- 8. Magnetic luxury buttons ---------------------------------------- */
  function magneticButtons() {
    if (reduced) return;
    document.querySelectorAll(".btn, .slider-btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        btn.style.transform = `translate3d(${x}px, ${y - 3}px, 0) scale(1.02)`;
      });
      btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
    });
  }

  /* --- 9. Elegant section dividers --------------------------------------- */
  function dividers() {
    document.querySelectorAll("section.tint, section.tint-sky").forEach((s) => {
      if (s.querySelector(".wave-divider")) return;
      const top = document.createElement("span");
      top.className = "wave-divider top";
      const bottom = document.createElement("span");
      bottom.className = "wave-divider bottom";
      s.prepend(top);
      s.appendChild(bottom);
    });
  }

  /* --- Boot --------------------------------------------------------------- */
  function init() {
    buildAtmosphere();
    splitHeadings();
    autoReveal();
    dividers();
    // Parallax hooks on media
    document.querySelectorAll(".split img, .card-media img, .zoom-wrap img").forEach((img) => {
      if (!img.dataset.parallax) img.dataset.parallax = "0.05";
    });
    collectParallax();
    navBehaviour();
    tiltable();
    heroDepth();
    magneticButtons();
    if (window.mghObserveReveals) window.mghObserveReveals();
    window.addEventListener("scroll", requestFrame, { passive: true });
    window.addEventListener("resize", collectParallax);
    requestFrame();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
