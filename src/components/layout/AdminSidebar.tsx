'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  MapPin,
  CalendarDays,
  Star,
  BarChart2,
  LogOut,
  ShieldCheck,
  ExternalLink,
  Users,
  X,
} from 'lucide-react'
import { useAuthStore } from '@/lib/auth-store'
import { mockGestor, mockEspacosPublicos } from '@/lib/mock-data'

const totalRelatosAbertos = mockEspacosPublicos.reduce((s, e) => s + e.totalRelatosAbertos, 0)

const navItems = [
  { href: '/admin/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/espacos',    label: 'Espaços',    icon: MapPin },
  { href: '/admin/agenda',     label: 'Agenda',     icon: CalendarDays },
  { href: '/admin/avaliacoes', label: 'Avaliações', icon: Star },
  { href: '/admin/usuarios',   label: 'Usuários',   icon: Users },
  { href: '/admin/relatorios', label: 'Relatórios', icon: BarChart2 },
]

interface Props {
  isOpen?: boolean
  onClose?: () => void
}

export default function AdminSidebar({ isOpen = false, onClose }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const gestor = user ?? { nome: mockGestor.nome, email: 'admin@prefeitura.gov.br', avatar: 'JM' }

  function handleLogout() {
    logout()
    router.push('/entrar')
  }

  const sidebar = (
    <aside className="w-[240px] min-h-screen flex flex-col bg-[#0D1F3C] shrink-0 h-full">
      {/* Logo + fechar mobile */}
      <div className="px-5 py-5 border-b border-[#1B3A6B] flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md bg-[#2D5FA6] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-white text-base font-bold" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              QuadraGov
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] ml-9">{mockGestor.municipio}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded text-[#64748B] hover:text-white transition-colors mt-0.5"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          const badge = href === '/admin/avaliacoes' && totalRelatosAbertos > 0 ? totalRelatosAbertos : null
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                active
                  ? 'bg-[#1B3A6B] text-white border-l-[3px] border-[#2D5FA6] pl-[9px]'
                  : 'text-[#94A3B8] hover:bg-[#1B3A6B]/50 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="ml-auto bg-[#E53E3E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
                  {badge}
                </span>
              )}
            </Link>
          )
        })}

        <div className="pt-3 mt-3 border-t border-[#1B3A6B]">
          <Link
            href="/inicio"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-[#64748B] hover:bg-[#1B3A6B]/50 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            Ver portal público
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[#1B3A6B]">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full bg-[#2D5FA6] flex items-center justify-center text-white text-[11px] font-bold shrink-0">
            {(gestor as any).avatar ?? 'JM'}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-white font-medium truncate">{gestor.nome}</p>
            <p className="text-[10px] text-[#64748B] truncate">{(gestor as any).email ?? 'admin@prefeitura.gov.br'}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-[#64748B] hover:text-[#E53E3E] transition-colors"
          aria-label="Sair do painel"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sair
        </button>
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden md:flex">{sidebar}</div>

      {/* Mobile: drawer overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="relative z-10 h-full overflow-y-auto">
            {sidebar}
          </div>
        </div>
      )}
    </>
  )
}
