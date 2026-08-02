/* ==========================================================================
   MGH WaveCraft — main.js
   Navbar behaviour, mobile menu, active link, contact/careers forms.
   Plain ES6. No libraries.
   ========================================================================== */

// --- Sticky navbar: add a glass background after scrolling -----------------
const navbar = document.querySelector(".navbar");

function handleScroll() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", handleScroll);
handleScroll();

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
