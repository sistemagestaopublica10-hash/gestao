'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  CalendarDays, Clock, MapPin, ArrowRight, Star,
  LogIn, ArrowLeft, Search, LogOut, LayoutDashboard,
  CheckCircle2, LayoutGrid,
} from 'lucide-react'
import Footer from '@/components/portal/layout/Footer'
import DemoLoginBanner from '@/components/portal/layout/DemoLoginBanner'
import PortalNav from '@/components/portal/layout/PortalNav'
import { useAuthStore } from '@/lib/auth-store'
import { mockMinhasReservas } from '@/lib/mock-data'

const DM = 'var(--font-sans)'

function formatarData(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', {
    weekday: 'short', day: 'numeric', month: 'long',
  })
}

export default function MinhasReservasPage() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [searchVal, setSearch] = React.useState('')

  const proximas   = mockMinhasReservas.filter(r => r.status === 'proxima')
  const anteriores = mockMinhasReservas.filter(r => r.status === 'anterior')

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f5f5f5', fontFamily: DM }}>

      {/* ── HEADER — igual ao QuadraDetalhes ────────── */}
      <header
        className="sticky top-0 z-40"
        style={{ background: '#2E7D52', height: 56 }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-full flex items-center gap-3">

          <Link
            href="/inicio"
            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity shrink-0"
            style={{ fontFamily: DM, fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}
          >
            <ArrowLeft style={{ width: 15, height: 15 }} />
            Voltar
          </Link>

          <form onSubmit={e => { e.preventDefault(); router.push(`/inicio${searchVal ? `?q=${encodeURIComponent(searchVal)}` : ''}`) }} className="flex-1 hidden sm:flex justify-center">
            <div className="relative w-[260px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ width: 13, height: 13, color: 'rgba(255,255,255,0.5)' }} />
              <input
                type="search"
                value={searchVal}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar quadra..."
                className="w-full border-0 focus:outline-none focus:ring-0 placeholder:text-white/40"
                style={{ fontFamily: DM, fontSize: 13.5, color: '#fff', background: 'rgba(255,255,255,0.13)', borderRadius: 99, padding: '7px 16px 7px 36px' }}
              />
            </div>
          </form>

          <div className="flex items-center gap-2 ml-auto sm:ml-0 shrink-0">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link href="/admin/dashboard" className="hidden sm:flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors" style={{ fontFamily: DM, color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.3)' }}>
                    <LayoutDashboard style={{ width: 12, height: 12 }} /> Admin
                  </Link>
                )}
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  {user.avatar}
                </div>
                <span className="text-xs hidden sm:block" style={{ fontFamily: DM, color: 'rgba(255,255,255,0.75)' }}>{user.nome.split(' ')[0]}</span>
                <button onClick={() => { logout(); router.push('/entrar') }} className="p-1.5 rounded-full hover:bg-white/10 transition-colors" aria-label="Sair" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  <LogOut style={{ width: 14, height: 14 }} />
                </button>
              </>
            ) : (
              <>
                <Link href="/entrar" className="text-sm font-medium text-[#2E7D52] bg-white hover:bg-gray-100 transition-colors px-3.5 py-1.5 rounded-full" style={{ fontFamily: DM }}>
                  Entrar
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20 sm:pb-0">

        {/* ── ESTADO: NÃO LOGADO ───────────────────────── */}
        {!user && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
            <div
              className="bg-white w-full max-w-sm text-center animate-fade-in"
              style={{ borderRadius: 20, padding: '40px 32px', boxShadow: '0 2px 24px rgba(0,0,0,0.07)' }}
            >
              {/* Ícone */}
              <div
                className="w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-5"
                style={{ background: '#f0fdf4' }}
              >
                <CalendarDays style={{ width: 28, height: 28, color: '#2E7D52' }} />
              </div>

              {/* Título */}
              <h1
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: '#111', marginBottom: 8, letterSpacing: '-0.01em' }}
              >
                Acesse sua conta
              </h1>
              <p style={{ fontFamily: DM, fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 24 }}>
                Entre para visualizar e gerenciar suas reservas de quadras esportivas.
              </p>

              {/* CTAs */}
              <Link
                href="/entrar"
                className="flex items-center justify-center gap-2 w-full hover:opacity-90 transition-opacity"
                style={{ fontFamily: DM, fontSize: 14, fontWeight: 600, color: '#fff', background: '#2E7D52', borderRadius: 12, height: 48, marginBottom: 12, textDecoration: 'none' }}
              >
                <LogIn style={{ width: 15, height: 15 }} />
                Entrar na minha conta
              </Link>

              <Link
                href="/inicio"
                className="flex items-center justify-center gap-2 w-full hover:bg-gray-50 transition-colors"
                style={{ fontFamily: DM, fontSize: 14, fontWeight: 500, color: '#374151', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: 12, height: 44, textDecoration: 'none' }}
              >
                <LayoutGrid style={{ width: 14, height: 14 }} />
                Explorar quadras
              </Link>

              <p style={{ fontFamily: DM, fontSize: 12, color: '#9ca3af', marginTop: 20 }}>
                Serviço público gratuito da Prefeitura de Colatina
              </p>
            </div>
          </div>
        )}

        {/* ── ESTADO: ADMIN ────────────────────────────── */}
        {user && user.role === 'admin' && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="bg-white text-center animate-fade-in" style={{ borderRadius: 20, padding: '40px 32px', boxShadow: '0 2px 24px rgba(0,0,0,0.07)', maxWidth: 380, width: '100%' }}>
              <p style={{ fontFamily: DM, fontSize: 14, color: '#6b7280', marginBottom: 16 }}>
                Esta área é exclusiva para cidadãos.
              </p>
              <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline" style={{ fontFamily: DM, color: '#2E7D52' }}>
                Ir para o painel admin <ArrowRight style={{ width: 14, height: 14 }} />
              </Link>
            </div>
          </div>
        )}

        {/* ── ESTADO: CIDADÃO LOGADO ───────────────────── */}
        {user && user.role === 'cidadao' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6" style={{ paddingTop: 32, paddingBottom: 64 }}>

            {/* Cabeçalho da página */}
            <div className="animate-fade-in" style={{ marginBottom: 32 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px, 4vw, 28px)', color: '#111', letterSpacing: '-0.02em', marginBottom: 4 }}>
                Minhas Reservas
              </h1>
              <p style={{ fontFamily: DM, fontSize: 14, color: '#6b7280' }}>
                Acompanhe seus agendamentos e avalie as quadras que usou.
              </p>
            </div>

            {/* ── Próximas reservas ──────────────────────── */}
            <section style={{ marginBottom: 36 }}>
              <h2 style={{ fontFamily: DM, fontWeight: 700, fontSize: 13, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                Próximas reservas
              </h2>

              {proximas.length === 0 ? (
                <div
                  className="animate-fade-in"
                  style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0f0f0', padding: '28px 20px', textAlign: 'center' }}
                >
                  <p style={{ fontFamily: DM, fontSize: 14, color: '#9ca3af', marginBottom: 12 }}>Nenhuma reserva agendada.</p>
                  <Link href="/inicio" className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline" style={{ fontFamily: DM, color: '#2E7D52' }}>
                    Reservar uma quadra <ArrowRight style={{ width: 13, height: 13 }} />
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {proximas.map((r, i) => (
                    <div
                      key={r.id}
                      className="animate-fade-in-up"
                      style={{
                        animationDelay: `${i * 60}ms`,
                        background: '#fff',
                        borderRadius: 14,
                        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                        padding: '16px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                      }}
                    >
                      {/* Ícone de status */}
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle2 style={{ width: 18, height: 18, color: '#16a34a' }} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: DM, fontWeight: 700, fontSize: 14.5, color: '#111', marginBottom: 4, lineHeight: 1.3 }}>
                          {r.espacoNome}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 12px' }}>
                          <span className="flex items-center gap-1" style={{ fontFamily: DM, fontSize: 12.5, color: '#6b7280' }}>
                            <CalendarDays style={{ width: 12, height: 12, color: '#9ca3af' }} />
                            {formatarData(r.data)}
                          </span>
                          <span className="flex items-center gap-1" style={{ fontFamily: DM, fontSize: 12.5, color: '#6b7280' }}>
                            <Clock style={{ width: 12, height: 12, color: '#9ca3af' }} />
                            {r.horaInicio} – {r.horaFim}
                          </span>
                        </div>
                        <span style={{ fontFamily: DM, fontSize: 11, fontWeight: 600, color: '#14532d', background: '#dcfce7', padding: '2px 8px', borderRadius: 99, display: 'inline-block', marginTop: 6 }}>
                          Confirmada · #{r.id}
                        </span>
                      </div>

                      <button
                        style={{ fontFamily: DM, fontSize: 13, fontWeight: 500, color: '#dc2626', background: 'transparent', border: '1px solid #fca5a5', borderRadius: 10, padding: '7px 14px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'background 0.15s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fef2f2'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                      >
                        Cancelar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ── Reservas anteriores ────────────────────── */}
            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontFamily: DM, fontWeight: 700, fontSize: 13, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                Reservas anteriores
              </h2>

              {anteriores.length === 0 ? (
                <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #f0f0f0', padding: '28px 20px', textAlign: 'center' }}>
                  <p style={{ fontFamily: DM, fontSize: 14, color: '#9ca3af' }}>Nenhuma reserva anterior.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {anteriores.map((r, i) => (
                    <div
                      key={r.id}
                      className="animate-fade-in-up"
                      style={{
                        animationDelay: `${(proximas.length + i) * 60 + 100}ms`,
                        background: '#fff',
                        borderRadius: 14,
                        border: '1px solid #f0f0f0',
                        padding: '14px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                      }}
                    >
                      {/* Ícone */}
                      <div style={{ width: 36, height: 36, borderRadius: 9, background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CalendarDays style={{ width: 16, height: 16, color: '#9ca3af' }} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: DM, fontWeight: 600, fontSize: 14, color: '#374151', marginBottom: 3, lineHeight: 1.3 }}>
                          {r.espacoNome}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 12px' }}>
                          <span className="flex items-center gap-1" style={{ fontFamily: DM, fontSize: 12, color: '#9ca3af' }}>
                            <CalendarDays style={{ width: 11, height: 11 }} />
                            {formatarData(r.data)}
                          </span>
                          <span className="flex items-center gap-1" style={{ fontFamily: DM, fontSize: 12, color: '#9ca3af' }}>
                            <Clock style={{ width: 11, height: 11 }} />
                            {r.horaInicio} – {r.horaFim}
                          </span>
                        </div>
                        <span style={{ fontFamily: DM, fontSize: 11, fontWeight: 500, color: '#9ca3af', background: '#f3f4f6', padding: '2px 7px', borderRadius: 99, display: 'inline-block', marginTop: 5 }}>
                          Concluída · #{r.id}
                        </span>
                      </div>

                      <div style={{ flexShrink: 0 }}>
                        {r.avaliado ? (
                          <span className="flex items-center gap-1.5" style={{ fontFamily: DM, fontSize: 12.5, fontWeight: 600, color: '#16a34a', background: '#dcfce7', padding: '6px 12px', borderRadius: 10 }}>
                            <Star style={{ width: 12, height: 12, fill: '#16a34a' }} />
                            Avaliado
                          </span>
                        ) : (
                          <Link
                            href={`/quadra/${r.espacoId}`}
                            className="flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                            style={{ fontFamily: DM, fontSize: 13, fontWeight: 600, color: '#fff', background: '#2E7D52', padding: '7px 14px', borderRadius: 10, textDecoration: 'none', whiteSpace: 'nowrap' }}
                          >
                            <Star style={{ width: 12, height: 12 }} />
                            Avaliar
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Link explorar */}
            <div style={{ textAlign: 'center', paddingTop: 8 }} className="animate-fade-in">
              <Link
                href="/inicio"
                className="inline-flex items-center gap-1.5 hover:underline"
                style={{ fontFamily: DM, fontSize: 13.5, fontWeight: 500, color: '#2E7D52', textDecoration: 'none' }}
              >
                <MapPin style={{ width: 13, height: 13 }} />
                Explorar mais quadras
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <DemoLoginBanner />
      <PortalNav variant="bottom" />
    </div>
  )
}
