# my-site

Personal portfolio site styled as a virtual desktop OS (TorrOS).

## Quick start

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## Deploy to GitHub Pages

This repo is configured for the **user site** at:

`https://androiddoctorr.github.io/`

1. Push to the `AndroidDoctorr.github.io` repo on GitHub.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).

The workflow runs `npm run build:pages`, which uses `--mode pages`, `.env.pages`, and `base: '/'`.

### Project site instead (`/my-repo/`)

If you deploy a **project site** (not `username.github.io`), set in `vite.config.js`:

- `base: '/your-repo-name/'`
- `VITE_SITE_URL=https://androiddoctorr.github.io/your-repo-name` in `.env.pages`

## SEO & contact

- Meta tags, Open Graph, Twitter cards, and JSON-LD are injected at build time via `index.html` placeholders.
- `robots.txt`, `sitemap.xml`, and `.nojekyll` are written to `dist/` on build.
- `public/og-image.png` is used for social previews.
- Email is **click-to-reveal** in the Start menu (not stored in JSON); address is XOR-encoded in `src/utils/contactEmail.js`.

## Structure

- `src/data/` - JSON content (projects, experience, education, etc.)
- `src/components/desktop/` - desktop icons and right-click menu
- `src/components/taskbar/` - Start button, clock, and Start menu
- `src/components/windows/` - draggable/resizable program windows
- `reference/` - original JSON exports from the old site

See `docs/plan.md` and `docs/roadmap.md` for the full vision.
