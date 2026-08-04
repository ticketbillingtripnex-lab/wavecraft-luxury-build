/* ==========================================================================
   MGH WaveCraft — gallery.js
   Cinematic vessel showcase: cross-dissolve 3D image transitions, thumbnails,
   fullscreen view, and specification panels that animate in one by one.
   To add a vessel: add an <img> to .slider-track, a thumbnail to .thumbs and
   a matching entry to the VESSELS array below.
   ========================================================================== */

const VESSELS = [
  {
    series: "Wave Series",
    title: "WaveCraft 42 Lagoon Transfer",
    copy: "Hand-laminated deep-V hull tuned for the Thaa Atoll crossing — quiet at cruise, dry in a chop, finished to resort standard.",
    specs: [
      ["Engine", "2 × Yanmar 8LV", ""],
      ["Horsepower", 740, " hp"],
      ["Length", 12.8, " m"],
      ["Capacity", 28, " guests"],
      ["Cruising Speed", 26, " kn"],
      ["Top Speed", 38, " kn"],
      ["Fuel Capacity", 900, " L"],
      ["Hull Material", "Vinylester GRP", ""],
      ["Category", "Resort Transfer", ""],
      ["Build Year", 2025, ""],
      ["Range", 240, " nm"],
    ],
    top: 38,
  },
  {
    series: "Craftsmanship",
    title: "Deck Hardware & Gelcoat Finish",
    copy: "316 stainless fittings bedded into a hand-faired, five-stage polished gelcoat surface — inspected under raking light before delivery.",
    specs: [
      ["Fittings", "316 Stainless", ""],
      ["Gelcoat Stages", 5, ""],
      ["Fairing Passes", 7, ""],
      ["Gloss Units", 92, " GU"],
      ["Bedding", "Marine PU", ""],
      ["Salt Spray Test", 1000, " h"],
      ["Warranty", 5, " yrs"],
      ["Hull Material", "Vinylester GRP", ""],
      ["Category", "Detail Work", ""],
      ["Build Year", 2025, ""],
      ["QC Points", 148, ""],
    ],
    top: 0,
  },
  {
    series: "Atlas Series",
    title: "Atlas 55 Inter-Island Ferry",
    copy: "Air-conditioned passenger cabin with acoustic-lined bulkheads, panoramic glazing and stepped seating for long inter-atoll routes.",
    specs: [
      ["Engine", "2 × Scania DI13", ""],
      ["Horsepower", 1000, " hp"],
      ["Length", 16.8, " m"],
      ["Capacity", 96, " guests"],
      ["Cruising Speed", 22, " kn"],
      ["Top Speed", 29, " kn"],
      ["Fuel Capacity", 2200, " L"],
      ["Hull Material", "Vinylester GRP", ""],
      ["Category", "Passenger Ferry", ""],
      ["Build Year", 2024, ""],
      ["Range", 320, " nm"],
    ],
    top: 29,
  },
  {
    series: "Systems",
    title: "Integrated Helm Station",
    copy: "Twin multifunction displays, digital switching, radar and AIS integrated into a single ergonomic console built in-house.",
    specs: [
      ["Displays", "2 × 16in MFD", ""],
      ["Navigation", "Radar + AIS", ""],
      ["Switching", "Digital CZone", ""],
      ["Autopilot", "Fitted", ""],
      ["Sensors", 34, ""],
      ["Alarm Points", 22, ""],
      ["Console Build", "In-house", ""],
      ["Hull Material", "Vinylester GRP", ""],
      ["Category", "Systems", ""],
      ["Build Year", 2025, ""],
      ["Redundancy", "Dual Bus", ""],
    ],
    top: 0,
  },
  {
    series: "Wave Series",
    title: "WaveCraft 36 Excursion",
    copy: "A light, agile excursion platform for snorkel and sunset charters, with a shaded aft deck and low-wash hull sections.",
    specs: [
      ["Engine", "2 × Suzuki DF300", ""],
      ["Horsepower", 600, " hp"],
      ["Length", 11.0, " m"],
      ["Capacity", 20, " guests"],
      ["Cruising Speed", 28, " kn"],
      ["Top Speed", 42, " kn"],
      ["Fuel Capacity", 700, " L"],
      ["Hull Material", "Vinylester GRP", ""],
      ["Category", "Excursion", ""],
      ["Build Year", 2025, ""],
      ["Range", 200, " nm"],
    ],
    top: 42,
  },
  {
    series: "Projects",
    title: "Resort Jetty Arrival — Thaa Atoll",
    copy: "Delivered fleet in service: three transfer vessels on a daily resort rotation, maintained under a WaveCraft service agreement.",
    specs: [
      ["Vessels", 3, ""],
      ["Route Length", 42, " nm"],
      ["Daily Rotations", 8, ""],
      ["Guests / Day", 320, ""],
      ["Uptime", 99, " %"],
      ["Delivery", "On schedule", ""],
      ["Service Plan", "Full support", ""],
      ["Hull Material", "Vinylester GRP", ""],
      ["Category", "Fleet Project", ""],
      ["Build Year", 2024, ""],
      ["Range", 240, " nm"],
    ],
    top: 34,
  },
];

