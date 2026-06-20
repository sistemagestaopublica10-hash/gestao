'use client'

import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import { ChevronRight, Menu } from 'lucide-react'
import { mockGestor } from '@/lib/mock-data'

const breadcrumbMap: Record<string, string> = {
  '/admin/dashboard':  'Dashboard',
  '/admin/espacos':    'Espaços',
  '/admin/agenda':     'Agenda',
  '/admin/avaliacoes': 'Avaliações',
  '/admin/relatorios': 'Relatórios',
  '/admin/usuarios':   'Usuários',
}

interface Props {
  onMenuClick?: () => void
}

export default function AdminTopbar({ onMenuClick }: Props) {
  const pathname = usePathname()
  const { user } = useAuthStore()

  const pageLabel = (() => {
    if (breadcrumbMap[pathname]) return breadcrumbMap[pathname]
    if (pathname.startsWith('/admin/espacos/')) return 'Detalhe do Espaço'
    return 'Painel'
  })()

  const nome = user?.nome ?? mockGestor.nome

  return (
    <header className="bg-white border-b border-[#E6F0FF] shrink-0">
      {/* Banner demo */}
      <div className="bg-[#FEF3C7] border-b border-[#FDE68A] px-4 py-1.5 flex items-center justify-center gap-2">
        <span className="text-[11px] text-[#92400E] font-medium text-center">
          🎭 Modo demonstração — Prefeitura de Colatina
        </span>
      </div>

      <div className="flex items-center justify-between px-4 sm:px-6 py-3 min-h-[52px]">
        <div className="flex items-center gap-2">
          {/* Hamburger — só mobile */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-1.5 rounded-[6px] text-[#64748B] hover:bg-[#F4F7FB] hover:text-[#0D1F3C] transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-sm text-[#64748B]">
            <span className="hidden sm:block">QuadraGov</span>
            <ChevronRight className="w-3.5 h-3.5 hidden sm:block" />
            <span className="text-[#0D1F3C] font-semibold text-sm">{pageLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-[#0D1F3C]">{nome}</p>
            <p className="text-[11px] text-[#64748B]">{mockGestor.municipio}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#2D5FA6] flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user?.avatar ?? 'JM'}
          </div>
        </div>
      </div>
    </header>
  )
}
