import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createCommandRegistry, executeTerminalInput } from '../../terminal/commands'

function TerminalLine({ line }) {
  if (line.kind === 'input') {
    return (
      <div className="terminal-line terminal-line--input">
        <span className="terminal-line__prompt">torros&gt;</span>
        <span>{line.text}</span>
      </div>
    )
  }

  if (line.kind === 'error') {
    return <div className="terminal-line terminal-line--error">{line.text}</div>
  }

  return <div className="terminal-line terminal-line--output">{line.text}</div>
}

export default function TerminalWindow({ shellActions, showHiddenFiles, recycleItems, musicTracks }) {
  const [lines, setLines] = useState([
    { id: 0, kind: 'output', text: 'TorrOS Shell - type help for commands.' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const nextId = useRef(1)
  const outputRef = useRef(null)
  const inputRef = useRef(null)

  const registry = useMemo(
    () =>
      createCommandRegistry({
        showHiddenFiles,
        recycleItems,
        musicTracks,
        actions: shellActions,
      }),
    [musicTracks, recycleItems, shellActions, showHiddenFiles],
  )

  const appendLines = useCallback((entries) => {
    setLines((current) => [
      ...current,
      ...entries.map((entry) => ({
        id: nextId.current++,
        kind: entry.kind ?? 'output',
        text: entry.text,
      })),
    ])
  }, [])

  const runCommand = useCallback(
    (rawInput) => {
      const trimmed = rawInput.trim()

      appendLines([{ kind: 'input', text: rawInput }])

      if (!trimmed) {
        return
      }

      setHistory((current) => [trimmed, ...current].slice(0, 50))
      setHistoryIndex(-1)

      const result = executeTerminalInput(trimmed, registry)

      if (result && typeof result === 'object' && result.clear) {
        setLines([
          {
            id: nextId.current++,
            kind: 'output',
            text: 'TorrOS Shell - type help for commands.',
          },
        ])
        return
      }

      appendLines([
        {
          kind: typeof result === 'string' && result.startsWith('Unknown') ? 'error' : 'output',
          text: String(result),
        },
      ])
    },
    [appendLines, registry],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    runCommand(input)
    setInput('')
  }

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight })
  }, [lines])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (history.length === 0) return
      const nextIndex = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex] ?? '')
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex <= 0) {
        setHistoryIndex(-1)
        setInput('')
        return
      }
      const nextIndex = historyIndex - 1
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex] ?? '')
    }
  }

  return (
    <div className="terminal-window" onMouseDown={() => inputRef.current?.focus()}>
      <div className="terminal-window__output" ref={outputRef}>
        {lines.map((line) => (
          <TerminalLine key={line.id} line={line} />
        ))}
      </div>
      <form className="terminal-window__input-row" onSubmit={handleSubmit}>
        <span className="terminal-line__prompt">torros&gt;</span>
        <input
          ref={inputRef}
          className="terminal-window__input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
        />
      </form>
    </div>
  )
}
