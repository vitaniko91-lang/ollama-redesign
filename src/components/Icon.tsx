import { Icon as Iconify } from '@iconify/react'

export function Icon({ name, className }: { name: string; className?: string }) {
  return <Iconify icon={name} className={className} aria-hidden />
}
