/* ==========================================================================
   MGH WaveCraft — premium-gallery.js
   Glassmorphism boat gallery: left showcase panel + right spec panel + bottom bar.
   Add a vessel by appending to the BOATS array.
   ========================================================================== */
(function () {
  const root = document.getElementById("premium-gallery-root");
  if (!root) return;

  const BOATS = [
    { name: "Luxury Passenger Boat", model: "WAVECRAFT 42", tag: "Luxury Yacht", blurb: "A refined cabin cruiser built in Thimarafushi — Italian-inspired lines with Maldivian sea-craft engineering.", length: "12.80 m", beam: "4.20 m", speed: "38 Knots", cruise: "30 Knots", engine: "2 × Yamaha 350HP", guests: "12 Guests", cabins: "2 Cabins", built: "2025", image: "/assets/gallery/image1.jpg" },
    { name: "Inter-Island Ferry", model: "WAVECRAFT A-65", tag: "Passenger Ferry", blurb: "High-capacity inter-atoll ferry engineered for daily service across the Maldives.", length: "16.80 m", beam: "5.20 m", speed: "29 Knots", cruise: "24 Knots", engine: "2 × Scania DI13", guests: "96 Guests", cabins: "1 Cabin", built: "2024", image: "/assets/boats/boat3.jpg" },
    { name: "Resort Jetty Arrival", model: "WAVECRAFT 48", tag: "Resort Transfer", blurb: "Silent, smooth resort transfers with shaded lounge seating and low-wake hull form.", length: "13.40 m", beam: "4.60 m", speed: "36 Knots", cruise: "28 Knots", engine: "2 × Yamaha 400HP", guests: "24 Guests", cabins: "1 Cabin", built: "2025", image: "/assets/projects/project1.jpg" },
    { name: "Expedition Charter", model: "WAVECRAFT 50", tag: "Luxury Charter", blurb: "Long-range charter platform for diving, island hopping and private expeditions.", length: "15.20 m", beam: "5.00 m", speed: "32 Knots", cruise: "26 Knots", engine: "2 × Volvo Penta", guests: "30 Guests", cabins: "3 Cabins", built: "2024", image: "/assets/projects/project2.jpg" },
    { name: "Interior Lounge Detail", model: "WAVECRAFT 33", tag: "Executive Transfer", blurb: "Compact executive tender with a hand-finished lounge interior and quiet ride.", length: "10.90 m", beam: "3.60 m", speed: "28 Knots", cruise: "22 Knots", engine: "2 × Suzuki 250HP", guests: "14 Guests", cabins: "1 Cabin", built: "2025", image: "/assets/gallery/image3.jpg" },
    { name: "Helm & Navigation", model: "WAVECRAFT 44", tag: "Command Series", blurb: "Command-series helm with integrated navigation glass and all-weather visibility.", length: "13.90 m", beam: "4.25 m", speed: "37 Knots", cruise: "29 Knots", engine: "2 × Yamaha 320HP", guests: "16 Guests", cabins: "2 Cabins", built: "2025", image: "/assets/gallery/image4.jpg" },
    { name: "Luxury Island Transfer", model: "WAVECRAFT 46", tag: "Yacht Support", blurb: "Yacht-support vessel balancing deck space, speed and guest comfort.", length: "14.50 m", beam: "4.45 m", speed: "35 Knots", cruise: "27 Knots", engine: "2 × Suzuki 350HP", guests: "20 Guests", cabins: "2 Cabins", built: "2024", image: "/assets/projects/project3.jpg" },
    { name: "WaveCraft Signature", model: "WAVECRAFT 40", tag: "Signature Edition", blurb: "Our signature hull — the definitive MGH WaveCraft profile, built to order.", length: "13.10 m", beam: "4.30 m", speed: "33 Knots", cruise: "26 Knots", engine: "2 × Yamaha 320HP", guests: "18 Guests", cabins: "2 Cabins", built: "2026", image: "/assets/boats/boat1.jpg" },
  ];

  const SPECS = [
    ["Length", "length"],
    ["Beam", "beam"],
    ["Max Speed", "speed"],
    ["Cruising Speed", "cruise"],
    ["Engine", "engine"],
    ["Guests", "guests"],
    ["Cabins", "cabins"],
    ["Built", "built"],
  ];

  const pad = (n) => String(n).padStart(2, "0");
  const total = pad(BOATS.length);

  root.innerHTML = `
    <div class="bg-stage" data-stage>
      <div class="bg-stage-bg" data-stagebg></div>
      <div class="bg-grid">
        <section class="bg-panel bg-main" data-card>
          <div class="bg-side">Crafted in the Maldives</div>
          <header class="bg-head">
            <div>
              <h2>Boat Gallery</h2>
              <p>Explore our exclusive collection of<br />luxury vessels, built with perfection.</p>
            </div>
            <div class="bg-count"><strong data-counter>01</strong><span>/ ${total}</span></div>
          </header>

          <div class="bg-stagearea">
            <img class="bg-hero-img" data-image alt="" />
            <button class="bg-arrow bg-arrow-prev" data-prev type="button" aria-label="Previous boat">
              <span>&#8592;</span><em>PREV</em>
            </button>
            <button class="bg-arrow bg-arrow-next" data-next type="button" aria-label="Next boat">
              <span>&#8594;</span><em>NEXT</em>
            </button>
            <div class="bg-dots" data-dots></div>
          </div>

          <div class="bg-thumbs" data-thumbs></div>
        </section>

        <aside class="bg-panel bg-specs">
          <div class="bg-specs-head">
            <span class="bg-chip" data-tag></span>
            <button class="bg-heart" type="button" aria-label="Save vessel">&#9825;</button>
          </div>
          <h3 data-model></h3>
          <p class="bg-blurb" data-blurb></p>
          <button class="bg-tour" type="button"><span>&#9678;</span> VIEW 3D TOUR</button>
          <ul class="bg-spec-list" data-specs></ul>
        </aside>
      </div>

      <div class="bg-panel bg-bottom">
        <div class="bg-bottom-item">
          <span class="bg-ico">&#9783;</span>
          <div><strong>Categories</strong><small data-cat></small></div>
          <em>&rsaquo;</em>
        </div>
        <div class="bg-bottom-center">
          <span class="bg-ico">&#9973;</span>
          <div class="bg-bottom-count"><strong data-counter2>01</strong><span>/ ${total}</span></div>
          <small data-nowname></small>
        </div>
        <button class="bg-bottom-next" data-next2 type="button">
          <div><strong>NEXT BOAT</strong><small data-nextname></small></div>
          <em>&rsaquo;</em>
          <span class="bg-circle">&#8594;</span>
        </button>
      </div>
    </div>`;

  const q = (s) => root.querySelector(s);
  const card = q("[data-card]");
  const stageBg = q("[data-stagebg]");
  const image = q("[data-image]");
  const counter = q("[data-counter]");
  const counter2 = q("[data-counter2]");
  const tagEl = q("[data-tag]");
  const modelEl = q("[data-model]");
  const blurbEl = q("[data-blurb]");
  const specList = q("[data-specs]");
  const thumbs = q("[data-thumbs]");
  const dots = q("[data-dots]");
  const catEl = q("[data-cat]");
  const nowEl = q("[data-nowname]");
  const nextEl = q("[data-nextname]");

  let index = 0;
  let busy = false;

  thumbs.innerHTML = BOATS.map(
    (b, i) => `<button class="bg-thumb" data-i="${i}" type="button" aria-label="${b.model}"><img src="${b.image}" alt="${b.model}" /></button>`
  ).join("");
  dots.innerHTML = BOATS.map((_, i) => `<button class="bg-dot" data-i="${i}" type="button" aria-label="Slide ${i + 1}"></button>`).join("");

  root.querySelectorAll("[data-i]").forEach((el) =>
    el.addEventListener("click", () => {
      const i = Number(el.dataset.i);
      if (i !== index) show(i, i > index ? 1 : -1);
    })
  );

  function renderSpecs(boat) {
    specList.innerHTML = SPECS.map(
      ([label, key], i) =>
        `<li style="opacity:0;transform:translateY(14px);transition:opacity .45s ease ${i * 55}ms, transform .55s cubic-bezier(.22,1,.36,1) ${i * 55}ms">
           <span>${label}</span><strong>${boat[key]}</strong>
         </li>`
    ).join("");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        specList.querySelectorAll("li").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      })
    );
  }

  function paint(boat) {
    counter.textContent = pad(index + 1);
    counter2.textContent = pad(index + 1);
    tagEl.textContent = boat.tag;
    modelEl.textContent = boat.model;
    blurbEl.textContent = boat.blurb;
    catEl.textContent = boat.tag;
    nowEl.textContent = boat.model;
    nextEl.textContent = BOATS[(index + 1) % BOATS.length].model;
    stageBg.style.backgroundImage = `url(${boat.image})`;
    renderSpecs(boat);
    root.querySelectorAll(".bg-thumb").forEach((el, i) => el.classList.toggle("is-active", i === index));
    root.querySelectorAll(".bg-dot").forEach((el, i) => el.classList.toggle("is-active", i === index));
  }

  image.style.transition =
    "opacity .5s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1), filter .5s ease";

  function show(newIndex, dir) {
    if (busy) return;
    busy = true;
    index = (newIndex + BOATS.length) % BOATS.length;
    const boat = BOATS[index];

    image.style.opacity = "0";
    image.style.filter = "blur(16px)";
    image.style.transform = `translateX(${dir * -34}px) scale(.95) rotateY(${dir * -6}deg)`;

    const pre = new Image();
    pre.src = boat.image;

    setTimeout(() => {
      image.src = boat.image;
      image.alt = `${boat.model} — ${boat.name}`;
      image.style.transform = `translateX(${dir * 34}px) scale(1.04) rotateY(${dir * 6}deg)`;
      paint(boat);
      requestAnimationFrame(() => {
        image.style.opacity = "1";
        image.style.filter = "blur(0)";
        image.style.transform = "none";
        setTimeout(() => (busy = false), 600);
      });
      const ahead = new Image();
      ahead.src = BOATS[(index + 1) % BOATS.length].image;
    }, 300);
  }

  image.src = BOATS[0].image;
  image.alt = `${BOATS[0].model} — ${BOATS[0].name}`;
  paint(BOATS[0]);

  q("[data-next]").addEventListener("click", () => show(index + 1, 1));
  q("[data-next2]").addEventListener("click", () => show(index + 1, 1));
  q("[data-prev]").addEventListener("click", () => show(index - 1, -1));
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") show(index + 1, 1);
    if (e.key === "ArrowLeft") show(index - 1, -1);
  });

  if (window.matchMedia("(hover: hover)").matches) {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--tx", `${x * 4}deg`);
      card.style.setProperty("--ty", `${y * -3}deg`);
      card.style.setProperty("--glow-x", `${50 + x * 26}%`);
      card.style.setProperty("--glow-y", `${50 + y * 26}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tx", "0deg");
      card.style.setProperty("--ty", "0deg");
    });
  }

  let sx = null;
  card.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  card.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    sx = null;
  }, { passive: true });
})();
