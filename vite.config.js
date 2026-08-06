import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { writeFileSync } from 'node:fs'

function buildSiteConfig(env) {
  return {
    url: env.VITE_SITE_URL ?? 'https://androiddoctorr.github.io',
    base: '/',
    title: 'Andrew Torr',
    description:
      'Internal systems developer building web apps, APIs, dashboards, and AI-assisted automation for utilities, ISPs, and small organizations.',
    name: 'Andrew Torr',
    github: 'https://github.com/AndroidDoctorr',
    linkedin: 'https://www.linkedin.com/in/atorr/',
    tagline: 'Internal systems developer',
  }
}

function injectSitePlaceholders(html, site) {
  return html
    .replaceAll('__SITE_URL__', site.url)
    .replaceAll('__SITE_TITLE__', site.title)
    .replaceAll('__SITE_DESCRIPTION__', site.description)
    .replaceAll('__SITE_NAME__', site.name)
    .replaceAll('__SITE_GITHUB__', site.github)
    .replaceAll('__SITE_LINKEDIN__', site.linkedin)
    .replaceAll('__SITE_TAGLINE__', site.tagline)
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const site = buildSiteConfig(env)

  return {
    base: site.base,
    plugins: [
      react(),
      {
        name: 'torros-seo',
        transformIndexHtml(html) {
          return injectSitePlaceholders(html, site)
        },
        closeBundle() {
          const distDir = resolve(process.cwd(), 'dist')

          writeFileSync(
            resolve(distDir, 'robots.txt'),
            `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
          )

          writeFileSync(
            resolve(distDir, 'sitemap.xml'),
            [
              '<?xml version="1.0" encoding="UTF-8"?>',
              '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
              `  <url><loc>${site.url}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>`,
              '</urlset>',
              '',
            ].join('\n'),
          )

          writeFileSync(resolve(distDir, '.nojekyll'), '')
        },
      },
    ],
  }
})
