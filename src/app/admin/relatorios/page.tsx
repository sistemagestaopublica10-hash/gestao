'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { FileDown, Printer, TrendingUp, CalendarRange, BarChart2, AlertCircle, Lightbulb, Users } from 'lucide-react'
import { mockRelatorioData, mockEspacos, mockMetricasQuadras } from '@/lib/mock-data'

const BAR_COLORS = ['#1B3A6B', '#2D5FA6', '#1A9E60', '#D97706']

function gerarCSV(data: typeof mockRelatorioData, periodo: { inicio: string; fim: string }) {
  const header = ['Espaço', 'Reservas', 'Cancelamentos', 'Nota Média'].join(',')
  const rows = data.map(d => [
    `"${d.quadra}"`, d.reservas, d.cancelamentos, d.notaMedia
  ].join(','))
  const csv = [
    `# QuadraGov — Relatório de ${periodo.inicio} a ${periodo.fim}`,
    header,
    ...rows,
  ].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `quadragov-relatorio-${periodo.inicio}-${periodo.fim}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

function PopulacaoIndicator({ taxa }: { taxa: number }) {
  const nivel = taxa >= 80 ? { label: 'Muito alta', color: '#E53E3E', bg: '#FEE2E2', icon: '🔥' }
    : taxa >= 60 ? { label: 'Alta', color: '#D97706', bg: '#FEF3C7', icon: '📈' }
    : taxa >= 35 ? { label: 'Moderada', color: '#2D5FA6', bg: '#E6F0FF', icon: '📊' }
    : { label: 'Baixa', color: '#1A9E60', bg: '#D1FAE5', icon: '📉' }

  return (
    <div className="bg-white rounded-[12px] shadow-card p-4" style={{ borderLeft: `3px solid ${nivel.color}` }}>
      <div className="flex items-center gap-2 mb-1">
        <Users className="w-3.5 h-3.5" style={{ color: nivel.color }} />
        <p className="text-xs text-[#64748B]">Frequência de uso</p>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {taxa}%
        </p>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full mb-1" style={{ background: nivel.bg, color: nivel.color }}>
          {nivel.icon} {nivel.label}
        </span>
      </div>
      {/* barra de progresso */}
      <div className="mt-2 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${taxa}%`, background: nivel.color }} />
      </div>
    </div>
  )
}

