import desktopBackground from './background.png'
import musicMetadata from '../data/music.json'

const musicModules = import.meta.glob('./music/*.{mp3,ogg,wav}', {
  eager: true,
  import: 'default',
  query: '?url',
})

const iconModules = import.meta.glob('./icons/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const bannerModules = import.meta.glob('./banners/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const screenshotModules = import.meta.glob('./screenshots/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})

const PROJECT_SLUGS = {
  Indomar: 'indomar',
  Mango: 'mango',
  ScenAIrio: 'scenairio',
  Spar: 'spar',
  'State of the Union': 'sotu',
  Materia: 'materia',
  'List Price Plus': 'listpriceplus',
  'Turbo-API': 'turbo-api',
  'Beardyman VR': 'beardyman',
  'USS Concordia': 'uss-concordia',
  'Coder Dojo': 'coder-dojo',
}

const BANNER_SLUGS = {
  'NineStar Connect': 'ninestar',
  'Eleven Fifty Academy': 'eleven_fifty',
  Turnitin: 'turnitin',
  VeriCite: 'vericite',
  'Eleven Fifty Consulting': 'eleven_fifty',
  'The Orchard School': 'orchard',
  'Indiana University (at IUPUI)': 'iupui',
}

function filenameFromPath(path) {
  return path.split('/').pop().replace(/\.[^.]+$/, '')
}

function buildLookup(modules) {
  const lookup = {}

  for (const [path, url] of Object.entries(modules)) {
    lookup[filenameFromPath(path)] = url
  }

  return lookup
}

const icons = buildLookup(iconModules)
const banners = buildLookup(bannerModules)

function buildScreenshotLookup(modules) {
  const lookup = {}

  for (const [path, url] of Object.entries(modules)) {
    const parts = path.split('/')
    const folder = parts[parts.length - 2]

    if (!lookup[folder]) {
      lookup[folder] = []
    }

    const name = filenameFromPath(path)

    lookup[folder].push({
      src: url,
      alt: name.replace(/[-_]+/g, ' '),
    })
  }

  for (const key of Object.keys(lookup)) {
    lookup[key].sort((a, b) => a.alt.localeCompare(b.alt))
  }

  return lookup
}

const screenshots = buildScreenshotLookup(screenshotModules)

export function getProjectSlug(name) {
  return (
    PROJECT_SLUGS[name] ??
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  )
}

export function getProjectIcon(name) {
  return icons[getProjectSlug(name)] ?? null
}

export function getProjectScreenshots(name) {
  return screenshots[getProjectSlug(name)] ?? []
}

export function getHistoryBanner(title) {
  const slug = BANNER_SLUGS[title]
  return slug ? banners[slug] ?? null : null
}

function humanizeFilename(filename) {
  return filename.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
}

export function getMusicTracks() {
  const metadataByFile = Object.fromEntries(
    musicMetadata.map((track) => [track.file, track]),
  )

  return Object.entries(musicModules)
    .map(([path, src]) => {
      const file = path.split('/').pop()
      const meta = metadataByFile[file] ?? {}

      return {
        id: file,
        file,
        src,
        title: meta.title ?? humanizeFilename(file),
        artist: meta.artist ?? null,
        album: meta.album ?? null,
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

export { desktopBackground }
