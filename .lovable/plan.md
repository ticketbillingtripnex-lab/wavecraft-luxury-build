# Fix GitHub sync: shrink the repo's heavy media

## What I checked

- Every file (HTML, CSS, JS, and all 18 asset files) is already committed on the Lovable side — nothing is left uncommitted, so the site source itself is not the blocker.
- The repo carries a 19 MB video at `public/assets/videos/myvideo.mp4`, plus ~22 MB of media total. Large binaries are the most common cause of pushes that stall or silently stop after an initial commit, which matches "old code only, no recent changes."

## Plan

1. Move heavy media out of the repo and onto Lovable's CDN
   - Upload `public/assets/videos/myvideo.mp4` and any other image over 100 KB to the Lovable asset CDN.
   - Each file is replaced by a tiny pointer file committed in its place; the file itself is served from a fast global CDN.
   - Update the hero video tag, poster image, and every CSS/HTML reference to point at the new CDN URLs.
   - Delete the original binaries from the repo.

2. Verify the site still looks and behaves identically
   - Load the home page and the gallery in the preview, confirm the hero video plays, the poster shows, and all boat/gallery images render.

3. Re-trigger the GitHub sync
   - With the repo down from ~22 MB to well under 1 MB, the push should complete. If GitHub still shows old commits after this, the remaining fix is on the platform side: disconnect and reconnect the repo from the Plus (+) menu -> GitHub, which forces a fresh full push.

## Technical notes

- Uses the `lovable-assets` CLI; pointer files are `*.asset.json` next to where the binary lived.
- No design, layout, or functionality changes — only asset locations and the URLs referencing them.
- SVGs and small icons stay in the repo (CDN serves SVG as a download, not inline).
