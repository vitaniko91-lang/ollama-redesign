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
  /**
   * Wrap long content instead of horizontal-scrolling it. Defaults to wrapping
   * single-line commands (so a one-line `curl … | sh` never clips on narrow
   * screens) and scrolling genuinely multi-line code (which must keep its
   * indentation intact).
   */
  wrap?: boolean
  className?: string
}

export function CodeBlock({ code, prompt = true, multiline, wrap, className }: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard()
  const isMultiline = multiline ?? code.includes('\n')
  const shouldWrap = wrap ?? !isMultiline

  return (
    <div
      className={cx(
        'flex items-start gap-4 rounded-xl border border-line bg-bg-inset px-4 py-3',
        className,
      )}
    >
      <pre
        className={cx(
          'min-w-0 flex-1 font-mono text-sm leading-relaxed text-text-paper',
          // Wrap single-line commands (break the long install URL rather than
          // clip it); let real multi-line code scroll to preserve indentation.
          shouldWrap ? 'whitespace-pre-wrap break-words' : 'overflow-x-auto whitespace-pre',
        )}
      >
        <code>
          {!isMultiline && prompt && <span className="select-none text-accent-amber">$ </span>}
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
          'shrink-0 rounded p-1.5 text-text-muted transition-colors duration-150',
          'hover:text-text-paper focus-visible:outline focus-visible:outline-2',
          'focus-visible:outline-accent-amber outline-offset-2',
        )}
      >
        <Icon
          name={copied ? 'lucide:check' : 'lucide:copy'}
          className={cx('h-4 w-4', copied && 'text-accent-amber')}
        />
      </button>
    </div>
  )
}
