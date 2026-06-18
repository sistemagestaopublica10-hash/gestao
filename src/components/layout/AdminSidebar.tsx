'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  MapPin,
  CalendarDays,
  Star,
  BarChart2,
  LogOut,
  ShieldCheck,
} from 'lucide-react'
import { mockGestor } from '@/lib/mock-data'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/espacos',   label: 'Espaços',   icon: MapPin },
  { href: '/admin/agenda',    label: 'Agenda',    icon: CalendarDays },
  { href: '/admin/avaliacoes',label: 'Avaliações',icon: Star },
  { href: '/admin/relatorios',label: 'Relatórios',icon: BarChart2 },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[240px] min-h-screen flex flex-col bg-[#0D1F3C] shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-[#1B3A6B]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-md bg-[#2D5FA6] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-700 text-white text-base" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>
            QuadraGov
          </span>
        </div>
        <p className="text-[11px] text-[#64748B] ml-9">{mockGestor.municipio}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                active
                  ? 'bg-[#1B3A6B] text-white border-l-[3px] border-[#2D5FA6] pl-[9px]'
                  : 'text-[#94A3B8] hover:bg-[#1B3A6B]/50 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span style={{ fontFamily: 'Inter, sans-serif' }}>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#1B3A6B]">
        <p className="text-xs text-white font-medium truncate">{mockGestor.nome}</p>
        <p className="text-[11px] text-[#64748B] mb-3">{mockGestor.cargo}</p>
        <button
          className="flex items-center gap-2 text-xs text-[#64748B] hover:text-[#E53E3E] transition-colors"
          aria-label="Sair do painel"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sair
        </button>
      </div>
    </aside>
  )
}