const track = document.querySelector(".slider-track");

if (track) {
  const slides = Array.from(track.querySelectorAll("img"));
  const thumbs = Array.from(document.querySelectorAll(".thumbs img"));
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  const slider = document.querySelector(".slider");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox ? lightbox.querySelector("img") : null;

  const panel = document.querySelector("[data-spec-panel]");
  const eyebrowEl = document.querySelector("[data-spec-eyebrow]");
  const titleEl = document.querySelector("[data-spec-title]");
  const copyEl = document.querySelector("[data-spec-copy]");
  const listEl = document.querySelector("[data-spec-list]");
  const gaugeEl = document.querySelector("[data-gauge]");

  let index = 0;
  let specTimers = [];

  /* --- number counting for a single spec value ------------------------- */
  function countUp(el, target, suffix) {
    const decimals = String(target).includes(".") ? 1 : 0;
    const duration = 900;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* --- render the specification panel one spec at a time ---------------- */
  function renderSpecs(i) {
    if (!listEl) return;
    const data = VESSELS[i % VESSELS.length];
    specTimers.forEach(clearTimeout);
    specTimers = [];

    if (eyebrowEl) eyebrowEl.textContent = data.series;
    if (titleEl) {
      titleEl.style.opacity = "0";
      titleEl.style.transform = "translateY(14px)";
      setTimeout(() => {
        titleEl.textContent = data.title;
        titleEl.style.transition = "opacity .7s cubic-bezier(.16,.84,.24,1), transform .7s cubic-bezier(.16,.84,.24,1)";
        titleEl.style.opacity = "1";
        titleEl.style.transform = "none";
      }, 180);
    }
    if (copyEl) {
      copyEl.style.opacity = "0";
      setTimeout(() => {
        copyEl.textContent = data.copy;
        copyEl.style.transition = "opacity .8s ease";
        copyEl.style.opacity = "1";
      }, 280);
    }

    listEl.innerHTML = "";
    data.specs.forEach(([label, value, suffix], n) => {
      const li = document.createElement("li");
      const b = document.createElement("b");
      b.textContent = label;
      const span = document.createElement("span");
      span.textContent = typeof value === "number" ? "0" + (suffix || "") : value;
      li.appendChild(b);
      li.appendChild(span);
      listEl.appendChild(li);

      specTimers.push(
        setTimeout(() => {
          li.classList.add("in");
          if (typeof value === "number") countUp(span, value, suffix || "");
        }, 260 + n * 85)
      );
    });

    if (gaugeEl) {
      gaugeEl.style.width = "0%";
      specTimers.push(
        setTimeout(() => {
          gaugeEl.style.width = Math.min(100, (data.top / 45) * 100) + "%";
        }, 420)
      );
    }
  }

  /* --- cinematic slide transition --------------------------------------- */
  function goTo(i, direction = "next") {
    const previous = index;
    index = (i + slides.length) % slides.length;
    if (previous === index && slides[index].classList.contains("active")) return;

    slides.forEach((img, n) => {
      img.classList.remove("leaving");
      if (n === previous && n !== index) {
        img.classList.remove("active");
        img.classList.add("leaving");
        setTimeout(() => img.classList.remove("leaving"), 900);
      }
      img.classList.toggle("active", n === index);
    });

    thumbs.forEach((t, n) => t.classList.toggle("active", n === index));

    if (slider) {
      slider.style.setProperty("--tilt-x", direction === "prev" ? "-3deg" : "3deg");
      setTimeout(() => slider.style.setProperty("--tilt-x", "0deg"), 520);
    }
    if (panel) {
      panel.style.transition = "none";
      panel.style.transform = "translateY(10px) scale(.995)";
      panel.style.filter = "blur(4px)";
      requestAnimationFrame(() => {
        panel.style.transition = "transform .9s cubic-bezier(.16,.84,.24,1), filter .8s ease";
        panel.style.transform = "none";
        panel.style.filter = "none";
      });
    }

    renderSpecs(index);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1, "prev"));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1, "next"));
  thumbs.forEach((thumb, n) =>
    thumb.addEventListener("click", () => goTo(n, n < index ? "prev" : "next"))
  );

  /* --- pointer tilt on the showcase -------------------------------------- */
  if (slider) {
    slider.addEventListener("mousemove", (e) => {
      const rect = slider.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      slider.style.setProperty("--tilt-x", `${(x - 0.5) * 7}deg`);
      slider.style.setProperty("--tilt-y", `${(y - 0.5) * 7}deg`);
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
      if (!lightbox || !lightboxImg || !img.classList.contains("active")) return;
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

  slides.forEach((img) => (img.loading = "eager"));
  goTo(0);
}
