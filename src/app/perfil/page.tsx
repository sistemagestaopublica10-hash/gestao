'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Star,
  CalendarDays,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Trophy,
  TrendingUp,
  LogIn,
} from 'lucide-react'
import Header from '@/components/portal/layout/Header'
import Footer from '@/components/portal/layout/Footer'
import DemoLoginBanner from '@/components/portal/layout/DemoLoginBanner'
import PortalNav from '@/components/portal/layout/PortalNav'
import { useAuthStore } from '@/lib/auth-store'
import {
  mockUsuarios,
  mockMinhasReservas,
  calcularPontuacao,
  classificarPerfil,
  type AvaliacaoUso,
} from '@/lib/mock-data'

function formatarData(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function EstrelaRow({ nota, size = 'md' }: { nota: number; size?: 'sm' | 'md' | 'lg' }) {
  const cls = size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${i < nota ? 'text-[#D97706] fill-current' : 'text-[#E5E7EB] fill-current'}`}
        />
      ))}
    </div>
  )
}

function BarraPontuacao({ pontuacao }: { pontuacao: number }) {
  const cls = classificarPerfil(pontuacao)
  return (
    <div className="w-full">
      <div className="flex justify-between text-[11px] font-medium mb-1" style={{ color: cls.color }}>
        <span>{cls.label}</span>
        <span>{pontuacao}/100 pts</span>
      </div>
      <div className="h-2.5 rounded-full bg-[#E5E7EB] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pontuacao}%`, background: cls.color }}
        />
      </div>
    </div>
  )
}

function AvaliacaoUsoCard({ av }: { av: AvaliacaoUso }) {
  return (
    <div className="bg-[#F9FAFB] rounded-[10px] p-3 border border-[#E5E7EB]">
      <div className="flex items-center justify-between mb-1.5">
        <EstrelaRow nota={av.nota} size="sm" />
        <span className="text-[10px] text-[#9CA3AF]">{formatarData(av.dataAvaliacao)}</span>
      </div>
      <p className="text-xs text-[#374151]">{av.comentario}</p>
      <p className="text-[10px] text-[#9CA3AF] mt-1">por {av.avaliador}</p>
    </div>
  )
}

