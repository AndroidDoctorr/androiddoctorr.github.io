export function getProjectLinkLabel(project) {
  if (project.urlLabel) {
    return project.urlLabel
  }

  const url = project.url ?? ''

  if (project.category === 'Library (public)' || url.includes('npmjs.com')) {
    return 'View on npm'
  }

  if (project.category === 'Minecraft Mod' || url.includes('curseforge.com')) {
    return 'View on CurseForge'
  }

  return 'Visit site'
}

export function getProjectLinkHost(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
