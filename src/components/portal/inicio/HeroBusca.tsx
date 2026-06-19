'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, MapPin, ShieldCheck, LogOut, LayoutDashboard } from 'lucide-react'
import { mockMunicipio } from '@/lib/mock-data'
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'

interface Props {
  busca: string
  onBuscaChange: (v: string) => void
  bairros: string[]
  tipos: string[]
  bairroSelecionado: string
  tipoSelecionado: string
  onBairroChange: (v: string) => void
  onTipoChange: (v: string) => void
}

const DM = 'var(--font-sans)'

export default function HeroBusca({
  busca, onBuscaChange,
  bairros, tipos,
  bairroSelecionado, tipoSelecionado,
  onBairroChange, onTipoChange,
}: Props) {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 56)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function handleLogout() {
    logout()
    router.push('/entrar')
  }

  return (
    <section
      className="relative flex flex-col overflow-visible"
      style={{
        background: 'linear-gradient(148deg, #091a10 0%, #1a4731 40%, #0d3d4d 72%, #071c2c 100%)',
        minHeight: 490,
      }}
    >
      {/* Glow accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 75% -5%, rgba(52,211,153,0.08) 0%, transparent 65%),' +
            'radial-gradient(ellipse 45% 55% at 15% 105%, rgba(14,165,233,0.07) 0%, transparent 55%)',
        }}
      />

      {/* ── Fixed Navbar: transparent → white on scroll ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : 'none',
          boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.07)' : 'none',
          transition: 'background 0.3s, box-shadow 0.3s, border-color 0.3s',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/inicio" className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: scrolled ? '#1a4731' : 'rgba(255,255,255,0.13)',
                border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.22)',
                transition: 'background 0.3s',
              }}
            >
              <ShieldCheck style={{ width: 17, height: 17, color: '#fff' }} />
            </div>
            <span
              className="font-bold text-[15px] leading-none"
              style={{
                fontFamily: DM,
                color: scrolled ? '#111' : '#fff',
                letterSpacing: '-0.02em',
                transition: 'color 0.3s',
              }}
            >
              QuadraGov
            </span>
          </Link>

          {/* Centre links */}
          <nav className="hidden sm:flex items-center gap-7">
            {[
              { label: 'Quadras', href: '/inicio' },
              { label: 'Minhas reservas', href: '/minhas-reservas' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: DM,
                  color: scrolled ? '#374151' : 'rgba(255,255,255,0.82)',
                  transition: 'color 0.3s',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2.5 shrink-0">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{
                      fontFamily: DM,
                      color: scrolled ? '#1a4731' : '#fff',
                      border: scrolled ? '1px solid #1a4731' : '1px solid rgba(255,255,255,0.35)',
                      transition: 'color 0.3s, border-color 0.3s',
                    }}
                  >
                    <LayoutDashboard style={{ width: 13, height: 13 }} />
                    Admin
                  </Link>
                )}
                <span
                  className="text-xs font-medium hidden sm:block"
                  style={{
                    fontFamily: DM,
                    color: scrolled ? '#374151' : 'rgba(255,255,255,0.75)',
                    transition: 'color 0.3s',
                  }}
                >
                  {user.nome.split(' ')[0]}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                  style={{
                    background: scrolled ? '#1a4731' : 'rgba(255,255,255,0.18)',
                    transition: 'background 0.3s',
                  }}
                >
                  {user.avatar}
                </div>
                <button
                  onClick={handleLogout}
                  aria-label="Sair"
                  className="p-1.5 rounded-full"
                  style={{ color: scrolled ? '#9CA3AF' : 'rgba(255,255,255,0.55)', transition: 'color 0.3s' }}
                >
                  <LogOut style={{ width: 14, height: 14 }} />
                </button>
              </>
            ) : (
              <Link
                href="/entrar"
                className="text-sm font-semibold px-5 py-2 rounded-full"
                style={{
                  fontFamily: DM,
                  background: scrolled ? '#1a4731' : '#fff',
                  color: scrolled ? '#fff' : '#1a4731',
                  boxShadow: scrolled ? 'none' : '0 2px 10px rgba(0,0,0,0.18)',
                  transition: 'background 0.3s, color 0.3s',
                }}
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero Text ─────────────────────────────────── */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-32 pb-24">

        {/* Eyebrow pill */}
        <div
          className="inline-flex items-center gap-2 text-xs font-medium mb-6 px-3.5 py-1.5 rounded-full"
          style={{
            fontFamily: DM,
            background: 'rgba(255,255,255,0.09)',
            color: '#86efac',
            border: '1px solid rgba(134,239,172,0.18)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {mockMunicipio.nome} — {mockMunicipio.estado}
        </div>

        <h1
          className="text-white mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5.5vw, 3.75rem)',
            maxWidth: 680,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
          }}
        >
          Quadras esportivas públicas em {mockMunicipio.nome}
        </h1>

        <p
          style={{
            fontFamily: DM,
            fontSize: 15,
            color: 'rgba(255,255,255,0.55)',
            maxWidth: 360,
            lineHeight: 1.65,
          }}
        >
          Gratuito · Fácil de reservar · Para toda a comunidade
        </p>
      </div>

      {/* ── Floating Filter Bar ───────────────────────── */}
      <div
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6"
        style={{ marginBottom: -68 }}
      >
        <div
          className="bg-white rounded-2xl"
          style={{
            padding: '18px 20px',
            boxShadow: '0 8px 48px rgba(0,0,0,0.18), 0 2px 10px rgba(0,0,0,0.08)',
          }}
        >
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">

            {/* Search */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: 14, height: 14, color: '#9CA3AF' }}
              />
              <input
                type="search"
                value={busca}
                onChange={e => onBuscaChange(e.target.value)}
                placeholder="Buscar por nome ou bairro..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a4731] focus:border-transparent"
                style={{ fontFamily: DM, fontSize: 13.5, padding: '10px 14px 10px 36px' }}
                aria-label="Buscar quadra"
              />
            </div>

            <div className="hidden sm:block w-px h-7 bg-gray-200 self-center shrink-0" />

            {/* Bairro */}
            <div className="relative shrink-0">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: 12, height: 12, color: '#9CA3AF' }}
              />
              <select
                value={bairroSelecionado}
                onChange={e => onBairroChange(e.target.value)}
                className="appearance-none rounded-xl border border-gray-200 bg-gray-50 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1a4731] focus:border-transparent"
                style={{ fontFamily: DM, fontSize: 13.5, padding: '10px 28px 10px 26px' }}
                aria-label="Filtrar por bairro"
              >
                <option value="">Todos os bairros</option>
                {bairros.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                style={{ width: 12, height: 12, color: '#9CA3AF' }}
              />
            </div>

            {/* Tipo */}
            <div className="relative shrink-0">
              <select
                value={tipoSelecionado}
                onChange={e => onTipoChange(e.target.value)}
                className="appearance-none rounded-xl border border-gray-200 bg-gray-50 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1a4731] focus:border-transparent"
                style={{ fontFamily: DM, fontSize: 13.5, padding: '10px 28px 10px 12px' }}
                aria-label="Filtrar por esporte"
              >
                <option value="">Todos os esportes</option>
                {tipos.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                style={{ width: 12, height: 12, color: '#9CA3AF' }}
              />
            </div>

            {/* Buscar */}
            <button
              className="flex items-center justify-center gap-1.5 text-white font-semibold rounded-xl shrink-0 hover:opacity-90 transition-opacity"
              style={{ fontFamily: DM, fontSize: 13.5, background: '#1a4731', padding: '10px 20px' }}
            >
              <Search style={{ width: 13, height: 13 }} />
              Buscar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
