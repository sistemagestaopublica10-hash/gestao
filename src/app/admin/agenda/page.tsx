'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Plus, Phone, Clock, User, X, AlertTriangle } from 'lucide-react'
import { mockEspacos, mockReservas } from '@/lib/mock-data'

type Reserva = typeof mockReservas[number]
type Bloqueio = { id: string; espacoId: string; motivo: string; descricao: string; dataInicio: string; dataFim: string; horaInicio: string; horaFim: string }

const HORAS = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00']
const DIAS_SEMANA = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const MOTIVOS = ['Manutenção', 'Evento', 'Outro']

function getMonday(d: Date): Date {
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  const m = new Date(d)
  m.setDate(d.getDate() + diff)
  m.setHours(0, 0, 0, 0)
  return m
}

function fmtDate(d: Date): string {
  return d.toISOString().split('T')[0]
}

function fmtDiaMes(d: Date): string {
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

function blocoStyle(tipo: string): { bg: string; text: string; border: string } {
  if (tipo === 'bloqueio') return { bg: '#FEE2E2', text: '#C53030', border: '#FCA5A5' }
  if (tipo === 'comum') return { bg: '#E6F0FF', text: '#1B3A6B', border: '#93C5FD' }
  return { bg: '#D1FAE5', text: '#065f3c', border: '#6EE7B7' }
}

function blocoLabel(tipo: string): string {
  if (tipo === 'bloqueio') return '🔒 Bloqueio'
  if (tipo === 'escola') return '🏫 Escolinha'
  if (tipo === 'idosos') return '🧓 Idosos'
  return '👤 Cidadão'
}

export default function AgendaPage() {
  const [espacoId, setEspacoId] = useState(mockEspacos[0].id)
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()))
  const [reservaDrawer, setReservaDrawer] = useState<Reserva | null>(null)
  const [bloqueioModal, setBloqueioModal] = useState(false)
  const [bloqueios, setBloqueios] = useState<Bloqueio[]>([])
  const [cancelId, setCancelId] = useState<string | null>(null)
  const [reservas, setReservas] = useState(mockReservas)

  // Bloqueio form state
  const [bEspacoId, setBEspacoId] = useState(mockEspacos[0].id)
  const [bMotivo, setBMotivo] = useState(MOTIVOS[0])
  const [bDataInicio, setBDataInicio] = useState('')
  const [bDataFim, setBDataFim] = useState('')
  const [bHoraInicio, setBHoraInicio] = useState('07:00')
  const [bHoraFim, setBHoraFim] = useState('08:00')
  const [bObs, setBObs] = useState('')

  const days = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart)
      d.setDate(weekStart.getDate() + i)
      return d
    }),
    [weekStart]
  )

  const weekDates = useMemo(() => days.map(fmtDate), [days])

  function prevWeek() {
    const d = new Date(weekStart)
    d.setDate(d.getDate() - 7)
    setWeekStart(d)
  }

  function nextWeek() {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + 7)
    setWeekStart(d)
  }

  function getCell(date: string, hora: string): { reserva: Reserva | null; bloqueio: Bloqueio | null } {
    const r = reservas.find(
      r => r.espacoId === espacoId && r.data === date && r.horaInicio === hora
    ) ?? null
    const b = bloqueios.find(
      b => b.espacoId === espacoId && b.dataInicio <= date && b.dataFim >= date
        && b.horaInicio <= hora && b.horaFim > hora
    ) ?? null
    return { reserva: r, bloqueio: b }
  }

  function cancelarReserva(id: string) {
    setReservas(prev => prev.filter(r => r.id !== id))
    setCancelId(null)
    setReservaDrawer(null)
  }

  function criarBloqueio() {
    setBloqueios(prev => [...prev, {
      id: String(Date.now()),
      espacoId: bEspacoId,
      motivo: bMotivo,
      descricao: bObs,
      dataInicio: bDataInicio,
      dataFim: bDataFim,
      horaInicio: bHoraInicio,
      horaFim: bHoraFim,
    }])
    setBloqueioModal(false)
    setBObs('')
  }

  const espacoNome = mockEspacos.find(e => e.id === espacoId)?.nome ?? ''

  return (
    <div className="max-w-[1200px] space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Agenda
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">Visualização semanal de reservas</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Seletor de espaço */}
          <select
            value={espacoId}
            onChange={e => setEspacoId(e.target.value)}
            className="border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40"
          >
            {mockEspacos.map(e => (
              <option key={e.id} value={e.id}>{e.nome}</option>
            ))}
          </select>
          <button
            onClick={() => setBloqueioModal(true)}
            className="flex items-center gap-2 bg-[#1B3A6B] hover:bg-[#2D5FA6] text-white text-sm font-medium px-4 py-2 rounded-[8px] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Criar bloqueio
          </button>
        </div>
      </div>

      {/* Week navigation */}
      <div className="bg-white rounded-[12px] shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9]">
          <button onClick={prevWeek} className="p-1.5 rounded-md hover:bg-[#F3F4F6] text-[#64748B]">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-[#0D1F3C]">
            {fmtDiaMes(days[0])} – {fmtDiaMes(days[6])}
          </span>
          <button onClick={nextWeek} className="p-1.5 rounded-md hover:bg-[#F3F4F6] text-[#64748B]">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="overflow-x-auto">
          <div style={{ minWidth: 640 }}>
            {/* Day headers */}
            <div className="grid border-b border-[#F1F5F9]" style={{ gridTemplateColumns: '56px repeat(7, 1fr)' }}>
              <div className="py-2" />
              {days.map((d, i) => {
                const isToday = fmtDate(d) === fmtDate(new Date())
                return (
                  <div key={i} className="py-2 text-center border-l border-[#F1F5F9]">
                    <p className="text-[11px] text-[#64748B]">{DIAS_SEMANA[i]}</p>
                    <p className={`text-sm font-semibold mt-0.5 ${isToday ? 'text-[#2D5FA6]' : 'text-[#0D1F3C]'}`}>
                      {d.getDate()}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Hour rows */}
            <div className="max-h-[520px] overflow-y-auto">
              {HORAS.map(hora => (
                <div
                  key={hora}
                  className="grid border-b border-[#F8FAFC]"
                  style={{ gridTemplateColumns: '56px repeat(7, 1fr)', minHeight: 48 }}
                >
                  <div className="py-2 px-2 text-[10px] text-[#9CA3AF] font-medium text-right border-r border-[#F1F5F9]">
                    {hora}
                  </div>
                  {weekDates.map((date, di) => {
                    const { reserva, bloqueio } = getCell(date, hora)
                    const style = reserva
                      ? blocoStyle(reserva.tipo)
                      : bloqueio
                      ? blocoStyle('bloqueio')
                      : null
                    return (
                      <div
                        key={di}
                        className="border-l border-[#F1F5F9] p-0.5"
                      >
                        {reserva && style && (
                          <button
                            onClick={() => setReservaDrawer(reserva)}
                            className="w-full h-full rounded-[4px] px-1.5 py-1 text-left transition-opacity hover:opacity-80"
                            style={{ background: style.bg, border: `1px solid ${style.border}` }}
                          >
                            <p className="text-[10px] font-semibold leading-tight truncate" style={{ color: style.text }}>
                              {blocoLabel(reserva.tipo)}
                            </p>
                            <p className="text-[9px] truncate" style={{ color: style.text, opacity: 0.8 }}>
                              {reserva.morador.split(' ')[0]}
                            </p>
                          </button>
                        )}
                        {bloqueio && !reserva && style && (
                          <div
                            className="w-full h-full rounded-[4px] px-1.5 py-1"
                            style={{ background: style.bg, border: `1px solid ${style.border}` }}
                          >
                            <p className="text-[10px] font-semibold leading-tight" style={{ color: style.text }}>
                              🔒 {bloqueio.motivo}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-4 py-3 border-t border-[#F1F5F9]">
          {[
            { label: 'Cidadão comum', ...blocoStyle('comum') },
            { label: 'Prioridade social', ...blocoStyle('prioridade') },
            { label: 'Bloqueio', ...blocoStyle('bloqueio') },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ background: l.bg, border: `1px solid ${l.border}` }} />
              <span className="text-xs text-[#64748B]">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reserva drawer */}
      {reservaDrawer && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setReservaDrawer(null)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-[340px] bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
              <h2 className="font-bold text-[#0D1F3C] text-base" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Detalhes da reserva
              </h2>
              <button onClick={() => setReservaDrawer(null)} className="p-1.5 rounded-md hover:bg-[#F3F4F6] text-[#64748B]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 p-5 space-y-4">
              <div
                className="rounded-[10px] p-4 space-y-3"
                style={{ background: blocoStyle(reservaDrawer.tipo).bg }}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: blocoStyle(reservaDrawer.tipo).text }} />
                  <span className="text-sm font-semibold" style={{ color: blocoStyle(reservaDrawer.tipo).text }}>
                    {reservaDrawer.morador}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#64748B]" />
                  <span className="text-sm text-[#374151]">{reservaDrawer.telefone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#64748B]" />
                  <span className="text-sm text-[#374151]">
                    {reservaDrawer.data} · {reservaDrawer.horaInicio}–{reservaDrawer.horaFim}
                  </span>
                </div>
              </div>
              <div className="bg-[#F4F7FB] rounded-[8px] px-3 py-2">
                <p className="text-xs text-[#64748B]">Espaço</p>
                <p className="text-sm font-medium text-[#0D1F3C] mt-0.5">{reservaDrawer.espacoNome}</p>
              </div>
              <div className="bg-[#F4F7FB] rounded-[8px] px-3 py-2">
                <p className="text-xs text-[#64748B]">Tipo de reserva</p>
                <p className="text-sm font-medium text-[#0D1F3C] mt-0.5 capitalize">{reservaDrawer.tipo}</p>
              </div>
            </div>
            <div className="px-5 py-4 border-t border-[#E5E7EB]">
              <button
                onClick={() => setCancelId(reservaDrawer.id)}
                className="w-full py-2.5 text-sm font-medium text-[#E53E3E] border border-[#E53E3E] rounded-[8px] hover:bg-[#FEE2E2] transition-colors"
              >
                Cancelar reserva
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Cancel confirm */}
      {cancelId && (
        <>
          <div className="fixed inset-0 z-[60] bg-black/30" onClick={() => setCancelId(null)} />
          <div className="fixed top-1/2 left-1/2 z-[70] -translate-x-1/2 -translate-y-1/2 bg-white rounded-[14px] shadow-2xl p-6 w-80">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-[#E53E3E]" />
              </div>
              <h3 className="font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Cancelar reserva?
              </h3>
            </div>
            <p className="text-sm text-[#64748B] mb-5">
              O morador será notificado e o horário ficará livre.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setCancelId(null)} className="flex-1 py-2 text-sm border border-[#E5E7EB] rounded-[8px] hover:bg-[#F3F4F6] text-[#374151]">
                Voltar
              </button>
              <button onClick={() => cancelarReserva(cancelId)} className="flex-1 py-2 text-sm bg-[#E53E3E] text-white rounded-[8px] hover:bg-[#C53030]">
                Confirmar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Bloqueio modal */}
      {bloqueioModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setBloqueioModal(false)} />
          <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[14px] shadow-2xl p-6 w-[420px] max-w-[calc(100vw-2rem)]">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-[#0D1F3C] text-base" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Criar bloqueio
              </h2>
              <button onClick={() => setBloqueioModal(false)} className="p-1.5 rounded-md hover:bg-[#F3F4F6] text-[#64748B]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <MiniField label="Espaço">
                <select
                  value={bEspacoId}
                  onChange={e => setBEspacoId(e.target.value)}
                  className="w-full border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40"
                >
                  {mockEspacos.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
                </select>
              </MiniField>

              <MiniField label="Motivo">
                <select
                  value={bMotivo}
                  onChange={e => setBMotivo(e.target.value)}
                  className="w-full border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40"
                >
                  {MOTIVOS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </MiniField>

              <div className="grid grid-cols-2 gap-3">
                <MiniField label="Data início">
                  <input type="date" value={bDataInicio} onChange={e => setBDataInicio(e.target.value)}
                    className="w-full border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40" />
                </MiniField>
                <MiniField label="Data fim">
                  <input type="date" value={bDataFim} onChange={e => setBDataFim(e.target.value)}
                    className="w-full border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40" />
                </MiniField>
                <MiniField label="Hora início">
                  <select value={bHoraInicio} onChange={e => setBHoraInicio(e.target.value)}
                    className="w-full border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40">
                    {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </MiniField>
                <MiniField label="Hora fim">
                  <select value={bHoraFim} onChange={e => setBHoraFim(e.target.value)}
                    className="w-full border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40">
                    {HORAS.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </MiniField>
              </div>

              <MiniField label="Observação (opcional)">
                <textarea
                  value={bObs}
                  onChange={e => setBObs(e.target.value)}
                  rows={2}
                  placeholder="Ex: Torneio municipal — acesso restrito"
                  className="w-full border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40 placeholder:text-[#9CA3AF]"
                />
              </MiniField>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setBloqueioModal(false)}
                className="flex-1 py-2.5 text-sm border border-[#E5E7EB] rounded-[8px] hover:bg-[#F3F4F6] text-[#374151]">
                Cancelar
              </button>
              <button onClick={criarBloqueio}
                className="flex-1 py-2.5 text-sm bg-[#1B3A6B] text-white rounded-[8px] hover:bg-[#2D5FA6]">
                Criar bloqueio
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function MiniField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#374151] mb-1">{label}</label>
      {children}
    </div>
  )
}
