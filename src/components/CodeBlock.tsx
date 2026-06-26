import { cx } from '../lib/cx'
import { Icon } from './Icon'
import { useCopyToClipboard } from '../lib/useCopyToClipboard'

type CodeBlockProps = {
  /** The command or code to display and copy. */
  code: string
  /** Show a `$` shell prompt before single-line commands. Default true. */
  prompt?: boolean
  /** Force multi-line rendering. Auto-detected from newlines when omitted. */
  multiline?: boolean
  className?: string
}

export function CodeBlock({ code, prompt = true, multiline, className }: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard()
  const isMultiline = multiline ?? code.includes('\n')

  return (
    <div
      className={cx(
        'flex items-start gap-4 rounded-xl border border-border-card bg-bg-elevated px-4 py-3',
        className,
      )}
    >
      <pre
        className={cx(
          'min-w-0 flex-1 overflow-x-auto font-mono text-sm leading-relaxed text-text-primary',
          isMultiline ? 'whitespace-pre' : 'whitespace-pre-wrap',
        )}
      >
        <code>
          {!isMultiline && prompt && <span className="select-none text-text-dim">$ </span>}
          {code}
        </code>
      </pre>

      <button
        type="button"
        onClick={() => {
          void copy(code)
        }}
        aria-label="Copy command"
        className={cx(
          'shrink-0 rounded p-1.5 text-text-muted transition-colors duration-200',
          'hover:text-text-primary focus-visible:outline focus-visible:outline-2',
          'focus-visible:outline-accent-green outline-offset-2',
        )}
      >
        <Icon
          name={copied ? 'lucide:check' : 'lucide:copy'}
          className={cx('h-4 w-4', copied && 'text-accent-green')}
        />
      </button>
    </div>
  )
}
