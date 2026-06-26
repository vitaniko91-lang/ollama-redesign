export type Feature = {
  icon: string
  title: string
  desc: string
}

export const features: Feature[] = [
  {
    icon: 'lucide:shield',
    title: 'Local & private',
    desc: 'Your data never leaves your machine. Everything runs fully offline.',
  },
  {
    icon: 'lucide:plug',
    title: 'OpenAI-compatible API',
    desc: 'A drop-in REST API on localhost:11434 — point your existing client at it.',
  },
  {
    icon: 'lucide:monitor',
    title: 'Cross-platform',
    desc: 'Native on macOS, Linux, and Windows.',
  },
  {
    icon: 'lucide:library',
    title: 'Model library',
    desc: 'One command to pull from a large, growing catalog of open models.',
  },
  {
    icon: 'lucide:zap',
    title: 'GPU-accelerated',
    desc: 'Automatic GPU acceleration when available, CPU fallback when not.',
  },
  {
    icon: 'lucide:github',
    title: 'Open source',
    desc: 'Community-driven and MIT-licensed.',
  },
]
