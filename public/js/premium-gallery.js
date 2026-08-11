/* ==========================================================================
   MGH WaveCraft — premium-gallery.js
   Vanilla JS 3D glassmorphism vessel showcase.
   Click ‹ / › to morph between vessels: image cross-dissolves with blur +
   depth, spec cards stagger in, progress bar animates.
   To add a vessel: append an entry to the BOATS array below.
   ========================================================================== */
(function () {
  const root = document.getElementById("premium-gallery-root");
  if (!root) return;

  const BOATS = [
    { name: "Luxury Passenger Boat", model: "WAVECRAFT 42", speed: "38 Knots", length: "12.80 m", capacity: "12 Passengers", engine: "2 × Yamaha 350HP", fuel: "800 L", beam: "4.20 m", category: "Luxury Cabin Cruiser", image: "/__l5e/assets-v1/91d76316-fec7-44da-877d-ad3898825aea/image1.jpg" },
    { name: "Inter-Island Ferry", model: "WAVECRAFT A-65", speed: "29 Knots", length: "16.80 m", capacity: "96 Passengers", engine: "2 × Scania DI13", fuel: "2,200 L", beam: "5.20 m", category: "Passenger Ferry", image: "/__l5e/assets-v1/f1f539f5-e821-4cb2-9911-3039da57efc3/boat3.jpg" },
    { name: "Resort Jetty Arrival", model: "WAVECRAFT 48", speed: "36 Knots", length: "13.40 m", capacity: "24 Passengers", engine: "2 × Yamaha 400HP", fuel: "900 L", beam: "4.60 m", category: "Resort Transfer", image: "/__l5e/assets-v1/62e8d799-b51d-42e0-bc6a-764e956eb1f2/project1.jpg" },
    { name: "Expedition Charter", model: "WAVECRAFT 50", speed: "32 Knots", length: "15.20 m", capacity: "30 Passengers", engine: "2 × Volvo Penta", fuel: "1,000 L", beam: "5.00 m", category: "Luxury Charter", image: "/__l5e/assets-v1/07f478dc-d42c-435d-98e8-cba936c5ceac/project2.jpg" },
    { name: "Interior Lounge Detail", model: "WAVECRAFT 33", speed: "28 Knots", length: "10.90 m", capacity: "14 Passengers", engine: "2 × Suzuki 250HP", fuel: "580 L", beam: "3.60 m", category: "Executive Transfer", image: "/__l5e/assets-v1/db6c610b-1825-4b8b-a75d-a8ae9bcb2683/image3.jpg" },
    { name: "Helm & Navigation", model: "WAVECRAFT 44", speed: "37 Knots", length: "13.90 m", capacity: "16 Passengers", engine: "2 × Yamaha 320HP", fuel: "720 L", beam: "4.25 m", category: "Command Series", image: "/__l5e/assets-v1/3d771fd6-d6b6-407e-a650-b9ff2fb4c51e/image4.jpg" },
    { name: "Luxury Island Transfer", model: "WAVECRAFT 46", speed: "35 Knots", length: "14.50 m", capacity: "20 Passengers", engine: "2 × Suzuki 350HP", fuel: "840 L", beam: "4.45 m", category: "Yacht Support", image: "/__l5e/assets-v1/bab49655-170b-4010-91f1-d35fb340bd3f/project3.jpg" },
    { name: "WaveCraft Signature", model: "WAVECRAFT 40", speed: "33 Knots", length: "13.10 m", capacity: "18 Passengers", engine: "2 × Yamaha 320HP", fuel: "780 L", beam: "4.30 m", category: "Signature Edition", image: "/__l5e/assets-v1/7e0fea47-c5bf-40c6-85c1-17f347c1feb1/boat1.jpg" },
  ];

  const SPECS = [
    ["⚡ Max Speed", "speed"],
    ["📏 Length", "length"],
    ["👥 Capacity", "capacity"],
    ["⚙ Engine", "engine"],
    ["⛽ Fuel Tank", "fuel"],
    ["🌊 Beam", "beam"],
    ["📦 Category", "category"],
  ];

  const pad = (n) => String(n).padStart(2, "0");

  root.innerHTML = `
    <div class="premium-gallery-card" data-card>
      <div class="premium-gallery-backdrop"></div>
      <div class="premium-gallery-inner">
        <div class="premium-gallery-left">
          <div class="premium-gallery-image-shell">
            <img class="premium-gallery-image" data-image alt="" />
            <div class="premium-gallery-reflection" data-reflection></div>
            <div class="premium-gallery-light"></div>
          </div>
        </div>
        <div class="premium-gallery-right">
          <div class="premium-gallery-topbar">
            <div>
              <p class="premium-mini-label">OUR FLEET</p>
              <h2>WAVECRAFT COLLECTION</h2>
            </div>
            <div class="premium-gallery-preview">
              <span class="premium-gallery-counter" data-counter></span>
              <div class="premium-progress-bar"><span data-progress></span></div>
            </div>
          </div>
          <div class="premium-gallery-title">
            <p data-category></p>
            <h1 data-model></h1>
          </div>
          <div class="premium-spec-list" data-specs></div>
          <div class="premium-gallery-actions">
            <button class="btn btn-glass premium-action-btn" type="button">View Details</button>
            <button class="btn btn-primary premium-action-btn premium-action-primary" type="button">Explore Boat</button>
          </div>
        </div>
        <button class="premium-nav premium-nav-prev" data-prev type="button" aria-label="Previous boat"><span>‹</span></button>
        <button class="premium-nav premium-nav-next" data-next type="button" aria-label="Next boat"><span>›</span></button>
      </div>
    </div>`;

  const q = (sel) => root.querySelector(sel);
  const card = q("[data-card]");
  const image = q("[data-image]");
  const reflection = q("[data-reflection]");
  const counter = q("[data-counter]");
  const progress = q("[data-progress]");
  const categoryEl = q("[data-category]");
  const modelEl = q("[data-model]");
  const specList = q("[data-specs]");

  let index = 0;
  let busy = false;

  image.style.transition = "opacity .55s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1), filter .55s ease";
  progress.style.transition = "width .7s cubic-bezier(.22,1,.36,1)";

  function renderSpecs(boat) {
    specList.innerHTML = SPECS.map(
      ([label, key], i) =>
        `<div class="premium-spec-card" style="opacity:0;transform:translateY(22px) scale(.98);transition:opacity .5s ease ${i * 70}ms, transform .6s cubic-bezier(.22,1,.36,1) ${i * 70}ms">
           <span>${label}</span><strong>${boat[key]}</strong>
         </div>`
    ).join("");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        specList.querySelectorAll(".premium-spec-card").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        });
      });
    });
  }

  function paint(boat) {
    counter.textContent = `${pad(index + 1)} / ${pad(BOATS.length)}`;
    progress.style.width = `${((index + 1) / BOATS.length) * 100}%`;
    categoryEl.textContent = boat.category;
    modelEl.textContent = boat.model;
    renderSpecs(boat);
  }

  function show(newIndex, dir) {
    if (busy) return;
    busy = true;
    index = (newIndex + BOATS.length) % BOATS.length;
    const boat = BOATS[index];

    image.style.opacity = "0";
    image.style.filter = "blur(18px)";
    image.style.transform = `translateX(${dir * -28}px) scale(.96) rotateY(${dir * -6}deg)`;

    const next = new Image();
    next.src = boat.image;

    setTimeout(() => {
      image.src = boat.image;
      image.alt = `${boat.model} — ${boat.name}`;
      reflection.style.backgroundImage = `linear-gradient(to top, rgba(255,255,255,0.16), transparent), url(${boat.image})`;
      image.style.transform = `translateX(${dir * 28}px) scale(1.04) rotateY(${dir * 6}deg)`;
      paint(boat);
      requestAnimationFrame(() => {
        image.style.opacity = "1";
        image.style.filter = "blur(0px)";
        image.style.transform = "translateX(0) scale(1) rotateY(0deg)";
        setTimeout(() => (busy = false), 650);
      });
      // preload the following slide
      const ahead = new Image();
      ahead.src = BOATS[(index + 1) % BOATS.length].image;
    }, 320);
  }

  // initial paint (no transition-in delay)
  image.src = BOATS[0].image;
  image.alt = `${BOATS[0].model} — ${BOATS[0].name}`;
  reflection.style.backgroundImage = `linear-gradient(to top, rgba(255,255,255,0.16), transparent), url(${BOATS[0].image})`;
  paint(BOATS[0]);

  q("[data-next]").addEventListener("click", () => show(index + 1, 1));
  q("[data-prev]").addEventListener("click", () => show(index - 1, -1));
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(index + 1, 1);
    if (e.key === "ArrowLeft") show(index - 1, -1);
  });

  // 3D tilt + glass light tracking
  if (window.matchMedia("(hover: hover)").matches) {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--tx", `${x * 6}deg`);
      card.style.setProperty("--ty", `${y * -4}deg`);
      card.style.setProperty("--glow-x", `${50 + x * 24}%`);
      card.style.setProperty("--glow-y", `${50 + y * 24}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tx", "0deg");
      card.style.setProperty("--ty", "0deg");
      card.style.setProperty("--glow-x", "50%");
      card.style.setProperty("--glow-y", "50%");
    });
  }

  // swipe support
  let sx = null;
  card.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  card.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    sx = null;
  }, { passive: true });
})();
