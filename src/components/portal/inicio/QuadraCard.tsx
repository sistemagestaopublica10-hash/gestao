'use client'

import Link from 'next/link'
import { MapPin, Star, Clock, AlertTriangle } from 'lucide-react'
import type { EspacoPublico } from '@/lib/mock-data'

const DM = 'var(--font-sans)'

const tipoIcon: Record<string, string> = {
  'Quadra de Tênis':      '🎾',
  'Quadra Poliesportiva': '🏀',
  'Campo de Futebol':     '⚽',
  'Quadra de Vôlei':      '🏐',
}

function isAberto(horario: string): boolean {
  const h = new Date().getHours()
  const m = horario.match(/(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/)
  if (!m) return true
  return h >= parseInt(m[1]) && h < parseInt(m[3])
}

interface Props {
  espaco: EspacoPublico
  index?: number
}

export default function QuadraCard({ espaco, index = 0 }: Props) {
  const icon   = tipoIcon[espaco.tipo] ?? '🏅'
  const aberto = isAberto(espaco.horario)

  return (
    <Link
      href={`/quadra/${espaco.id}`}
      className="group block bg-white animate-fade-in-up"
      style={{
        borderRadius: 16,
        animationDelay: `${index * 80}ms`,
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        fontFamily: DM,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 6px 24px rgba(0,0,0,0.13)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* ── Foto emoldurada (55% altura, margem 8px topo/laterais) ── */}
      <div style={{ padding: '8px 8px 0' }}>
        <div
          className={`relative bg-gradient-to-br ${espaco.gradiente} overflow-hidden`}
          style={{ height: 180, borderRadius: 12 }}
        >
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.06] transition-colors duration-300" />

          {/* Badge tipo — branco semitransparente, canto sup esq */}
          <span
            className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5"
            style={{
              fontFamily: DM,
              fontSize: 11,
              fontWeight: 600,
              color: '#1a4731',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '4px 10px',
              borderRadius: 999,
            }}
          >
            {icon} {espaco.tipo}
          </span>

          {/* Badge relatos — vermelho sólido, canto sup dir */}
          {espaco.totalRelatosAbertos > 0 && (
            <span
              className="absolute top-2.5 right-2.5 inline-flex items-center gap-1"
              style={{
                fontFamily: DM,
                fontSize: 10,
                fontWeight: 600,
                color: '#fff',
                background: '#EF4444',
                padding: '3px 7px',
                borderRadius: 999,
              }}
            >
              <AlertTriangle style={{ width: 10, height: 10 }} />
              {espaco.totalRelatosAbertos}
            </span>
          )}
        </div>
      </div>

      {/* ── Texto (padding 14px) ─────────────────────── */}
      <div style={{ padding: 14 }}>

        {/* Nome */}
        <p
          className="line-clamp-1 group-hover:text-[#1a4731] transition-colors duration-200"
          style={{ fontWeight: 700, fontSize: 16, color: '#111', lineHeight: 1.3, marginBottom: 8, letterSpacing: '-0.015em' }}
        >
          {espaco.nome}
        </p>

        {/* Bairro */}
        <div className="flex items-center gap-1.5" style={{ marginBottom: 10 - 6 }}>
          <MapPin style={{ width: 13, height: 13, flexShrink: 0, color: '#999' }} />
          <span className="truncate" style={{ fontSize: 13, color: '#666' }}>{espaco.bairro}</span>
        </div>

        {/* Horário */}
        <div className="flex items-center gap-1.5">
          <Clock style={{ width: 13, height: 13, flexShrink: 0, color: '#999' }} />
          <span style={{ fontSize: 13, color: '#666' }}>{espaco.horario}</span>
        </div>

        {/* ── Rodapé ───────────────────────────────── */}
        <div
          className="flex items-center justify-between"
          style={{ paddingTop: 12, marginTop: 12, borderTop: '1px solid #f0f0f0' }}
        >
          {/* ● Disponível verde + Gratuito preto */}
          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1"
              style={{ fontSize: 12, fontWeight: 500, color: aberto ? '#16a34a' : '#9CA3AF' }}
            >
              <span
                className="rounded-full"
                style={{ width: 6, height: 6, background: aberto ? '#16a34a' : '#9CA3AF', flexShrink: 0 }}
              />
              {aberto ? 'Disponível' : 'Fechado'}
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>Gratuito</span>
          </div>

          {/* Estrela amarela + nota */}
          <div className="flex items-center gap-1">
            <Star style={{ width: 13, height: 13, color: '#f59e0b', fill: '#f59e0b', flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>
              {espaco.nota.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
