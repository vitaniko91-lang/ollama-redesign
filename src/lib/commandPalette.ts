/** Event + opener for the global ⌘K command palette, kept separate from the
 *  component file so the component module only exports a component (fast-refresh). */
export const COMMAND_PALETTE_OPEN_EVENT = 'ollama:open-command-palette'

/** Open the command palette from anywhere (e.g. the ⌘K hint chip). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(COMMAND_PALETTE_OPEN_EVENT))
}
