'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '@/components/portal/layout/Header'
import Footer from '@/components/portal/layout/Footer'
import DemoLoginBanner from '@/components/portal/layout/DemoLoginBanner'
import PortalNav from '@/components/portal/layout/PortalNav'
import { mockEspacosPublicos, mockHorarios } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const HORAS = [
  '07:00','08:00','09:00','10:00','11:00','12:00','13:00',
  '14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00',
]

function addDays(date: Date, n: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

function toISO(date: Date) {
  return date.toISOString().split('T')[0]
}

function nomeDia(date: Date) {
  return date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')
}

export default function ReservarClient({ id }: { id: string }) {
  const router = useRouter()
  const espaco = mockEspacosPublicos.find(e => e.id === id)

  const hoje = new Date(2026, 5, 18)
  const [semanaOffset, setSemanaOffset] = useState(0)
  const diasSemana = Array.from({ length: 7 }, (_, i) => addDays(hoje, semanaOffset * 7 + i))

  const [dataSelecionada, setDataSelecionada] = useState<Date>(hoje)
  const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [etapa, setEtapa] = useState<'horario' | 'dados'>('horario')

  if (!espaco) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[#9CA3AF]">Espaço não encontrado.</p>
        </main>
        <Footer />
      </div>
    )
  }

  const isoSelecionado = toISO(dataSelecionada)
  const horariosDodia = mockHorarios[id]?.[isoSelecionado] ?? null

  function getStatus(hora: string): 'livre' | 'ocupado' | 'bloqueado' {
    if (!horariosDodia) return 'livre'
    return horariosDodia.find(h => h.hora === hora)?.status ?? 'livre'
  }

  function confirmar() {
    const rid = `2026-${Math.floor(Math.random() * 9000 + 1000)}`
    router.push(
      `/reserva/${rid}/confirmada?quadra=${encodeURIComponent(espaco!.nome)}&data=${isoSelecionado}&hora=${horaSelecionada}`
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header />

      <main className="flex-1 pb-20 sm:pb-0">
        <div className={`relative h-[120px] bg-gradient-to-br ${espaco.gradiente} flex items-end px-4 sm:px-6 pb-4`}>
          <Link
            href={`/quadra/${espaco.id}`}
            className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-2 pb-12 space-y-5">

          <div className="bg-white rounded-[14px] shadow-card px-5 py-4">
            <h1 className="font-bold text-[#111827] text-[17px]" style={{ fontFamily: 'var(--font-sans)' }}>
              {espaco.nome}
            </h1>
            <p className="text-sm text-[#6B7280] mt-0.5">{espaco.bairro} · {espaco.horario}</p>
          </div>

          {etapa === 'horario' && (
            <>
              <div className="bg-white rounded-[14px] shadow-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-[#111827] text-sm flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-[#2D5FA6]" />
                    Escolha a data
                  </h2>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSemanaOffset(s => Math.max(0, s - 1))}
                      disabled={semanaOffset === 0}
                      className="p-1.5 rounded-lg hover:bg-[#F3F4F6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4 text-[#374151]" />
                    </button>
                    <button
                      onClick={() => setSemanaOffset(s => Math.min(3, s + 1))}
                      disabled={semanaOffset === 3}
                      className="p-1.5 rounded-lg hover:bg-[#F3F4F6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 text-[#374151]" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {diasSemana.map(dia => {
                    const iso = toISO(dia)
                    const selected = iso === isoSelecionado
                    return (
                      <button
                        key={iso}
                        onClick={() => { setDataSelecionada(dia); setHoraSelecionada(null) }}
                        className={cn(
                          'flex flex-col items-center gap-0.5 py-2 rounded-[10px] transition-all text-center',
                          selected ? 'bg-[#1B3A6B] text-white' : 'hover:bg-[#F3F4F6] text-[#374151]'
                        )}
                      >
                        <span className="text-[10px] font-medium capitalize">{nomeDia(dia)}</span>
                        <span className="text-sm font-bold">{dia.getDate()}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white rounded-[14px] shadow-card p-4 space-y-3">
                <h2 className="font-semibold text-[#111827] text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2D5FA6]" />
                  Horários em {dataSelecionada.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
                </h2>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {HORAS.map(hora => {
                    const status = getStatus(hora)
                    const selected = horaSelecionada === hora
                    const livre = status === 'livre'
                    return (
                      <button
                        key={hora}
                        disabled={!livre}
                        onClick={() => setHoraSelecionada(hora)}
                        className={cn(
                          'py-2.5 rounded-[10px] text-sm font-medium transition-all',
                          selected && 'bg-[#1B3A6B] text-white ring-2 ring-[#1B3A6B] ring-offset-1',
                          !selected && livre && 'bg-[#E6F0FF] text-[#1B3A6B] hover:bg-[#2D5FA6] hover:text-white',
                          status === 'ocupado' && 'bg-[#FEE2E2] text-[#9CA3AF] cursor-not-allowed line-through',
                          status === 'bloqueado' && 'bg-[#F3F4F6] text-[#D1D5DB] cursor-not-allowed',
                        )}
                      >
                        {hora}
                      </button>
                    )
                  })}
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  {[
                    { label: 'Livre', cls: 'bg-[#E6F0FF]' },
                    { label: 'Ocupado', cls: 'bg-[#FEE2E2]' },
                    { label: 'Bloqueado', cls: 'bg-[#F3F4F6]' },
                  ].map(l => (
                    <span key={l.label} className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                      <span className={`w-3 h-3 rounded-sm ${l.cls}`} />
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>

              <button
                disabled={!horaSelecionada}
                onClick={() => setEtapa('dados')}
                className="w-full py-3.5 text-[15px] font-semibold text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] disabled:bg-[#9CA3AF] disabled:cursor-not-allowed rounded-[12px] transition-colors"
              >
                {horaSelecionada
                  ? `Continuar — ${isoSelecionado.split('-').reverse().slice(0, 2).join('/')} às ${horaSelecionada}`
                  : 'Selecione um horário'}
              </button>
            </>
          )}

          {etapa === 'dados' && (
            <>
              <div className="bg-[#E6F0FF] rounded-[14px] p-4 space-y-1">
                <p className="text-xs font-semibold text-[#2D5FA6] uppercase tracking-wide">Resumo</p>
                <p className="font-bold text-[#111827]">{espaco.nome}</p>
                <p className="text-sm text-[#374151]">
                  {dataSelecionada.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })} · {horaSelecionada} – {HORAS[HORAS.indexOf(horaSelecionada!) + 1] ?? '22:00'}
                </p>
              </div>

              <div className="bg-white rounded-[14px] shadow-card p-5 space-y-4">
                <h2 className="font-semibold text-[#111827]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Seus dados
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#374151] mb-1.5">Nome completo</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      placeholder="Seu nome"
                      className="w-full px-4 py-3 rounded-[10px] border border-[#E5E7EB] text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#2D5FA6] focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#374151] mb-1.5">Telefone (WhatsApp)</label>
                    <input
                      type="tel"
                      value={telefone}
                      onChange={e => setTelefone(e.target.value)}
                      placeholder="(27) 99999-0000"
                      className="w-full px-4 py-3 rounded-[10px] border border-[#E5E7EB] text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#2D5FA6] focus:border-transparent transition"
                    />
                  </div>
                </div>
                <p className="text-xs text-[#9CA3AF]">A reserva é gratuita. Você receberá confirmação por WhatsApp.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEtapa('horario')}
                  className="flex-1 py-3 text-sm font-medium text-[#374151] border border-[#E5E7EB] rounded-[12px] hover:bg-[#F9FAFB] transition-colors"
                >
                  ← Voltar
                </button>
                <button
                  disabled={!nome.trim() || !telefone.trim()}
                  onClick={confirmar}
                  className="flex-[2] py-3 text-[15px] font-semibold text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] disabled:bg-[#9CA3AF] disabled:cursor-not-allowed rounded-[12px] transition-colors"
                >
                  Confirmar reserva
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
      <DemoLoginBanner />
      <PortalNav variant="bottom" />
    </div>
  )
}
