# my-site

Personal portfolio site styled as a virtual desktop OS (TorrOS).

## Quick start

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## Deploy to GitHub Pages

This repo is configured for a **project site** at:

`https://androiddoctorr.github.io/my-site-2/`

1. Push to GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).

The workflow runs `npm run build:pages`, which uses `--mode pages` and `.env.pages` for the public URL and `/my-site-2/` asset base path.

### Custom domain or different repo name

Update these if your URL changes:

- `.env.pages` — `VITE_SITE_URL`
- `vite.config.js` — `base: '/my-site-2/'` inside `buildSiteConfig`
- `public/CNAME` (optional) — your custom domain

For a **user site** (`username.github.io` repo), set `base: '/'` and the matching `VITE_SITE_URL`.

## SEO & contact

- Meta tags, Open Graph, Twitter cards, and JSON-LD are injected at build time via `index.html` placeholders.
- `robots.txt`, `sitemap.xml`, and `.nojekyll` are written to `dist/` on build.
- `public/og-image.png` is used for social previews.
- Email is **click-to-reveal** in the Start menu (not stored in JSON); address is XOR-encoded in `src/utils/contactEmail.js`.

## Structure

- `src/data/` — JSON content (projects, experience, education, etc.)
- `src/components/desktop/` — desktop icons and right-click menu
- `src/components/taskbar/` — Start button, clock, and Start menu
- `src/components/windows/` — draggable/resizable program windows
- `reference/` — original JSON exports from the old site

See `docs/plan.md` and `docs/roadmap.md` for the full vision.
