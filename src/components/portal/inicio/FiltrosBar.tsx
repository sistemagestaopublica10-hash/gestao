'use client'

import { ChevronDown } from 'lucide-react'

interface Props {
  bairros: string[]
  tipos: string[]
  bairroSelecionado: string
  tipoSelecionado: string
  onBairroChange: (v: string) => void
  onTipoChange: (v: string) => void
  total: number
}

export default function FiltrosBar({
  bairros,
  tipos,
  bairroSelecionado,
  tipoSelecionado,
  onBairroChange,
  onTipoChange,
  total,
}: Props) {
  const selectClass =
    'appearance-none bg-white border border-[#E5E7EB] text-[#374151] text-sm rounded-[10px] px-3.5 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#2D5FA6] cursor-pointer'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      {/* Contagem */}
      <p className="text-sm text-[#374151]">
        <span className="font-semibold text-[#111827]">{total}</span>{' '}
        {total === 1 ? 'espaço disponível' : 'espaços disponíveis'}
      </p>

      {/* Filtros */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-[#9CA3AF] hidden sm:block">Filtrar por:</span>

        <div className="relative">
          <select
            value={bairroSelecionado}
            onChange={e => onBairroChange(e.target.value)}
            className={selectClass}
            aria-label="Filtrar por bairro"
          >
            <option value="">Todos os bairros</option>
            {bairros.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
        </div>

        <div className="relative">
          <select
            value={tipoSelecionado}
            onChange={e => onTipoChange(e.target.value)}
            className={selectClass}
            aria-label="Filtrar por tipo de esporte"
          >
            <option value="">Todos os esportes</option>
            {tipos.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
        </div>
      </div>
    </div>
  )
}