export default function PerfilPage() {
  const { user } = useAuthStore()
  const router = useRouter()

  if (!user || user.role !== 'cidadao') {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-[16px] shadow-card p-8 text-center space-y-4 max-w-sm w-full">
            <div className="w-16 h-16 rounded-full bg-[#E6F0FF] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8 text-[#2D5FA6]" />
            </div>
            <p className="font-bold text-[#111827]">Entre para ver seu perfil</p>
            <button
              onClick={() => router.push('/entrar')}
              className="flex items-center justify-center gap-2 w-full px-6 py-2.5 text-sm font-semibold text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] rounded-[10px] transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Entrar
            </button>
          </div>
        </main>
        <Footer />
        <DemoLoginBanner />
        <PortalNav variant="bottom" />
      </div>
    )
  }

  const dadosUsuario = mockUsuarios.find(u => u.email === user.email)
  const avaliacoesUso = dadosUsuario?.avaliacoesUso ?? []
  const pontuacao = calcularPontuacao(avaliacoesUso)
  const classificacao = classificarPerfil(pontuacao)
  const notaMedia =
    avaliacoesUso.length > 0
      ? avaliacoesUso.reduce((s, a) => s + a.nota, 0) / avaliacoesUso.length
      : null

  const proximas = mockMinhasReservas.filter(r => r.status === 'proxima')
  const anteriores = mockMinhasReservas.filter(r => r.status === 'anterior')

  const avaliacoesPorReserva = (reservaId: string) =>
    avaliacoesUso.filter(a => a.reservaId === reservaId)

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header />

      <main className="flex-1 pb-20 sm:pb-0">
        {/* Hero */}
        <div className="bg-[#1B3A6B] px-4 sm:px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/inicio"
              className="inline-flex items-center gap-1.5 text-[#93c5fd] text-xs hover:text-white transition-colors mb-5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar ao início
            </Link>

            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold border-2"
                  style={{ background: '#2D5FA6', borderColor: classificacao.color }}
                >
                  {user.avatar}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border border-[#1B3A6B]"
                  style={{ background: classificacao.color, color: '#fff' }}
                  title={classificacao.label}
                >
                  {pontuacao >= 90 ? '★' : pontuacao >= 70 ? '✓' : pontuacao >= 50 ? '~' : '!'}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-white text-xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {user.nome}
                </h1>
                <p className="text-[#93c5fd] text-xs mt-0.5">{user.email}</p>

                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  {/* Badge classificação */}
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: classificacao.bg, color: classificacao.color }}
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    {classificacao.label}
                  </span>

                  {/* Estrelas média */}
                  {notaMedia !== null && (
                    <div className="flex items-center gap-1.5">
                      <EstrelaRow nota={Math.round(notaMedia)} size="sm" />
                      <span className="text-[#93c5fd] text-xs">{notaMedia.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Barra de pontuação */}
            <div className="mt-5 bg-[#152d52] rounded-[12px] p-4">
              <BarraPontuacao pontuacao={pontuacao} />
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-8">
          {/* Cards de estatísticas */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-[12px] shadow-card p-3 text-center">
              <p className="text-2xl font-bold text-[#1B3A6B]" style={{ fontFamily: 'var(--font-sans)' }}>
                {dadosUsuario?.totalReservas ?? 0}
              </p>
              <p className="text-[11px] text-[#6B7280] mt-0.5">Reservas</p>
            </div>
            <div className="bg-white rounded-[12px] shadow-card p-3 text-center">
              <p className="text-2xl font-bold" style={{ color: classificacao.color, fontFamily: 'var(--font-sans)' }}>
                {pontuacao}
              </p>
              <p className="text-[11px] text-[#6B7280] mt-0.5">Pontos</p>
            </div>
            <div className="bg-white rounded-[12px] shadow-card p-3 text-center">
              {notaMedia !== null ? (
                <>
                  <p className="text-2xl font-bold text-[#D97706]" style={{ fontFamily: 'var(--font-sans)' }}>
                    {notaMedia.toFixed(1)}
                  </p>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Nota média</p>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold text-[#9CA3AF]">—</p>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">Sem avaliações</p>
                </>
              )}
            </div>
          </div>

          {/* Tabela de classificações */}
          <section className="bg-white rounded-[14px] shadow-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#2D5FA6]" />
              <h2 className="text-sm font-bold text-[#111827]" style={{ fontFamily: 'var(--font-sans)' }}>
                Como funciona a pontuação
              </h2>
            </div>
            <div className="space-y-2">
              {[
                { range: '90–100', label: 'Exemplar', color: '#1A9E60', bg: '#D1FAE5' },
                { range: '70–89',  label: 'Bom Usuário', color: '#2D5FA6', bg: '#E6F0FF' },
                { range: '50–69',  label: 'Regular', color: '#D97706', bg: '#FEF3C7' },
                { range: '25–49',  label: 'Em Risco', color: '#E53E3E', bg: '#FEE2E2' },
                { range: '0–24',   label: 'Suspenso', color: '#7C3AED', bg: '#EDE9FE' },
              ].map(({ range, label, color, bg }) => (
                <div
                  key={range}
                  className="flex items-center justify-between px-3 py-1.5 rounded-[8px]"
                  style={{ background: pontuacao >= parseInt(range) ? bg : 'transparent', opacity: pontuacao < parseInt(range) ? 0.5 : 1 }}
                >
                  <span className="text-xs text-[#374151] font-medium">{range} pts</span>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ color, background: bg }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Histórico de reservas com avaliações */}
          <section>
            <h2 className="text-base font-bold text-[#111827] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
              Histórico de reservas e avaliações de uso
            </h2>

            {/* Próximas */}
            {proximas.length > 0 && (
              <div className="mb-4 space-y-3">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Próximas</p>
                {proximas.map(r => (
                  <ReservaComAvaliacao
                    key={r.id}
                    reserva={r}
                    avaliacoes={avaliacoesPorReserva(r.id)}
                  />
                ))}
              </div>
            )}

            {/* Anteriores */}
            {anteriores.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Anteriores</p>
                {anteriores.map(r => (
                  <ReservaComAvaliacao
                    key={r.id}
                    reserva={r}
                    avaliacoes={avaliacoesPorReserva(r.id)}
                  />
                ))}
              </div>
            )}

            {proximas.length === 0 && anteriores.length === 0 && (
              <div className="bg-white rounded-[14px] border border-[#E5E7EB] p-8 text-center">
                <p className="text-sm text-[#9CA3AF]">Nenhuma reserva encontrada.</p>
                <Link
                  href="/inicio"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm text-[#2D5FA6] font-medium hover:underline"
                >
                  Reservar uma quadra
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
      <DemoLoginBanner />
      <PortalNav variant="bottom" />
    </div>
  )
}

function ReservaComAvaliacao({
  reserva,
  avaliacoes,
}: {
  reserva: (typeof mockMinhasReservas)[0]
  avaliacoes: AvaliacaoUso[]
}) {
  const isProxima = reserva.status === 'proxima'

  return (
    <div className="bg-white rounded-[14px] shadow-card overflow-hidden">
      {/* Linha da reserva */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-1.5">
            <p className="font-semibold text-[#111827] text-sm">{reserva.espacoNome}</p>
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                {formatarData(reserva.data)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                {reserva.horaInicio} – {reserva.horaFim}
              </span>
            </div>
          </div>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium shrink-0 ${
              isProxima
                ? 'bg-[#D1FAE5] text-[#065F46]'
                : 'bg-[#F3F4F6] text-[#6B7280]'
            }`}
          >
            {isProxima ? 'Confirmada' : 'Concluída'} · #{reserva.id}
          </span>
        </div>
      </div>

      {/* Avaliações de uso pelo admin */}
      {!isProxima && (
        <div className="border-t border-[#F3F4F6] px-4 pb-4 pt-3">
          <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-2">
            Avaliação de uso pela prefeitura
          </p>
          {avaliacoes.length === 0 ? (
            <p className="text-xs text-[#9CA3AF] italic">Ainda não avaliado.</p>
          ) : (
            <div className="space-y-2">
              {avaliacoes.map(av => (
                <AvaliacaoUsoCard key={av.id} av={av} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
