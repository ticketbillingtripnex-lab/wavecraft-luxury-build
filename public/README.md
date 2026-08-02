# MGH WaveCraft — Website

A static luxury website for **MGH WaveCraft**, luxury fiberglass boat builders in
the Maldives. Built with plain **HTML5, CSS3 and vanilla JavaScript** — no build
step, no framework, no database.

## Folder structure

```
index.html          Home
about.html          Company story, vision, values, timeline, leadership
fleet.html          Wave / Atlas / Voyager series and custom builds
projects.html       Projects, case study, before & after
facility.html       Boatyard, fiberglass process, sea trials
craftsmanship.html  How the boats are built (9 stages)
gallery.html        Slider with thumbnails + fullscreen view
careers.html        Benefits, culture, positions, application form
news.html           Blog cards with search and category filter
contact.html        Contact form, map, WhatsApp, phone, email

css/
  style.css         Design system, layout, components
  animations.css    Fade-in, slide-up, floating, hover effects
  responsive.css    Desktop / laptop / tablet / mobile rules

js/
  main.js           Navbar, mobile menu, forms, news filter
  animation.js      Scroll reveal, parallax, counters
  gallery.js        Slider, thumbnails, fullscreen lightbox

assets/
  boats/  gallery/  facility/  projects/  team/  videos/  logos/  icons/  news/
```

Every image and video is loaded **only** from `assets/`. Nothing is hotlinked
from the internet, so you can replace any file without touching the code.

## How to change things

### Change the logo
Replace `assets/logos/logo.png` with your own PNG (transparent background,
roughly 600×200 px). Nothing else to edit — the navbar, footer and favicon all
point at that one file.

### Replace images
Overwrite the file with the same name, e.g. `assets/boats/boat1.jpg`. To use a
different filename, edit the `src="..."` in the relevant HTML page.

### Replace the hero video
Put your video at `assets/videos/hero.mp4` (MP4, H.264, ideally under 10 MB).
The still image shown before the video loads is
`assets/videos/hero-poster.jpg` — replace it the same way.

### Edit text
All text lives directly in the HTML files. Open the page, find the sentence,
change it. There is no CMS and no template language.

### Add a new boat
Open `fleet.html`, copy one `<article class="card"> ... </article>` block and
change the image, name, description and the `<li>` rows inside `<ul class="specs">`.

### Add a new project
Open `projects.html`, copy an `<article class="card">` block and point it to a
new image in `assets/projects/`.

### Add gallery images
1. Drop the image into `assets/gallery/`.
2. In `gallery.html`, add an `<img>` inside `<div class="slider-track">`.
3. Add the same `<img>` inside `<div class="thumbs">`.
The slider counts the images automatically.

### Add a news article
Open `news.html` and copy an `<article class="card" data-news-card data-category="...">`
block. The `data-category` value is used by the category filter buttons.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com) choose **Add New → Project** and import
   the repository.
3. Framework preset: **Other**. Build command: leave empty.
   Output directory: `.` (the folder containing `index.html`).
4. Click **Deploy**.

Or from your terminal:

```bash
npm i -g vercel
vercel
```

## Notes

- The contact and careers forms show a confirmation message in the browser and
  do not send email. To receive submissions, point the `<form>` at a service
  such as Formspree, or add a small backend of your choice.
- The site needs no backend, database, authentication or API.
