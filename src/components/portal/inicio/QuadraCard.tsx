'use client'

import Link from 'next/link'
import { MapPin, Star, Clock, AlertTriangle } from 'lucide-react'
import type { EspacoPublico } from '@/lib/mock-data'

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
      className="group block bg-white rounded-2xl overflow-hidden animate-fade-in-up"
      style={{
        animationDelay: `${index * 75}ms`,
        boxShadow: '0 1px 4px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.06)',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 4px 12px rgba(15,23,42,0.08), 0 12px 32px rgba(15,23,42,0.10)'
        el.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 1px 4px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.06)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* ── Imagem ─────────────────────────────────────── */}
      <div
        className={`relative bg-gradient-to-br ${espaco.gradiente}`}
        style={{ height: 176 }}
      >
        {/* Hover overlay */}
        <div
          className="absolute inset-0 transition-colors duration-300"
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(0,0,0,0.06)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
        />

        {/* Badge esporte — branco semitransparente com blur */}
        <span
          className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-gray-800"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            background: 'rgba(255,255,255,0.88)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.6)',
            padding: '4px 10px',
            borderRadius: 999,
            lineHeight: 1.4,
          }}
        >
          {icon} {espaco.tipo}
        </span>

        {/* Badge alerta */}
        {espaco.totalRelatosAbertos > 0 && (
          <span
            className="absolute top-3 right-3 inline-flex items-center gap-1 text-white"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              background: '#EF4444',
              padding: '3px 8px',
              borderRadius: 999,
              boxShadow: '0 1px 4px rgba(239,68,68,0.35)',
            }}
          >
            <AlertTriangle className="w-[11px] h-[11px]" />
            {espaco.totalRelatosAbertos}
          </span>
        )}
      </div>

      {/* ── Corpo do card ──────────────────────────────── */}
      <div
        style={{
          padding: '14px 16px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          flex: 1,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Nome */}
        <p
          className="line-clamp-1 group-hover:text-[#1B3A6B] transition-colors duration-200"
          style={{
            fontWeight: 600,
            fontSize: 15,
            color: '#0F172A',
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
          }}
        >
          {espaco.nome}
        </p>

        {/* Bairro */}
        <div className="flex items-center gap-1.5" style={{ color: '#94A3B8' }}>
          <MapPin style={{ width: 13, height: 13, flexShrink: 0, color: '#94A3B8' }} />
          <span className="truncate" style={{ fontWeight: 400, fontSize: 12.5, color: '#64748B' }}>
            {espaco.bairro}
          </span>
        </div>

        {/* Horário */}
        <div className="flex items-center gap-1.5">
          <Clock style={{ width: 13, height: 13, flexShrink: 0, color: '#94A3B8' }} />
          <span style={{ fontWeight: 400, fontSize: 12.5, color: '#64748B' }}>
            {espaco.horario}
          </span>
        </div>

        {/* ── Rodapé ─────────────────────────────────── */}
        <div
          className="flex items-end justify-between"
          style={{
            paddingTop: 10,
            marginTop: 'auto',
            borderTop: '1px solid #F1F5F9',
          }}
        >
          {/* Disponível + Gratuito */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span
              style={{
                fontWeight: 500,
                fontSize: 9.5,
                letterSpacing: '0.08em',
                color: '#94A3B8',
                textTransform: 'uppercase',
              }}
            >
              {aberto ? 'disponível' : 'fechado'}
            </span>
            <span
              style={{
                fontWeight: 700,
                fontSize: 13.5,
                color: '#0F172A',
                lineHeight: 1.2,
              }}
            >
              Gratuito
            </span>
          </div>

          {/* Rating — pill emerald */}
          <div
            className="inline-flex items-center gap-[5px]"
            style={{
              background: '#ECFDF5',
              padding: '4px 10px',
              borderRadius: 999,
            }}
          >
            <Star
              style={{
                width: 12,
                height: 12,
                color: '#10B981',
                fill: '#10B981',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontWeight: 500,
                fontSize: 12.5,
                color: '#059669',
                lineHeight: 1,
              }}
            >
              {espaco.nota.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
