'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, Medal, Star, AlertTriangle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import Header from '@/components/portal/layout/Header'
import Footer from '@/components/portal/layout/Footer'
import ListaAvaliacoes from './ListaAvaliacoes'
import { mockEspacosPublicos, mockPostagens } from '@/lib/mock-data'

export default function QuadraDetalhes({ id }: { id: string }) {
  const espaco = mockEspacosPublicos.find(e => e.id === id)
  const [acordeonAberto, setAcordeonAberto] = useState(false)

  const postagens = mockPostagens.filter(p => p.espacoId === id)

  if (!espaco) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 text-[#9CA3AF]">
          <p className="text-4xl">🏚️</p>
          <p className="font-medium text-[#374151]">Espaço não encontrado.</p>
          <Link href="/inicio" className="text-sm text-[#2D5FA6] hover:underline">← Voltar ao início</Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ── Hero ── */}
        <div className={`relative h-[240px] bg-gradient-to-br ${espaco.gradiente}`}>
          <Link
            href="/inicio"
            className="absolute top-4 left-4 flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-pill transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>

        {/* ── Conteúdo ── */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-4 pb-12 space-y-5">

          {/* Card info principal */}
          <div className="bg-white rounded-[16px] shadow-card p-5 space-y-3">
            <h1
              className="text-[22px] font-bold text-[#111827] leading-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {espaco.nome}
            </h1>

            <div className="flex flex-col gap-2 text-sm text-[#374151]">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                {espaco.bairro} — Colatina, ES
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                {espaco.horario}
              </span>
              <span className="flex items-center gap-2">
                <Medal className="w-4 h-4 text-[#9CA3AF] shrink-0" />
                {espaco.modalidades.join(' · ')}
              </span>
            </div>

            {/* Métricas */}
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <span className="flex items-center gap-1 text-sm font-semibold text-[#D97706]">
                <Star className="w-4 h-4 fill-current" />
                {espaco.nota.toFixed(1)}
              </span>
              <span className="text-[#9CA3AF] text-xs">·</span>
              <span className="text-sm text-[#9CA3AF]">{espaco.totalAvaliacoes} avaliações</span>
              {espaco.totalRelatosAbertos > 0 && (
                <>
                  <span className="text-[#9CA3AF] text-xs">·</span>
                  <span className="flex items-center gap-1 text-sm text-[#E53E3E] font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {espaco.totalRelatosAbertos} {espaco.totalRelatosAbertos === 1 ? 'relato aberto' : 'relatos abertos'}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* CTA Reservar */}
          <Link
            href={`/quadra/${espaco.id}/reservar`}
            className="flex items-center justify-center gap-2 w-full py-3.5 text-[15px] font-semibold text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] rounded-[12px] transition-colors shadow-sm"
          >
            Reservar um horário <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Accordion regras */}
          <div className="bg-white rounded-[12px] border border-[#E5E7EB] overflow-hidden">
            <button
              onClick={() => setAcordeonAberto(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors"
              aria-expanded={acordeonAberto}
            >
              <span>📋 Ver regras de uso</span>
              {acordeonAberto
                ? <ChevronUp className="w-4 h-4 text-[#9CA3AF]" />
                : <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              }
            </button>
            {acordeonAberto && (
              <div className="px-4 pb-4 text-sm text-[#374151] leading-relaxed border-t border-[#E5E7EB] pt-3">
                {espaco.regras}
              </div>
            )}
          </div>

          {/* Avaliações e relatos */}
          <ListaAvaliacoes
            espacoId={espaco.id}
            espacoNome={espaco.nome}
            postagens={postagens}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
