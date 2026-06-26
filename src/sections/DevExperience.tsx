import type { ReactNode } from 'react'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { TypedCommand } from '../components/TypedCommand'
import { MarkerTick } from '../components/MarkerTick'
import { CodeBlock } from '../components/CodeBlock'
import { StreamText } from '../components/StreamText'
import { Icon } from '../components/Icon'

/**
 * DevExperience — the OpenAI-compatible API rendered as a live request → response
 * exchange, so the "drop-in REST API" claim is shown, not asserted.
 *
 * The marker `$ curl http://localhost:11434/api/chat` types in on scroll; its
 * output is two equal-weight terminal panels. LEFT is the request you send — a
 * real, copyable curl `CodeBlock` in an inset well. RIGHT is the response you get
 * back: the assistant's answer streams token-by-token (StreamText) inside the
 * genuine `/api/chat` JSON envelope, with the human-readable `content` in paper
 * as the focus and the JSON scaffolding dimmed. The header status lines (amber
 * `POST` / `200 OK`) read like a real HTTP exchange. Amber is the only accent;
 * under `prefers-reduced-motion: reduce` the command and response render complete
 * and static.
 */

// The request body — line-wrapped so no single line runs long; the CodeBlock's
// own `overflow-x-auto` contains anything that still exceeds a narrow column.
const REQUEST = `curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [
    {
      "role": "user",
      "content": "Explain entropy in one line."
    }
  ],
  "stream": true
}'`

// The streamed assistant answer — the panel's focal, human-readable content.
const RESPONSE =
  'Entropy is the amount of disorder in a system — the higher it is, the less predictable the next state.'

const BULLETS = ['OpenAI-compatible', 'Streaming responses', 'localhost:11434 · no API keys']

export function DevExperience() {
  return (
    <Section id="api">
      {/* The visible marker is a stylised, typed terminal line, so a real <h2>
          carries the section in the heading outline. */}
      <h2 className="sr-only">OpenAI-compatible API</h2>

      <div className="relative">
        <MarkerTick />
        <TypedCommand
          command="curl http://localhost:11434/api/chat"
          prompt="$ "
          accent="/api/chat"
          startOnView
          speed={36}
        >
        <Reveal className="mt-4">
          <p className="max-w-xl text-base leading-relaxed text-text-muted">
            Drop-in REST API. Point your existing OpenAI client at localhost —{' '}
            <span className="text-text-paper">same request shape, responses streamed token by token.</span>
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <ul
            role="list"
            aria-label="API highlights"
            className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs"
          >
            {BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-2 text-text-muted">
                <Icon name="lucide:check" className="h-3.5 w-3.5 shrink-0 text-accent-amber" />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* The exchange: equal columns on desktop, stacked on mobile. Grid
            stretch + the h-full chain keeps both terminal panels the same height. */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:mt-10 lg:grid-cols-2 lg:gap-6">
          <Reveal delay={0.1} className="h-full">
            <RequestPanel />
          </Reveal>
          <Reveal delay={0.16} className="h-full">
            <ResponsePanel />
          </Reveal>
        </div>
        </TypedCommand>
      </div>
    </Section>
  )
}

/** A terminal panel: charcoal-raised body, hairline header status line, inset well. */
function Panel({
  role,
  status,
  children,
}: {
  role: string
  status: string
  children: ReactNode
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-bg-raised">
      <header className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">{role}</span>
        <span className="font-mono text-xs font-medium text-accent-amber">{status}</span>
      </header>
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}

function RequestPanel() {
  return (
    <Panel role="request" status="POST">
      <CodeBlock code={REQUEST} multiline className="h-full" />
    </Panel>
  )
}

function ResponsePanel() {
  return (
    <Panel role="response" status="200 OK">
      {/* The response shown as a live terminal: the JSON envelope is dim
          scaffolding; the streamed `content` value is paper — the focus. min-h
          reserves space so the token stream never shifts surrounding layout. */}
      <div className="h-full min-h-[200px] rounded-xl border border-line bg-bg-inset px-4 py-3">
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
          <code>
            <span className="text-text-dim">{'{\n  "message": {\n    "role": "assistant",\n    "content": '}</span>
            <span className="text-accent-amber">"</span>
            <StreamText
              as="span"
              text={RESPONSE}
              startOnView
              cursor
              speed={28}
              className="text-text-paper"
            />
            <span className="text-accent-amber">"</span>
            <span className="text-text-dim">{'\n  },\n  "done": true\n}'}</span>
          </code>
        </pre>
      </div>
    </Panel>
  )
}
