'use client'

import { Search } from 'lucide-react'
import { mockMunicipio } from '@/lib/mock-data'
import PortalNav from '@/components/portal/layout/PortalNav'

interface Props {
  busca: string
  onBuscaChange: (v: string) => void
}

export default function HeroBusca({ busca, onBuscaChange }: Props) {
  return (
    <section className="bg-[#1B3A6B] px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1
          className="text-white text-2xl sm:text-4xl font-bold leading-tight"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          Quadras esportivas de {mockMunicipio.nome}
        </h1>
        <p className="text-[#93c5fd] text-sm sm:text-base">
          Reserve online, de graça, sem precisar ligar.
        </p>

        <div className="relative mt-6 max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="search"
            value={busca}
            onChange={e => onBuscaChange(e.target.value)}
            placeholder="Buscar por nome ou bairro..."
            className="w-full pl-11 pr-4 py-3 rounded-[12px] bg-white text-[#111827] placeholder:text-[#9CA3AF] text-sm outline-none focus:ring-2 focus:ring-[#2D5FA6] shadow-sm"
            aria-label="Buscar quadra por nome ou bairro"
          />
        </div>

        <PortalNav variant="hero" />
      </div>
    </section>
  )
}
