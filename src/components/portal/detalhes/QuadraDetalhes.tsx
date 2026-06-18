'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, MapPin, Clock, Medal, Star, AlertTriangle,
  ChevronDown, ChevronUp, ArrowRight, ChevronRight,
} from 'lucide-react'
import Header from '@/components/portal/layout/Header'
import Footer from '@/components/portal/layout/Footer'
import DemoLoginBanner from '@/components/portal/layout/DemoLoginBanner'
import PortalNav from '@/components/portal/layout/PortalNav'
import ListaAvaliacoes from './ListaAvaliacoes'
import { mockEspacosPublicos, mockPostagens } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const QUICK_SLOTS = ['09:00', '10:00', '14:00', '16:00', '19:00']

type Tab = 'Detalhes' | 'Avaliações'

function isAberto(horario: string): boolean {
  const h = new Date().getHours()
  const m = horario.match(/(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/)
  if (!m) return true
  return h >= parseInt(m[1]) && h < parseInt(m[3])
}

export default function QuadraDetalhes({ id }: { id: string }) {
  const espaco   = mockEspacosPublicos.find(e => e.id === id)
  const postagens = mockPostagens.filter(p => p.espacoId === id)
  const [tab, setTab]     = useState<Tab>('Detalhes')
  const [regras, setRegras] = useState(false)

  /* ── not found ─────────────────────────────────────── */
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

  const aberto = isAberto(espaco.horario)

  /* ── descrição gerada ───────────────────────────────── */
  const descricao = `Espaço ${espaco.tipo.toLowerCase()} público localizado no ${espaco.bairro}, em Colatina — ES. Disponível para ${espaco.modalidades.join(', ')}. Aberto ao público de ${espaco.horario}, de forma gratuita, sem necessidade de deslocamento até a prefeitura.`

  /* ── render ─────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header />

      {/* ── Breadcrumb + Tabs (sticky) ─────────────────── */}
      <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-[#9CA3AF] pt-2.5 pb-0.5">
            <Link href="/inicio" className="hover:text-[#1B3A6B] transition-colors">Início</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{espaco.bairro}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#374151] font-medium truncate max-w-[200px]">{espaco.nome}</span>
          </nav>
          {/* tabs */}
          <div className="flex gap-0">
            {(['Detalhes', 'Avaliações'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 -mb-px',
                  tab === t
                    ? 'border-[#1B3A6B] text-[#1B3A6B]'
                    : 'border-transparent text-[#9CA3AF] hover:text-[#374151] hover:border-[#D1D5DB]'
                )}
              >
                {t}
                {t === 'Avaliações' && postagens.length > 0 && (
                  <span className="ml-1.5 text-[10px] bg-[#E6F0FF] text-[#2D5FA6] px-1.5 py-0.5 rounded-full font-semibold">
                    {postagens.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 pb-20 sm:pb-0">
        {/* ── Título + meta ──────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-5 pb-4 animate-fade-in">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="min-w-0">
              <h1 className="text-[22px] sm:text-[26px] font-bold text-[#111827] leading-tight font-syne">
                {espaco.nome}
              </h1>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap text-sm">
                <span className="flex items-center gap-1.5 text-[#6B7280]">
                  <MapPin className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  {espaco.bairro} — Colatina, ES
                </span>
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${aberto ? 'bg-emerald-500' : 'bg-red-400'}`} />
                  <span className={`font-medium ${aberto ? 'text-emerald-600' : 'text-red-500'}`}>
                    {aberto ? 'Aberto' : 'Fechado'}
                  </span>
                  <span className="text-[#D1D5DB]">·</span>
                  <span className="text-[#6B7280]">{espaco.horario}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Star className="w-5 h-5 fill-[#D97706] text-[#D97706]" />
              <span className="text-xl font-bold text-[#111827]">{espaco.nota.toFixed(1)}</span>
              <span className="text-sm text-[#9CA3AF]">{espaco.totalAvaliacoes} avaliações</span>
            </div>
          </div>
        </div>

        {/* ── Layout 2 colunas ───────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

            {/* ── COLUNA ESQUERDA ──────────────────────────── */}
            <div className="min-w-0 space-y-5">

              {/* Hero gradiente */}
              <div
                className={`relative h-[260px] sm:h-[320px] rounded-[20px] bg-gradient-to-br ${espaco.gradiente} overflow-hidden animate-scale-in`}
              >
                <Link
                  href="/inicio"
                  className="absolute top-4 left-4 flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium bg-black/25 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Link>
                {espaco.totalRelatosAbertos > 0 && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold bg-red-500 text-white px-2.5 py-1 rounded-full shadow">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {espaco.totalRelatosAbertos} {espaco.totalRelatosAbertos === 1 ? 'relato aberto' : 'relatos abertos'}
                  </span>
                )}
              </div>

              {/* Galeria (3 thumbnails com opacidade variada como placeholder) */}
              <div className="grid grid-cols-3 gap-2.5 animate-fade-in" style={{ animationDelay: '100ms' }}>
                {[0.75, 0.55, 0.40].map((op, i) => (
                  <div
                    key={i}
                    className={`h-20 sm:h-24 rounded-[12px] bg-gradient-to-br ${espaco.gradiente} cursor-pointer hover:opacity-90 transition-opacity`}
                    style={{ opacity: op }}
                  />
                ))}
              </div>

              {/* ── Conteúdo da tab Detalhes ──────────────── */}
              {tab === 'Detalhes' && (
                <div className="space-y-4 animate-fade-in">

                  {/* Sobre o espaço */}
                  <div className="bg-white rounded-[16px] shadow-card p-5">
                    <h2 className="font-bold text-[#111827] mb-2 font-syne">Sobre o espaço</h2>
                    <p className="text-sm text-[#374151] leading-relaxed">{descricao}</p>
                  </div>

                  {/* Modalidades */}
                  <div className="bg-white rounded-[16px] shadow-card p-5">
                    <h2 className="font-bold text-[#111827] mb-3 font-syne">Modalidades</h2>
                    <div className="flex flex-wrap gap-2">
                      {espaco.modalidades.map(m => (
                        <span
                          key={m}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E6F0FF] text-[#1B3A6B] text-sm font-medium rounded-full"
                        >
                          <Medal className="w-3.5 h-3.5" />
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Informações rápidas */}
                  <div className="bg-white rounded-[16px] shadow-card p-5">
                    <h2 className="font-bold text-[#111827] mb-3 font-syne">Informações</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { icon: Clock, label: 'Funcionamento', value: espaco.horario },
                        { icon: Star,  label: 'Avaliação média', value: `${espaco.nota.toFixed(1)} / 5.0` },
                        { icon: MapPin, label: 'Localização', value: espaco.bairro },
                        { icon: Medal, label: 'Tipo', value: espaco.tipo },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-2.5 p-3 bg-[#F9FAFB] rounded-[12px]">
                          <Icon className="w-4 h-4 text-[#9CA3AF] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] text-[#9CA3AF] font-medium uppercase tracking-wide">{label}</p>
                            <p className="text-sm font-semibold text-[#111827] mt-0.5">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Regras de uso — accordion */}
                  <div className="bg-white rounded-[14px] border border-[#E5E7EB] overflow-hidden">
                    <button
                      onClick={() => setRegras(v => !v)}
                      className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-[#374151] hover:bg-[#F9FAFB] transition-colors"
                      aria-expanded={regras}
                    >
                      <span className="flex items-center gap-2">📋 Regras de uso</span>
                      {regras
                        ? <ChevronUp className="w-4 h-4 text-[#9CA3AF]" />
                        : <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
                      }
                    </button>
                    {regras && (
                      <div className="px-5 pb-5 text-sm text-[#374151] leading-relaxed border-t border-[#F3F4F6] pt-4 animate-fade-in">
                        {espaco.regras}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Conteúdo da tab Avaliações ────────────── */}
              {tab === 'Avaliações' && (
                <div className="animate-fade-in">
                  <ListaAvaliacoes
                    espacoId={espaco.id}
                    espacoNome={espaco.nome}
                    postagens={postagens}
                  />
                </div>
              )}
            </div>

            {/* ── COLUNA DIREITA — widget sticky ───────────── */}
            <div className="hidden lg:block animate-slide-in-r" style={{ animationDelay: '150ms' }}>
              <div className="sticky top-[130px]">
                <div className="bg-white rounded-[20px] shadow-lg border border-[#E5E7EB] p-5 space-y-4">

                  {/* Header widget */}
                  <div>
                    <h3 className="font-bold text-[#111827] text-lg font-syne">Reservar agora</h3>
                    <p className="text-sm text-[#9CA3AF]">{espaco.tipo} · Serviço gratuito</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                    <span className="font-semibold text-[#111827]">{espaco.nota.toFixed(1)}</span>
                    <span className="text-sm text-[#9CA3AF]">· {espaco.totalAvaliacoes} avaliações</span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2 py-2.5 px-3.5 bg-[#F9FAFB] rounded-[10px]">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${aberto ? 'bg-emerald-500' : 'bg-red-400'}`} />
                    <span className={`text-sm font-semibold ${aberto ? 'text-emerald-600' : 'text-red-500'}`}>
                      {aberto ? 'Aberto agora' : 'Fechado'}
                    </span>
                    <span className="text-[#D1D5DB] mx-1">·</span>
                    <span className="text-sm text-[#6B7280]">{espaco.horario}</span>
                  </div>

                  {/* Próximos horários disponíveis */}
                  <div>
                    <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2.5">
                      Próximos disponíveis
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_SLOTS.map(slot => (
                        <Link
                          key={slot}
                          href={`/quadra/${espaco.id}/reservar`}
                          className="px-3 py-1.5 bg-[#E6F0FF] text-[#1B3A6B] text-sm font-semibold rounded-full hover:bg-[#1B3A6B] hover:text-white transition-colors duration-150"
                        >
                          {slot}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* CTA reservar */}
                  <Link
                    href={`/quadra/${espaco.id}/reservar`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 text-[15px] font-semibold text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] active:scale-[0.97] rounded-[12px] transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Reservar horário <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="border-t border-[#F3F4F6] pt-3">
                    <button
                      onClick={() => setTab('Avaliações')}
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-[#D97706] border border-[#D97706]/30 rounded-[10px] hover:bg-[#FEF3C7] transition-colors"
                    >
                      ⚠️ Relatar problema
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Mobile: CTA fixo acima do bottom nav ─────── */}
        <div className="fixed bottom-[58px] left-0 right-0 px-4 pb-2 lg:hidden z-30 pointer-events-none">
          <div className="pointer-events-auto">
            <Link
              href={`/quadra/${espaco.id}/reservar`}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-[15px] font-semibold text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] rounded-[14px] shadow-lg transition-all duration-200 active:scale-[0.97]"
            >
              Reservar horário <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <DemoLoginBanner />
      <PortalNav variant="bottom" />
    </div>
  )
}
