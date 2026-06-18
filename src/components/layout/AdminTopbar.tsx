'use client'

import { usePathname } from 'next/navigation'
import { mockGestor } from '@/lib/mock-data'
import { ChevronRight } from 'lucide-react'

const breadcrumbMap: Record<string, string> = {
  '/admin/dashboard':  'Dashboard',
  '/admin/espacos':    'Espaços Esportivos',
  '/admin/agenda':     'Agenda',
  '/admin/avaliacoes': 'Avaliações e Relatos',
  '/admin/relatorios': 'Relatórios',
}

export default function AdminTopbar() {
  const pathname = usePathname()
  const pageLabel = breadcrumbMap[pathname] ?? 'Painel'

  return (
    <header className="h-14 bg-white border-b border-[#E6F0FF] flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
        <span>QuadraGov</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#0D1F3C] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
          {pageLabel}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="text-xs font-medium text-[#0D1F3C]">{mockGestor.nome}</p>
          <p className="text-[11px] text-[#64748B]">{mockGestor.municipio}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#2D5FA6] flex items-center justify-center text-white text-xs font-bold">
          {mockGestor.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>
      </div>
    </header>
  )
}
