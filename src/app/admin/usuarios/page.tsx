'use client'

import { useState } from 'react'
import {
  Trophy, Users, ShieldAlert, X,
  Star, CalendarDays, FileText, AlertTriangle,
  ChevronRight, Ban, CheckCircle2,
} from 'lucide-react'
import {
  mockUsuarios,
  mockReservas,
  mockPostagens,
  mockEspacos,
  calcularPontuacao,
  classificarPerfil,
  type UsuarioMock,
} from '@/lib/mock-data'

type DrawerAba = 'agendamentos' | 'avaliacoes' | 'relatos'

export default function UsuariosPage() {
  const [usuarios] = useState<UsuarioMock[]>(mockUsuarios)
  const [suspendedIds, setSuspendedIds] = useState<string[]>([])
  const [drawerUsuario, setDrawerUsuario] = useState<UsuarioMock | null>(null)
  const [drawerAba, setDrawerAba] = useState<DrawerAba>('agendamentos')

  const totalUsuarios = usuarios.length
  const exemplares    = usuarios.filter(u => calcularPontuacao(u.avaliacoesUso) >= 90).length
  const emRisco       = usuarios.filter(u => { const p = calcularPontuacao(u.avaliacoesUso); return p >= 0 && p < 50 }).length
  const suspensos     = suspendedIds.length

  function toggleSuspender(id: string) {
    setSuspendedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function abrirDrawer(u: UsuarioMock) {
    setDrawerUsuario(u)
    setDrawerAba('agendamentos')
  }

  const reservasUsuario  = drawerUsuario ? mockReservas.filter(r => r.morador === drawerUsuario.nome) : []
  const avaliacoesUsuario = drawerUsuario ? mockPostagens.filter(p => p.autor === drawerUsuario.nome && p.tipo === 'avaliacao') : []
  const relatosUsuario    = drawerUsuario ? mockPostagens.filter(p => p.autor === drawerUsuario.nome && p.tipo === 'problema') : []

  return (
    <div className="max-w-[1200px] space-y-4 sm:space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Usuários
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Gerencie os cidadãos registrados na plataforma</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard label="Total de usuários" value={totalUsuarios} icon={<Users className="w-5 h-5 text-[#2D5FA6]" />} bg="#E6F0FF" />
        <KpiCard label="Exemplares (≥90 pts)" value={exemplares} icon={<Trophy className="w-5 h-5 text-[#1A9E60]" />} bg="#D1FAE5" />
        <KpiCard label="Em risco (<50 pts)" value={emRisco} icon={<ShieldAlert className="w-5 h-5 text-[#D97706]" />} bg="#FEF3C7" />
        <KpiCard label="Suspensos" value={suspensos} icon={<Ban className="w-5 h-5 text-[#E53E3E]" />} bg="#FEE2E2" />
      </div>

      {/* Lista */}
      <div className="bg-white rounded-[12px] shadow-card overflow-hidden">
        <div className="px-4 sm:px-5 py-3 border-b border-[#F1F5F9]">
          <p className="text-sm font-semibold text-[#0D1F3C]">Lista de usuários</p>
        </div>
        <div className="divide-y divide-[#F1F5F9]">
          {usuarios.map(u => {
            const pontuacao = calcularPontuacao(u.avaliacoesUso)
            const cls       = classificarPerfil(pontuacao)
            const suspenso  = suspendedIds.includes(u.id)

            return (
              <div key={u.id} className="px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 hover:bg-[#F8FAFC] transition-colors">
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: suspenso ? '#9CA3AF' : cls.color }}
                >
                  {u.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-[#0D1F3C] truncate">{u.nome}</p>
                    {suspenso && (
                      <span className="text-[10px] font-semibold text-[#E53E3E] bg-[#FEE2E2] px-1.5 py-0.5 rounded-full">
                        Suspenso
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#64748B] truncate hidden sm:block">{u.email}</p>
                </div>

                {/* Classificação */}
                <span
                  className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
                  style={{ background: cls.bg, color: cls.color }}
                >
                  {cls.label}
                </span>

                {/* Pontuação */}
                <div className="text-right shrink-0">
                  <p className="text-base font-bold" style={{ color: suspenso ? '#9CA3AF' : cls.color }}>{pontuacao}</p>
                  <p className="text-[10px] text-[#9CA3AF]">pts</p>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleSuspender(u.id)}
                    title={suspenso ? 'Revogar suspensão' : 'Suspender usuário'}
                    className={`p-1.5 rounded-[8px] border transition-colors ${
                      suspenso
                        ? 'bg-[#D1FAE5] border-[#1A9E60] text-[#1A9E60] hover:bg-[#A7F3D0]'
                        : 'bg-white border-[#E5E7EB] text-[#9CA3AF] hover:border-[#E53E3E] hover:text-[#E53E3E]'
                    }`}
                  >
                    {suspenso ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => abrirDrawer(u)}
                    className="flex items-center gap-1 text-xs text-[#1B3A6B] bg-[#E6F0FF] hover:bg-[#1B3A6B] hover:text-white px-2.5 py-1.5 rounded-[8px] transition-colors"
                  >
                    Ver perfil <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Drawer de detalhe do usuário */}
      {drawerUsuario && (() => {
        const pontuacao = calcularPontuacao(drawerUsuario.avaliacoesUso)
        const cls       = classificarPerfil(pontuacao)
        const suspenso  = suspendedIds.includes(drawerUsuario.id)
        return (
          <>
            <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setDrawerUsuario(null)} />
            <aside className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col">

              {/* Header */}
              <div className="flex items-start justify-between px-5 py-4 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: suspenso ? '#9CA3AF' : cls.color }}
                  >
                    {drawerUsuario.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-[#0D1F3C] text-sm">{drawerUsuario.nome}</p>
                    <p className="text-xs text-[#64748B]">{drawerUsuario.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: cls.bg, color: cls.color }}>
                        {cls.label}
                      </span>
                      <span className="text-[11px] text-[#64748B]">{pontuacao} pts</span>
                      {suspenso && (
                        <span className="text-[11px] font-semibold text-[#E53E3E] bg-[#FEE2E2] px-2 py-0.5 rounded-full">Suspenso</span>
                      )}
                    </div>
                  </div>
                </div>
                <button onClick={() => setDrawerUsuario(null)} className="p-1.5 rounded-full hover:bg-[#F3F4F6] text-[#64748B]">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Botão suspender */}
              <div className="px-5 py-3 border-b border-[#F1F5F9]">
                <button
                  onClick={() => toggleSuspender(drawerUsuario.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-[8px] text-sm font-medium border transition-colors ${
                    suspenso
                      ? 'bg-[#D1FAE5] border-[#1A9E60] text-[#1A9E60] hover:bg-[#A7F3D0]'
                      : 'bg-white border-[#E53E3E] text-[#E53E3E] hover:bg-[#FEE2E2]'
                  }`}
                >
                  {suspenso ? <><CheckCircle2 className="w-4 h-4" /> Revogar suspensão</> : <><Ban className="w-4 h-4" /> Suspender usuário</>}
                </button>
              </div>

              {/* Abas */}
              <div className="flex gap-1 px-5 py-2 border-b border-[#F1F5F9]">
                {([
                  { key: 'agendamentos' as DrawerAba, label: 'Agendamentos', icon: <CalendarDays className="w-3.5 h-3.5" />, count: reservasUsuario.length },
                  { key: 'avaliacoes'  as DrawerAba, label: 'Avaliações',   icon: <Star className="w-3.5 h-3.5" />,        count: avaliacoesUsuario.length },
                  { key: 'relatos'     as DrawerAba, label: 'Relatos',      icon: <AlertTriangle className="w-3.5 h-3.5" />, count: relatosUsuario.length },
                ]).map(({ key, label, icon, count }) => (
                  <button
                    key={key}
                    onClick={() => setDrawerAba(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-medium transition-colors ${
                      drawerAba === key ? 'bg-[#E6F0FF] text-[#1B3A6B]' : 'text-[#64748B] hover:bg-[#F4F7FB]'
                    }`}
                  >
                    {icon} {label}
                    {count > 0 && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${drawerAba === key ? 'bg-[#1B3A6B] text-white' : 'bg-[#E5E7EB] text-[#64748B]'}`}>
                        {count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Conteúdo da aba */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">

                {drawerAba === 'agendamentos' && (
                  reservasUsuario.length === 0 ? (
                    <p className="text-sm text-[#9CA3AF] text-center py-8">Nenhum agendamento encontrado.</p>
                  ) : reservasUsuario.map(r => (
                    <div key={r.id} className="bg-[#F8FAFC] rounded-[10px] px-4 py-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#0D1F3C]">{r.espacoNome}</p>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                          r.tipo === 'escola' ? 'bg-[#E6F0FF] text-[#1B3A6B]' :
                          r.tipo === 'idosos' ? 'bg-[#FEF3C7] text-[#D97706]' :
                          'bg-[#F3F4F6] text-[#6B7280]'
                        }`}>
                          {r.tipo === 'escola' ? 'Escola' : r.tipo === 'idosos' ? 'Idosos' : 'Comum'}
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-1">{r.data} · {r.horaInicio} – {r.horaFim}</p>
                    </div>
                  ))
                )}

                {drawerAba === 'avaliacoes' && (
                  avaliacoesUsuario.length === 0 ? (
                    <p className="text-sm text-[#9CA3AF] text-center py-8">Nenhuma avaliação encontrada.</p>
                  ) : avaliacoesUsuario.map(a => {
                    if (a.tipo !== 'avaliacao') return null
                    const nomeEspaco = mockEspacos.find(e => e.id === a.espacoId)?.nome ?? a.espacoId
                    return (
                      <div key={a.id} className="bg-[#F8FAFC] rounded-[10px] px-4 py-3">
                        <div className="flex items-center gap-1 mb-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < a.nota ? 'text-[#D97706] fill-current' : 'text-[#E5E7EB] fill-current'}`} />
                          ))}
                          <span className="text-xs text-[#9CA3AF] ml-1">{a.data}</span>
                        </div>
                        <p className="text-xs text-[#374151]">{a.comentario}</p>
                        <p className="text-[11px] text-[#9CA3AF] mt-1">{nomeEspaco}</p>
                      </div>
                    )
                  })
                )}

                {drawerAba === 'relatos' && (
                  relatosUsuario.length === 0 ? (
                    <p className="text-sm text-[#9CA3AF] text-center py-8">Nenhum relato encontrado.</p>
                  ) : relatosUsuario.map(r => {
                    if (r.tipo !== 'problema') return null
                    const nomeEspaco = mockEspacos.find(e => e.id === r.espacoId)?.nome ?? r.espacoId
                    return (
                      <div key={r.id} className="bg-[#FEF3C7] rounded-[10px] px-4 py-3">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                          <span className="text-xs font-semibold text-[#D97706]">Relato de problema</span>
                          <span className="text-xs text-[#9CA3AF] ml-auto">{r.data}</span>
                        </div>
                        <p className="text-xs text-[#374151]">{r.descricao}</p>
                        <p className="text-[11px] text-[#9CA3AF] mt-1">{nomeEspaco}</p>
                      </div>
                    )
                  })
                )}
              </div>
            </aside>
          </>
        )
      })()}
    </div>
  )
}

function KpiCard({ label, value, icon, bg }: { label: string; value: number; icon: React.ReactNode; bg: string }) {
  return (
    <div className="bg-white rounded-[12px] shadow-card p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: bg }}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{value}</p>
        <p className="text-xs text-[#64748B]">{label}</p>
      </div>
    </div>
  )
}
