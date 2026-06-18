'use client'

import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import { ChevronRight } from 'lucide-react'
import { mockGestor } from '@/lib/mock-data'

const breadcrumbMap: Record<string, string> = {
  '/admin/dashboard':  'Dashboard',
  '/admin/espacos':    'Espaços Esportivos',
  '/admin/agenda':     'Agenda',
  '/admin/avaliacoes': 'Avaliações e Relatos',
  '/admin/relatorios': 'Relatórios',
}

export default function AdminTopbar() {
  const pathname = usePathname()
  const { user } = useAuthStore()
  const pageLabel = breadcrumbMap[pathname] ?? 'Painel'

  const nome = user?.nome ?? mockGestor.nome

  return (
    <header className="bg-white border-b border-[#E6F0FF] shrink-0">
      {/* Banner demo */}
      <div className="bg-[#FEF3C7] border-b border-[#FDE68A] px-6 py-1.5 flex items-center justify-center gap-2">
        <span className="text-[11px] text-[#92400E] font-medium">
          🎭 Modo demonstração — Painel da Prefeitura de Colatina
        </span>
      </div>

      <div className="h-13 flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
          <span>QuadraGov</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#0D1F3C] font-medium">{pageLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-[#0D1F3C]">{nome}</p>
            <p className="text-[11px] text-[#64748B]">{mockGestor.municipio}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#2D5FA6] flex items-center justify-center text-white text-xs font-bold">
            {user?.avatar ?? 'JM'}
          </div>
        </div>
      </div>
    </header>
  )
}