export default function RelatoriosPage() {
  const [aba, setAba] = useState<'geral' | 'quadra'>('geral')

  // Aba geral
  const [inicio, setInicio] = useState('2026-06-01')
  const [fim, setFim] = useState('2026-06-30')
  const [gerado, setGerado] = useState(false)

  // Aba por quadra
  const [espacoId, setEspacoId] = useState(mockEspacos[0].id)
  const metricas = mockMetricasQuadras.find(m => m.espacoId === espacoId)

  const totalReservas = mockRelatorioData.reduce((s, d) => s + d.reservas, 0)
  const totalCancelamentos = mockRelatorioData.reduce((s, d) => s + d.cancelamentos, 0)
  const notaGeral = (mockRelatorioData.reduce((s, d) => s + d.notaMedia, 0) / mockRelatorioData.length).toFixed(1)

  const espacoNome = mockEspacos.find(e => e.id === espacoId)?.nome ?? ''

  return (
    <div className="max-w-[1000px] space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Relatórios
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Exportar dados de reservas e avaliações por período</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#F1F5F9] rounded-[10px] p-1 w-fit">
        {([
          { key: 'geral', label: 'Visão Geral', icon: BarChart2 },
          { key: 'quadra', label: 'Por Quadra', icon: TrendingUp },
        ] as const).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setAba(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm font-medium transition-colors ${
              aba === key
                ? 'bg-white text-[#0D1F3C] shadow-sm'
                : 'text-[#64748B] hover:text-[#374151]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* ── ABA: VISÃO GERAL ──────────────────────────────── */}
      {aba === 'geral' && (
        <>
          <div className="bg-white rounded-[12px] shadow-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <CalendarRange className="w-4 h-4 text-[#2D5FA6]" />
              <h2 className="font-semibold text-sm text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Período do relatório
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-end gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Data início</label>
                <input type="date" value={inicio} onChange={e => { setInicio(e.target.value); setGerado(false) }}
                  className="border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#374151] mb-1.5">Data fim</label>
                <input type="date" value={fim} onChange={e => { setFim(e.target.value); setGerado(false) }}
                  className="border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40" />
              </div>
              <button onClick={() => setGerado(true)}
                className="flex items-center gap-2 bg-[#1B3A6B] hover:bg-[#2D5FA6] text-white text-sm font-medium px-5 py-2.5 rounded-[8px] transition-colors">
                <TrendingUp className="w-4 h-4" />
                Gerar relatório
              </button>
            </div>
          </div>

          {gerado && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SumCard label="Total de reservas" value={totalReservas} color="#1B3A6B" bg="#E6F0FF" />
                <SumCard label="Cancelamentos" value={totalCancelamentos} color="#E53E3E" bg="#FEE2E2" />
                <SumCard label="Nota geral" value={`⭐ ${notaGeral}`} color="#D97706" bg="#FEF3C7" isText />
              </div>

              <div className="bg-white rounded-[12px] shadow-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-sm text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Reservas por espaço
                  </h2>
                  <span className="text-xs text-[#9CA3AF]">{inicio} → {fim}</span>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={mockRelatorioData} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                    <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="quadra" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} width={136} />
                    <Tooltip cursor={{ fill: '#F4F7FB' }} contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 12 }}
                      formatter={(v) => [`${v} reservas`, '']} />
                    <Bar dataKey="reservas" radius={[0, 4, 4, 0]} maxBarSize={28}>
                      {mockRelatorioData.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-[12px] shadow-card overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-5 py-4 border-b border-[#F1F5F9] gap-3">
                  <h2 className="font-semibold text-sm text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Detalhamento por espaço
                  </h2>
                  <div className="flex gap-2">
                    <button onClick={() => gerarCSV(mockRelatorioData, { inicio, fim })}
                      className="flex items-center gap-1.5 text-xs font-medium text-[#1B3A6B] border border-[#1B3A6B] px-3 py-1.5 rounded-[6px] hover:bg-[#E6F0FF] transition-colors">
                      <FileDown className="w-3.5 h-3.5" />
                      Exportar CSV
                    </button>
                    <button onClick={() => window.print()}
                      className="flex items-center gap-1.5 text-xs font-medium text-[#374151] border border-[#E5E7EB] px-3 py-1.5 rounded-[6px] hover:bg-[#F4F7FB] transition-colors">
                      <Printer className="w-3.5 h-3.5" />
                      Exportar PDF
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[#F1F5F9]">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Espaço</th>
                        <th className="text-right px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Reservas</th>
                        <th className="text-right px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Cancelamentos</th>
                        <th className="text-right px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Tx. Cancel.</th>
                        <th className="text-right px-5 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Nota Média</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRelatorioData.map((d, i) => {
                        const taxa = ((d.cancelamentos / d.reservas) * 100).toFixed(1)
                        return (
                          <tr key={d.quadra} className="border-b border-[#F8FAFC] hover:bg-[#F8FAFC] transition-colors">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: BAR_COLORS[i % BAR_COLORS.length] }} />
                                <span className="font-medium text-[#111827]">{d.quadra}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-right font-semibold text-[#0D1F3C]">{d.reservas}</td>
                            <td className="px-5 py-3 text-right text-[#64748B]">{d.cancelamentos}</td>
                            <td className="px-5 py-3 text-right">
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                                parseFloat(taxa) > 10 ? 'text-[#E53E3E] bg-[#FEE2E2]' : 'text-[#1A9E60] bg-[#D1FAE5]'
                              }`}>{taxa}%</span>
                            </td>
                            <td className="px-5 py-3 text-right">
                              <span className={`font-semibold ${d.notaMedia >= 4 ? 'text-[#1A9E60]' : d.notaMedia >= 3 ? 'text-[#D97706]' : 'text-[#E53E3E]'}`}>
                                ⭐ {d.notaMedia.toFixed(1)}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="bg-[#F4F7FB]">
                        <td className="px-5 py-3 font-semibold text-[#0D1F3C] text-sm">Total</td>
                        <td className="px-5 py-3 text-right font-bold text-[#0D1F3C]">{totalReservas}</td>
                        <td className="px-5 py-3 text-right font-semibold text-[#64748B]">{totalCancelamentos}</td>
                        <td className="px-5 py-3 text-right">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full text-[#1A9E60] bg-[#D1FAE5]">
                            {((totalCancelamentos / totalReservas) * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-[#D97706]">⭐ {notaGeral}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </>
          )}

          {!gerado && (
            <div className="bg-white rounded-[12px] shadow-card p-12 text-center">
              <p className="text-4xl mb-3">📊</p>
              <p className="text-[#374151] font-medium">Selecione um período e clique em &quot;Gerar relatório&quot;</p>
              <p className="text-sm text-[#9CA3AF] mt-1">Os dados serão calculados com base nas reservas do período</p>
            </div>
          )}
        </>
      )}

      {/* ── ABA: POR QUADRA ──────────────────────────────── */}
      {aba === 'quadra' && (
        <>
          {/* Seletor de espaço */}
          <div className="bg-white rounded-[12px] shadow-card p-5">
            <label className="block text-xs font-semibold text-[#374151] mb-2">Selecionar espaço</label>
            <select
              value={espacoId}
              onChange={e => setEspacoId(e.target.value)}
              className="border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40 w-full sm:w-auto"
            >
              {mockEspacos.map(e => (
                <option key={e.id} value={e.id}>{e.nome}</option>
              ))}
            </select>
          </div>

          {metricas && (
            <>
              {/* KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <PopulacaoIndicator taxa={metricas.taxaOcupacao} />
                <div className="bg-white rounded-[12px] shadow-card p-4" style={{ borderLeft: '3px solid #D97706' }}>
                  <p className="text-xs text-[#64748B] mb-1">Nota média dos cidadãos</p>
                  <p className="text-2xl font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    ⭐ {metricas.notaMedia.toFixed(1)}
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-1">{metricas.totalAvaliacoes} avaliações no total</p>
                </div>
                <SumCard label="Reservas este mês" value={metricas.totalReservasMes} color="#1B3A6B" bg="#E6F0FF" />
              </div>

              {/* Gráficos lado a lado */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Ocupação por hora */}
                <div className="bg-white rounded-[12px] shadow-card p-5">
                  <h2 className="font-semibold text-sm text-[#0D1F3C] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Horários mais cheios vs. vazios
                  </h2>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={metricas.ocupacaoPorHora} margin={{ top: 0, right: 8, bottom: 0, left: -20 }}>
                      <XAxis dataKey="hora" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} domain={[0, 100]}
                        tickFormatter={v => `${v}%`} />
                      <Tooltip
                        cursor={{ fill: '#F4F7FB' }}
                        contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 12 }}
                        formatter={(v) => [`${v}%`, 'Ocupação']}
                      />
                      <Bar dataKey="ocupacao" radius={[4, 4, 0, 0]} maxBarSize={20}>
                        {metricas.ocupacaoPorHora.map((d, i) => (
                          <Cell key={i} fill={
                            d.ocupacao >= 80 ? '#E53E3E'
                            : d.ocupacao >= 60 ? '#D97706'
                            : d.ocupacao >= 30 ? '#2D5FA6'
                            : '#94A3B8'
                          } />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    {[
                      { color: '#E53E3E', label: 'Muito cheio (≥80%)' },
                      { color: '#D97706', label: 'Cheio (60–79%)' },
                      { color: '#2D5FA6', label: 'Moderado (30–59%)' },
                      { color: '#94A3B8', label: 'Vazio (<30%)' },
                    ].map(l => (
                      <div key={l.label} className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color }} />
                        <span className="text-[10px] text-[#64748B]">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dias da semana */}
                <div className="bg-white rounded-[12px] shadow-card p-5">
                  <h2 className="font-semibold text-sm text-[#0D1F3C] mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Reservas por dia da semana
                  </h2>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={metricas.diasSemana} margin={{ top: 0, right: 8, bottom: 0, left: -20 }}>
                      <XAxis dataKey="dia" tick={{ fontSize: 11, fill: '#374151' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        cursor={{ fill: '#F4F7FB' }}
                        contentStyle={{ borderRadius: 8, border: '1px solid #E5E7EB', fontSize: 12 }}
                        formatter={(v) => [`${v} reservas`, '']}
                      />
                      <Bar dataKey="reservas" fill="#1B3A6B" radius={[4, 4, 0, 0]} maxBarSize={32}>
                        {metricas.diasSemana.map((d, i) => (
                          <Cell key={i} fill={
                            d.reservas === Math.max(...metricas.diasSemana.map(x => x.reservas))
                              ? '#2D5FA6'
                              : d.reservas === Math.min(...metricas.diasSemana.map(x => x.reservas))
                              ? '#94A3B8'
                              : '#1B3A6B'
                          } />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Reclamações comuns */}
              <div className="bg-white rounded-[12px] shadow-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 text-[#E53E3E]" />
                  <h2 className="font-semibold text-sm text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Reclamações recorrentes dos cidadãos
                  </h2>
                </div>
                {metricas.reclamacoesComuns.length === 0 ? (
                  <p className="text-sm text-[#9CA3AF] text-center py-4">Nenhuma reclamação registrada para este espaço.</p>
                ) : (
                  <div className="space-y-2">
                    {metricas.reclamacoesComuns.map((r, i) => (
                      <div key={i} className={`flex items-center justify-between rounded-[8px] px-4 py-3 ${
                        r.count >= 5 ? 'bg-[#FEF2F2] border border-[#FCA5A5]'
                        : r.count >= 3 ? 'bg-[#FEF3C7] border border-[#FCD34D]'
                        : 'bg-[#F4F7FB] border border-[#E5E7EB]'
                      }`}>
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{r.count >= 5 ? '🚨' : r.count >= 3 ? '⚠️' : '💬'}</span>
                          <span className="text-sm text-[#374151]">{r.descricao}</span>
                          {r.count >= 3 && (
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              r.count >= 5 ? 'bg-[#FEE2E2] text-[#C53030]' : 'bg-[#FEF3C7] text-[#92400E]'
                            }`}>
                              Recorrente
                            </span>
                          )}
                        </div>
                        <span className={`text-sm font-bold shrink-0 ${
                          r.count >= 5 ? 'text-[#E53E3E]'
                          : r.count >= 3 ? 'text-[#D97706]'
                          : 'text-[#64748B]'
                        }`}>
                          {r.count}x
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sugestões de evento */}
              <div className="bg-white rounded-[12px] shadow-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-4 h-4 text-[#D97706]" />
                  <h2 className="font-semibold text-sm text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Sugestões de eventos para {espacoNome}
                  </h2>
                </div>
                <div className="space-y-2">
                  {metricas.sugestoesEvento.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 bg-[#FFFBEB] border border-[#FCD34D] rounded-[8px] px-4 py-3">
                      <span className="text-base shrink-0 mt-0.5">💡</span>
                      <p className="text-sm text-[#374151]">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

function SumCard({ label, value, color, bg, isText = false }: {
  label: string; value: number | string; color: string; bg: string; isText?: boolean
}) {
  return (
    <div className="bg-white rounded-[12px] shadow-card p-4" style={{ borderLeft: `3px solid ${color}` }}>
      <p className="text-xs text-[#64748B] mb-1">{label}</p>
      <p className={`font-bold text-[#0D1F3C] ${isText ? 'text-xl' : 'text-2xl'}`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        {value}
      </p>
    </div>
  )
}
