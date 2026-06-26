import { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { Icon } from './Icon'
import { useCopyToClipboard } from '../lib/useCopyToClipboard'
import { COMMAND_PALETTE_OPEN_EVENT } from '../lib/commandPalette'

const INSTALL_CMD = 'curl -fsSL https://ollama.com/install.sh | sh'

type Cmd = {
  label: string
  icon: string
  keywords?: string[]
  run: () => void
}

/**
 * A real ⌘K command palette built on cmdk (fuzzy search, keyboard nav, focus
 * trap, Esc-to-close, listbox/dialog ARIA all from the library). Opens on
 * ⌘K / Ctrl+K globally or via `openCommandPalette()`. Charcoal panel, amber
 * accent on the active row — the page's headline craft signal.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const { copy } = useCopyToClipboard()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpen)
    }
  }, [])

  const go = (hash: string) => {
    window.location.hash = hash
  }

  const runAndClose = (fn: () => void) => {
    fn()
    setOpen(false)
  }

  const commands: Cmd[] = [
    { label: 'Download', icon: 'lucide:download', keywords: ['install', 'get', 'app'], run: () => go('download') },
    { label: 'Browse models', icon: 'lucide:boxes', keywords: ['library', 'llama', 'list'], run: () => go('models') },
    {
      label: 'Copy install command',
      icon: 'lucide:terminal',
      keywords: ['curl', 'shell', 'script'],
      run: () => {
        void copy(INSTALL_CMD)
      },
    },
    { label: 'Docs', icon: 'lucide:book-open', keywords: ['documentation', 'guide'], run: () => go('docs') },
    { label: 'GitHub', icon: 'lucide:github', keywords: ['source', 'repo', 'stars'], run: () => go('github') },
  ]

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      overlayClassName="fixed inset-0 z-50 bg-black/60 motion-safe:animate-overlay-in"
      contentClassName="fixed left-1/2 top-[16%] z-50 w-[92vw] max-w-[560px] -translate-x-1/2 motion-safe:animate-palette-in"
      className="overflow-hidden rounded-xl border border-line bg-bg-raised shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center gap-2 border-b border-line px-4">
        <span className="select-none font-mono text-accent-amber" aria-hidden>
          ›
        </span>
        <Command.Input
          placeholder="Type a command or search…"
          className="h-12 w-full bg-transparent font-mono text-sm text-text-paper outline-none placeholder:text-text-dim"
        />
        <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-text-dim">
          ESC
        </kbd>
      </div>

      <Command.List className="max-h-[320px] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center font-mono text-sm text-text-muted">
          No matching commands.
        </Command.Empty>
        <Command.Group
          heading="Actions"
          className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-text-dim"
        >
          {commands.map((c) => (
            <Command.Item
              key={c.label}
              value={c.label}
              keywords={c.keywords}
              onSelect={() => runAndClose(c.run)}
              className="flex cursor-pointer items-center gap-3 rounded px-3 py-2.5 font-mono text-sm text-text-muted outline-none transition-colors data-[selected=true]:bg-accent-amber/10 data-[selected=true]:text-accent-amber"
            >
              <Icon name={c.icon} className="h-4 w-4 shrink-0" />
              <span>{c.label}</span>
              <span className="ml-auto select-none text-text-dim" aria-hidden>
                ↵
              </span>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
