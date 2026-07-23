const SKILL_CATEGORY_THEMES = {
  'Core strengths': {
    icon: '⚡',
    color: '#0078d4',
  },
  Stack: {
    icon: '🛠️',
    color: '#0f766e',
  },
  Also: {
    icon: '✨',
    color: '#7c3aed',
  },
}

const DEFAULT_SKILL_THEME = {
  icon: '•',
  color: '#475569',
}

export function getSkillCategoryTheme(category) {
  return SKILL_CATEGORY_THEMES[category] ?? DEFAULT_SKILL_THEME
}

export function getSkillCategoryStyles(category) {
  const theme = getSkillCategoryTheme(category)

  return {
    '--skill-color': theme.color,
  }
}

export function getCertInitials(title) {
  const words = title.split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words[0].length <= 4 && words[0] === words[0].toUpperCase()) {
    return words[0].slice(0, 3)
  }
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}
