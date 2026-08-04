/* ==========================================================================
   MGH WaveCraft — main.js
   Navbar behaviour, mobile menu, active link, contact/careers forms.
   Plain ES6. No libraries.
   ========================================================================== */

// --- Navbar: premium auto-hide + scrolled background -------------------
const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY || 0;
let scrollTicking = false;

function onNavbarScroll() {
  if (!navbar) return;
  const y = window.scrollY || 0;
  // scrolled background/blur after 80px
  navbar.classList.toggle("scrolled", y > 80);

  // If a mobile menu is open, do not auto-hide
  const menuOpen = navbar.querySelector(".nav-links.open");
  if (!menuOpen) {
    if (y > lastScrollY && y > 80) {
      // scrolling down
      navbar.classList.add("hidden");
    } else if (y < lastScrollY) {
      // scrolling up
      navbar.classList.remove("hidden");
    }
  }

  // At top of page keep it fully transparent and visible
  if (y === 0) {
    navbar.classList.remove("scrolled");
    navbar.classList.remove("hidden");
  }

  lastScrollY = y;
}

window.addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) {
      scrollTicking = true;
      window.requestAnimationFrame(() => {
        onNavbarScroll();
        scrollTicking = false;
      });
    }
  },
  { passive: true }
);

// Initial state
onNavbarScroll();

// --- Mobile menu toggle ----------------------------------------------------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") navLinks.classList.remove("open");
  });
}

// --- Highlight the current page in the menu --------------------------------
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) link.classList.add("active");
});

// --- Simple form handling (no backend required) ----------------------------
// Replace this with your own email service or Formspree endpoint if needed.
document.querySelectorAll("form[data-message]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = form.querySelector(".form-note");
    if (note) note.textContent = form.dataset.message;
    form.reset();
  });
});

// --- News search + category filter (news.html) -----------------------------
const searchInput = document.getElementById("news-search");
const newsCards = document.querySelectorAll("[data-news-card]");

function filterNews(term, category) {
  newsCards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    const matchText = !term || text.includes(term.toLowerCase());
    const matchCat = !category || category === "All" || card.dataset.category === category;
    card.style.display = matchText && matchCat ? "" : "none";
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => filterNews(searchInput.value, activeCategory));
}

let activeCategory = "All";
document.querySelectorAll("[data-category-btn]").forEach((btn) => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.categoryBtn;
    document.querySelectorAll("[data-category-btn]").forEach((b) => b.classList.remove("btn-primary"));
    btn.classList.add("btn-primary");
    filterNews(searchInput ? searchInput.value : "", activeCategory);
  });
});
