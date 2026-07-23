export const CATEGORY_COLORS = {
  'Web App (private)': '#4f6bed',
  'Mobile App (private)': '#107c10',
  'Web App (public)': '#0078d4',
  'Website (public)': '#008272',
  'Website (public) + Workshop (private)': '#db2777',
  'Minecraft Mod': '#6b4c2a',
  'Web App (whitelabel/b2b)': '#8764b8',
  'Library (public)': '#ca5010',
  'VR Game (private)': '#881798',
  '3D Printing': '#0891b2',
  Album: '#7c3aed',
}

const PROJECT_THEMES = {
  Indomar: {
    primary: '#0a0a0a',
    secondary: '#66023c',
    accent: '#d4af37',
    glow: '#c9a227',
  },
  Mango: {
    primary: '#c2410c',
    secondary: '#ea580c',
    accent: '#fbbf24',
    glow: '#fdba74',
  },
  ScenAIrio: {
    primary: '#0f4c5c',
    secondary: '#1a6b7a',
    accent: '#f28500',
    glow: '#f7a34a',
  },
  Spar: {
    primary: '#0f766e',
    secondary: '#14b8a6',
    accent: '#7c3aed',
    glow: '#a78bfa',
  },
  'State of the Union': {
    primary: '#1e3a8a',
    secondary: '#2563eb',
    accent: '#dc2626',
    glow: '#93c5fd',
  },
  Materia: {
    primary: '#2d1b4e',
    secondary: '#4a1942',
    accent: '#b87333',
    glow: '#d4956a',
  },
  'List Price Plus': {
    primary: '#065f46',
    secondary: '#059669',
    accent: '#0284c7',
    glow: '#6ee7b7',
  },
  'Turbo-API': {
    primary: '#0a0a0a',
    secondary: '#171717',
    accent: '#dc2626',
    glow: '#ef4444',
  },
  'Beardyman VR': {
    primary: '#6b21a8',
    secondary: '#9333ea',
    accent: '#ec4899',
    glow: '#d8b4fe',
  },
  'USS Concordia': {
    primary: '#1a3a6e',
    secondary: '#0066cc',
    accent: '#c0c0c0',
    glow: '#e8e8e8',
  },
  'Coder Dojo': {
    primary: '#831843',
    secondary: '#db2777',
    accent: '#fbbf24',
    glow: '#f9a8d4',
  },
}

const DEFAULT_THEME = {
  primary: '#334155',
  secondary: '#475569',
  accent: '#0ea5e9',
  glow: '#94a3b8',
}

export function getIconColor(projectName, category) {
  const theme = PROJECT_THEMES[projectName]

  if (theme) {
    return theme.accent
  }

  return CATEGORY_COLORS[category] ?? '#5c5c5c'
}

export function getProjectTheme(projectName, category) {
  const theme = PROJECT_THEMES[projectName]

  if (theme) {
    return theme
  }

  const fallback = getIconColor(category)
  return {
    primary: fallback,
    secondary: fallback,
    accent: '#ffffff',
    glow: fallback,
  }
}

export function getProjectThemeStyles(theme) {
  return {
    '--project-primary': theme.primary,
    '--project-secondary': theme.secondary,
    '--project-accent': theme.accent,
    '--project-glow': theme.glow,
  }
}
