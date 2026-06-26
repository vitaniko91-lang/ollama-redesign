export type Model = {
  name: string
  params: string
  blurb: string
  tag: string
}

export const models: Model[] = [
  {
    name: 'Llama 3.2',
    params: '1B–90B',
    tag: 'Meta',
    blurb: "Meta's flagship open model, from edge to datacenter.",
  },
  {
    name: 'Mistral',
    params: '7B',
    tag: 'Mistral AI',
    blurb: 'Fast, efficient, and remarkably capable for its size.',
  },
  {
    name: 'Gemma 2',
    params: '2B–27B',
    tag: 'Google',
    blurb: "Google's lightweight open models built from Gemini research.",
  },
  {
    name: 'Qwen 2.5',
    params: '0.5B–72B',
    tag: 'Alibaba',
    blurb: 'Strong multilingual and coding performance across sizes.',
  },
  {
    name: 'Phi-3',
    params: '3.8B–14B',
    tag: 'Microsoft',
    blurb: 'Small models that punch far above their weight.',
  },
  {
    name: 'DeepSeek-R1',
    params: '1.5B–671B',
    tag: 'DeepSeek',
    blurb: 'Open reasoning models with chain-of-thought built in.',
  },
]
