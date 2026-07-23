import basicInfo from '../data/basic-info.json'
import { getAllProjects, getListedProjects, resolveProjectName } from '../utils/projects.js'
import { looksLikeExpression, safeCalculate } from './arithmetic.js'

const APP_ALIASES = {
  settings: 'settings',
  employment: 'experience',
  experience: 'experience',
  jobs: 'experience',
  work: 'experience',
  education: 'education',
  school: 'education',
  recycle: 'recycle-bin',
  bin: 'recycle-bin',
  'recycle-bin': 'recycle-bin',
  terminal: 'terminal',
  music: 'media-player',
  player: 'media-player',
  'media-player': 'media-player',
}

function normalizeTarget(value) {
  return value.trim().toLowerCase().replace(/['"]/g, '')
}

function formatList(title, items) {
  return [title, ...items.map((item) => `  ${item}`)].join('\n')
}

export function createCommandRegistry({
  showHiddenFiles,
  recycleItems,
  musicTracks,
  actions,
}) {
  const listedProjects = getListedProjects(showHiddenFiles)
  const allProjects = getAllProjects()
  const listedProjectNames = listedProjects.map((project) => project.name)

  return {
    help() {
      return formatList('TorrOS shell commands:', [
        'help - show this message',
        'clear / cls - clear the screen',
        'ls [projects|music|recycle|apps] - list items',
        'open <app|project> - open a window',
        'projects - list desktop projects',
        'echo <text> - print text',
        'calc <expression> - safe math (+ - * / parentheses)',
        '2 + 2 - expressions work directly too',
        'whoami - who are you?',
        'date - current date/time',
        'ver - OS version',
        'sudo <command> - nice try',
        'format c: - definitely not',
      ])
    },

    clear() {
      return { clear: true }
    },

    cls() {
      return { clear: true }
    },

    ls(args) {
      const scope = args[0]?.toLowerCase() ?? 'apps'

      switch (scope) {
        case 'projects':
        case 'apps':
          return formatList('Desktop projects:', listedProjectNames)
        case 'music':
          if (musicTracks.length === 0) {
            return 'Music folder is empty. Drop MP3s in src/assets/music/.'
          }
          return formatList(
            'Music library:',
            musicTracks.map((track) => `${track.title}${track.artist ? ` - ${track.artist}` : ''}`),
          )
        case 'recycle':
        case 'bin':
          return formatList(
            'Recycle Bin:',
            recycleItems.map((item) => item.name),
          )
        default:
          return [
            'Usage: ls [projects|music|recycle|apps]',
            '',
            formatList('Apps:', [
              'settings',
              'experience',
              'education',
              'recycle-bin',
              'terminal',
              'media-player',
              ...listedProjectNames,
            ]),
          ].join('\n')
      }
    },

    open(args) {
      const target = args.join(' ')

      if (!target) {
        return 'Usage: open <app or project name>'
      }

      const normalized = normalizeTarget(target)
      const appId = APP_ALIASES[normalized]

      if (appId) {
        actions.openApp(appId)
        return `Opening ${appId}...`
      }

      const projectName = resolveProjectName(target, allProjects)

      if (projectName) {
        actions.openProject(projectName)
        return `Opening ${projectName}...`
      }

      return `Unknown target: ${target}`
    },

    projects() {
      return formatList('Desktop projects:', listedProjectNames)
    },

    echo(args) {
      return args.join(' ') || ''
    },

    calc(args) {
      return String(safeCalculate(args.join(' ')))
    },

    whoami() {
      return `${basicInfo.name} - ${basicInfo.tagline}`
    },

    date() {
      return new Date().toString()
    },

    ver() {
      return 'TorrOS Shell [Version 11.0.2026]\nPortfolio edition. Type help for commands.'
    },

    sudo(args) {
      return args.length
        ? `Nice try. "${args.join(' ')}" is not in the sudoers file.`
        : 'Usage: sudo <command>'
    },

    format(args) {
      if (argsMatch(args, ['c:'])) {
        return 'C:\\ is protected by TorrOS Defender. Operation cancelled.'
      }
      return 'Usage: format c:'
    },
  }
}

function argsMatch(args, expected) {
  return args.join(' ').toLowerCase() === expected.join(' ').toLowerCase()
}

export function executeTerminalInput(input, registry) {
  const trimmed = input.trim()

  if (!trimmed) {
    return ''
  }

  if (looksLikeExpression(trimmed) && !trimmed.includes(' ')) {
    try {
      return String(safeCalculate(trimmed))
    } catch (error) {
      return error.message
    }
  }

  const parts = trimmed.match(/("[^"]+"|'[^']+'|\S+)/g) ?? []
  const tokens = parts.map((part) => part.replace(/^['"]|['"]$/g, ''))
  const [commandName, ...args] = tokens
  const command = registry[commandName.toLowerCase()]

  if (!command) {
    if (looksLikeExpression(trimmed)) {
      try {
        return String(safeCalculate(trimmed))
      } catch (error) {
        return error.message
      }
    }

    return `Unknown command: ${commandName}. Type help.`
  }

  try {
    return command(args)
  } catch (error) {
    return error.message ?? String(error)
  }
}
