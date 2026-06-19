'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CalendarDays, Clock, MapPin, ArrowRight, Star, LogIn, LayoutGrid } from 'lucide-react'
import Header from '@/components/portal/layout/Header'
import Footer from '@/components/portal/layout/Footer'
import DemoLoginBanner from '@/components/portal/layout/DemoLoginBanner'
import PortalNav from '@/components/portal/layout/PortalNav'
import { useAuthStore } from '@/lib/auth-store'
import { mockMinhasReservas } from '@/lib/mock-data'

function formatarData(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  })
}

export default function MinhasReservasPage() {
  const { user } = useAuthStore()
  const router = useRouter()

  const proximas = mockMinhasReservas.filter(r => r.status === 'proxima')
  const anteriores = mockMinhasReservas.filter(r => r.status === 'anterior')

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header />

      <main className="flex-1 pb-20 sm:pb-0">
        {/* Topo hero compacto */}
        <div className="bg-[#1B3A6B] px-4 sm:px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <h1
              className="text-white text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Minhas Reservas
            </h1>
            <p className="text-[#93c5fd] text-sm mt-1">
              Acompanhe seus agendamentos e avalie as quadras que usou.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-8">

          {/* Estado: não logado */}
          {!user && (
            <div className="bg-white rounded-[16px] shadow-card p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E6F0FF] flex items-center justify-center mx-auto">
                <CalendarDays className="w-8 h-8 text-[#2D5FA6]" />
              </div>
              <div>
                <p className="font-bold text-[#111827] text-lg" style={{ fontFamily: 'var(--font-sans)' }}>
                  Entre para ver suas reservas
                </p>
                <p className="text-sm text-[#6B7280] mt-1">
                  Faça login para acessar seu histórico de agendamentos.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.push('/entrar')}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] rounded-[10px] transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Entrar
                </button>
                <Link
                  href="/inicio"
                  className="flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-[#374151] border border-[#E5E7EB] rounded-[10px] hover:bg-[#F9FAFB] transition-colors"
                >
                  <LayoutGrid className="w-4 h-4" />
                  Ver quadras
                </Link>
              </div>
            </div>
          )}

          {/* Estado: logado */}
          {user && user.role === 'cidadao' && (
            <>
              {/* Próximas */}
              <section>
                <h2
                  className="text-base font-bold text-[#111827] mb-3"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Próximas reservas
                </h2>
                {proximas.length === 0 ? (
                  <div className="bg-white rounded-[14px] border border-[#E5E7EB] p-6 text-center">
                    <p className="text-sm text-[#9CA3AF]">Nenhuma reserva agendada.</p>
                    <Link
                      href="/inicio"
                      className="inline-flex items-center gap-1.5 mt-3 text-sm text-[#2D5FA6] font-medium hover:underline"
                    >
                      Reservar uma quadra <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {proximas.map(r => (
                      <div
                        key={r.id}
                        className="bg-white rounded-[14px] shadow-card p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                      >
                        <div className="flex-1 space-y-1.5">
                          <p className="font-semibold text-[#111827] text-sm leading-snug">
                            {r.espacoNome}
                          </p>
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                              <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                              {formatarData(r.data)}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                              <Clock className="w-3.5 h-3.5 shrink-0" />
                              {r.horaInicio} – {r.horaFim}
                            </span>
                          </div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#D1FAE5] text-[#065F46]">
                            Confirmada · #{r.id}
                          </span>
                        </div>
                        <button className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-[#E53E3E] border border-[#FCA5A5] rounded-[10px] hover:bg-[#FEE2E2] transition-colors sm:self-center whitespace-nowrap">
                          Cancelar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Anteriores */}
              <section>
                <h2
                  className="text-base font-bold text-[#111827] mb-3"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Reservas anteriores
                </h2>
                {anteriores.length === 0 ? (
                  <div className="bg-white rounded-[14px] border border-[#E5E7EB] p-6 text-center">
                    <p className="text-sm text-[#9CA3AF]">Nenhuma reserva anterior.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {anteriores.map(r => (
                      <div
                        key={r.id}
                        className="bg-white rounded-[14px] border border-[#E5E7EB] p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                      >
                        <div className="flex-1 space-y-1.5">
                          <p className="font-semibold text-[#111827] text-sm leading-snug">
                            {r.espacoNome}
                          </p>
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                              <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                              {formatarData(r.data)}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                              <Clock className="w-3.5 h-3.5 shrink-0" />
                              {r.horaInicio} – {r.horaFim}
                            </span>
                          </div>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#F3F4F6] text-[#6B7280]">
                            Concluída · #{r.id}
                          </span>
                        </div>
                        <div className="sm:self-center">
                          {r.avaliado ? (
                            <span className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#1A9E60] bg-[#D1FAE5] rounded-[10px]">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              Avaliado
                            </span>
                          ) : (
                            <Link
                              href={`/quadra/${r.espacoId}`}
                              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] rounded-[10px] transition-colors whitespace-nowrap"
                            >
                              <Star className="w-3.5 h-3.5" />
                              Avaliar
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <div className="text-center pt-2">
                <Link
                  href="/inicio"
                  className="inline-flex items-center gap-1.5 text-sm text-[#2D5FA6] font-medium hover:underline"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Explorar mais quadras
                </Link>
              </div>
            </>
          )}

          {/* Admin acessando portal do cidadão */}
          {user && user.role === 'admin' && (
            <div className="bg-white rounded-[16px] shadow-card p-8 text-center space-y-3">
              <p className="text-sm text-[#6B7280]">
                Esta área é exclusiva para cidadãos.
              </p>
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1B3A6B] hover:underline"
              >
                Ir para o painel admin <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <DemoLoginBanner />
      <PortalNav variant="bottom" />
    </div>
  )
}
