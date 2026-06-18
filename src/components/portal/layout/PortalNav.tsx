'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, CalendarDays, LogIn, UserCircle } from 'lucide-react'
import { useAuthStore } from '@/lib/auth-store'
import { cn } from '@/lib/utils'

const coreItems = [
  {
    label: 'Quadras',
    href: '/inicio',
    icon: LayoutGrid,
    isActive: (p: string) =>
      p.startsWith('/inicio') || p.startsWith('/quadra') || p.startsWith('/reserva'),
  },
  {
    label: 'Minhas reservas',
    href: '/minhas-reservas',
    icon: CalendarDays,
    isActive: (p: string) => p.startsWith('/minhas-reservas'),
  },
]

export default function PortalNav({ variant }: { variant: 'hero' | 'bottom' }) {
  const pathname = usePathname()
  const { user } = useAuthStore()

  const authItem = {
    label: user ? user.nome.split(' ')[0] : 'Entrar',
    href: user ? '/minhas-reservas' : '/entrar',
    icon: user ? UserCircle : LogIn,
    isActive: (p: string) => !user && p === '/entrar',
  }

  const allItems = [...coreItems, authItem]

  if (variant === 'hero') {
    return (
      <div className="flex items-center justify-center gap-1.5 mt-5 flex-wrap">
        {allItems.map((item, idx) => {
          const active = item.isActive(pathname)
          const Icon = item.icon
          return (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap',
                active
                  ? 'bg-white text-[#1B3A6B] shadow-sm'
                  : 'text-white/75 hover:text-white hover:bg-white/15'
              )}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-sm border-t border-[#E5E7EB] flex sm:hidden"
      aria-label="Navegação principal"
    >
      {allItems.map((item, idx) => {
        const active = item.isActive(pathname)
        const Icon = item.icon
        return (
          <Link
            key={idx}
            href={item.href}
            className={cn(
              'flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10px] font-semibold transition-colors',
              active ? 'text-[#1B3A6B]' : 'text-[#9CA3AF]'
            )}
          >
            <Icon className={cn('w-5 h-5', active && '[stroke-width:2.5]')} />
            <span className="leading-tight mt-0.5">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
