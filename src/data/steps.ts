export type Step = {
  n: string
  title: string
  code: string
}

export const steps: Step[] = [
  { n: '01', title: 'Install', code: 'curl -fsSL https://ollama.com/install.sh | sh' },
  { n: '02', title: 'Pull a model', code: 'ollama pull llama3.2' },
  { n: '03', title: 'Run', code: 'ollama run llama3.2' },
]
