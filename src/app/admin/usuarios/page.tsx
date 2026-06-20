'use client'

import { useState } from 'react'
import {
  Star,
  Trophy,
  Users,
  ShieldAlert,
  CheckCircle2,
  X,
} from 'lucide-react'
import {
  mockUsuarios,
  calcularPontuacao,
  classificarPerfil,
  type UsuarioMock,
  type AvaliacaoUso,
} from '@/lib/mock-data'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<UsuarioMock[]>(mockUsuarios)
  const [modalUsuario, setModalUsuario] = useState<UsuarioMock | null>(null)
  const [notaModal, setNotaModal] = useState(5)
  const [comentarioModal, setComentarioModal] = useState('')
  const [reservaModalId, setReservaModalId] = useState('nova-reserva')
  const [hoveredStar, setHoveredStar] = useState(0)

  const totalUsuarios = usuarios.length
  const exemplares = usuarios.filter(u => calcularPontuacao(u.avaliacoesUso) >= 90).length
  const emRisco = usuarios.filter(u => {
    const p = calcularPontuacao(u.avaliacoesUso)
    return p >= 0 && p < 50
  }).length
  const suspensos = usuarios.filter(u => calcularPontuacao(u.avaliacoesUso) < 25).length

  function abrirModal(u: UsuarioMock) {
    setModalUsuario(u)
    setNotaModal(5)
    setComentarioModal('')
    setReservaModalId('nova-reserva')
    setHoveredStar(0)
  }

  function salvarAvaliacao() {
    if (!modalUsuario || !comentarioModal.trim()) return
    const novaAv: AvaliacaoUso = {
      id: `au-${Date.now()}`,
      reservaId: reservaModalId,
      espacoId: 'admin',
      espacoNome: 'Avaliação direta',
      dataReserva: new Date().toISOString().split('T')[0],
      dataAvaliacao: new Date().toISOString().split('T')[0],
      nota: notaModal,
      comentario: comentarioModal.trim(),
      avaliador: 'João Mendonça',
    }
    setUsuarios(prev =>
      prev.map(u =>
        u.id === modalUsuario.id
          ? { ...u, avaliacoesUso: [...u.avaliacoesUso, novaAv] }
          : u,
      ),
    )
    setModalUsuario(null)
  }

  return (
    <div className="max-w-[1200px] space-y-4 sm:space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Usuários e Pontuação
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">
          Gerencie a reputação dos cidadãos com base no uso das quadras
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard label="Total de usuários" value={totalUsuarios} icon={<Users className="w-5 h-5 text-[#2D5FA6]" />} bg="#E6F0FF" />
        <KpiCard label="Exemplares" value={exemplares} icon={<Trophy className="w-5 h-5 text-[#1A9E60]" />} bg="#D1FAE5" />
        <KpiCard label="Em risco" value={emRisco} icon={<ShieldAlert className="w-5 h-5 text-[#D97706]" />} bg="#FEF3C7" />
        <KpiCard label="Suspensos" value={suspensos} icon={<ShieldAlert className="w-5 h-5 text-[#E53E3E]" />} bg="#FEE2E2" />
      </div>

      {/* Lista de usuários */}
      <div className="bg-white rounded-[12px] shadow-card overflow-hidden">
        <div className="px-4 sm:px-5 py-3 border-b border-[#F1F5F9]">
          <p className="text-sm font-semibold text-[#0D1F3C]">Lista de usuários</p>
        </div>
        <div className="divide-y divide-[#F1F5F9]">
          {usuarios.map(u => {
            const pontuacao = calcularPontuacao(u.avaliacoesUso)
            const cls = classificarPerfil(pontuacao)
            const notaMedia =
              u.avaliacoesUso.length > 0
                ? u.avaliacoesUso.reduce((s, a) => s + a.nota, 0) / u.avaliacoesUso.length
                : null

            return (
              <div key={u.id} className="px-4 sm:px-5 py-3 sm:py-4 flex items-center gap-3 hover:bg-[#F8FAFC] transition-colors">
                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: cls.color }}
                >
                  {u.avatar}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0D1F3C] truncate">{u.nome}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <p className="text-xs text-[#64748B] truncate hidden sm:block">{u.email}</p>
                    {/* Classificação inline no mobile */}
                    <span
                      className="sm:hidden text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: cls.bg, color: cls.color }}
                    >
                      {cls.label}
                    </span>
                  </div>
                </div>

                {/* Classificação — desktop */}
                <span
                  className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shrink-0"
                  style={{ background: cls.bg, color: cls.color }}
                >
                  {cls.label}
                </span>

                {/* Pontuação */}
                <div className="text-right shrink-0">
                  <p className="text-base font-bold" style={{ color: cls.color }}>
                    {pontuacao}
                  </p>
                  <p className="text-[10px] text-[#9CA3AF]">pts</p>
                </div>

                {/* Estrelas — só desktop */}
                <div className="hidden lg:flex flex-col items-end gap-0.5 shrink-0">
                  {notaMedia !== null ? (
                    <>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.round(notaMedia) ? 'text-[#D97706] fill-current' : 'text-[#E5E7EB] fill-current'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#9CA3AF]">{notaMedia.toFixed(1)} ({u.avaliacoesUso.length})</span>
                    </>
                  ) : (
                    <span className="text-[10px] text-[#9CA3AF]">Sem nota</span>
                  )}
                </div>

                {/* Ação */}
                <button
                  onClick={() => abrirModal(u)}
                  className="shrink-0 flex items-center gap-1 sm:gap-1.5 text-xs text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] px-2.5 sm:px-3 py-1.5 rounded-[8px] transition-colors"
                >
                  <Star className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Avaliar</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal avaliar usuário */}
      {modalUsuario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-[16px] shadow-xl w-full max-w-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
              <div>
                <p className="font-bold text-[#0D1F3C] text-sm">Avaliar uso da quadra</p>
                <p className="text-xs text-[#64748B]">{modalUsuario.nome}</p>
              </div>
              <button
                onClick={() => setModalUsuario(null)}
                className="p-1.5 rounded-full hover:bg-[#F1F5F9] text-[#9CA3AF] hover:text-[#0D1F3C] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 py-5 space-y-4">
              {/* Estrelas */}
              <div>
                <p className="text-xs font-semibold text-[#374151] mb-2">Nota de uso</p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      onMouseEnter={() => setHoveredStar(i + 1)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setNotaModal(i + 1)}
                      className="p-0.5"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          i < (hoveredStar || notaModal)
                            ? 'text-[#D97706] fill-current'
                            : 'text-[#E5E7EB] fill-current'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  {notaModal === 5 ? 'Excelente' : notaModal === 4 ? 'Bom' : notaModal === 3 ? 'Regular' : notaModal === 2 ? 'Ruim' : 'Muito ruim'}
                </p>
              </div>

              {/* Comentário */}
              <div>
                <p className="text-xs font-semibold text-[#374151] mb-1.5">Observação</p>
                <textarea
                  value={comentarioModal}
                  onChange={e => setComentarioModal(e.target.value)}
                  placeholder="Descreva como o usuário deixou o espaço..."
                  rows={3}
                  className="w-full text-sm text-[#374151] border border-[#E5E7EB] rounded-[10px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5FA6] resize-none"
                />
              </div>

              {/* Impacto na pontuação */}
              <div className="bg-[#F8FAFC] rounded-[10px] p-3 flex items-center gap-2">
                {notaModal >= 4 ? (
                  <CheckCircle2 className="w-4 h-4 text-[#1A9E60] shrink-0" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0" />
                )}
                <p className="text-xs text-[#374151]">
                  {notaModal === 5
                    ? 'Sem impacto na pontuação (uso perfeito)'
                    : notaModal === 4
                    ? 'Reduz 5 pontos do usuário'
                    : notaModal === 3
                    ? 'Reduz 15 pontos do usuário'
                    : notaModal === 2
                    ? 'Reduz 25 pontos do usuário'
                    : 'Reduz 40 pontos do usuário'}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 flex gap-2">
              <button
                onClick={() => setModalUsuario(null)}
                className="flex-1 py-2 text-sm font-medium text-[#374151] border border-[#E5E7EB] rounded-[10px] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={salvarAvaliacao}
                disabled={!comentarioModal.trim()}
                className="flex-1 py-2 text-sm font-semibold text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] rounded-[10px] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Salvar avaliação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function KpiCard({
  label,
  value,
  icon,
  bg,
}: {
  label: string
  value: number
  icon: React.ReactNode
  bg: string
}) {
  return (
    <div className="bg-white rounded-[12px] shadow-card p-4 flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
        style={{ background: bg }}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          {value}
        </p>
        <p className="text-xs text-[#64748B]">{label}</p>
      </div>
    </div>
  )
}
