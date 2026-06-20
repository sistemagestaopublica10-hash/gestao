'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Star,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  X,
  ShieldAlert,
} from 'lucide-react'
import {
  mockEspacos,
  mockAvaliacoes,
  mockReservas,
  mockUsuarios,
  calcularPontuacao,
  classificarPerfil,
  type AvaliacaoUso,
  type UsuarioMock,
} from '@/lib/mock-data'

type Aba = 'detalhes' | 'avaliacoes' | 'relatos' | 'avaliar-usuario'
type StatusProblema = 'aberto' | 'em_andamento' | 'resolvido'

function EstrelaRow({ nota }: { nota: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < nota ? 'text-[#D97706] fill-current' : 'text-[#E5E7EB] fill-current'}`}
        />
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: StatusProblema }) {
  if (status === 'aberto')
    return <span className="text-[11px] font-semibold text-[#E53E3E] bg-[#FEE2E2] px-2 py-0.5 rounded-full">Aberto</span>
  if (status === 'em_andamento')
    return <span className="text-[11px] font-semibold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full">Em andamento</span>
  return <span className="text-[11px] font-semibold text-[#1A9E60] bg-[#D1FAE5] px-2 py-0.5 rounded-full">Resolvido</span>
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide">{label}</p>
      <p className="text-sm text-[#0D1F3C] font-medium mt-0.5">{value || '—'}</p>
    </div>
  )
}

export default function EspacoDetalheClient({ id }: { id: string }) {
  const router = useRouter()

  const espaco = mockEspacos.find(e => e.id === id)

  const [aba, setAba] = useState<Aba>('detalhes')
  const [avaliacoesItems] = useState(
    mockAvaliacoes.filter(a => a.espacoId === id),
  )
  const [statusMap, setStatusMap] = useState<Record<string, StatusProblema>>({})
  const [usuarios, setUsuarios] = useState<UsuarioMock[]>(mockUsuarios)
  const [modalUsuario, setModalUsuario] = useState<UsuarioMock | null>(null)
  const [notaModal, setNotaModal] = useState(5)
  const [comentarioModal, setComentarioModal] = useState('')
  const [hoveredStar, setHoveredStar] = useState(0)

  const reservasDaQuadra = mockReservas.filter(r => r.espacoId === id)
  const avaliacoesDaQuadra = avaliacoesItems.filter(a => a.tipo === 'avaliacao')
  const relatosDaQuadra = avaliacoesItems.filter(a => a.tipo === 'problema')

  const notaMedia =
    avaliacoesDaQuadra.length > 0
      ? avaliacoesDaQuadra.reduce((s, a) => s + (a as { nota: number }).nota, 0) / avaliacoesDaQuadra.length
      : null

  function alterarStatus(itemId: string, status: StatusProblema) {
    setStatusMap(prev => ({ ...prev, [itemId]: status }))
  }

  function abrirModalUsuario(u: UsuarioMock) {
    setModalUsuario(u)
    setNotaModal(5)
    setComentarioModal('')
    setHoveredStar(0)
  }

  function salvarAvaliacao() {
    if (!modalUsuario || !comentarioModal.trim()) return
    const novaAv: AvaliacaoUso = {
      id: `au-${Date.now()}`,
      reservaId: reservasDaQuadra.find(r => r.morador === modalUsuario.nome)?.id ?? 'avulso',
      espacoId: id,
      espacoNome: espaco?.nome ?? '',
      dataReserva: new Date().toISOString().split('T')[0],
      dataAvaliacao: new Date().toISOString().split('T')[0],
      nota: notaModal,
      comentario: comentarioModal.trim(),
      avaliador: 'João Mendonça',
    }
    setUsuarios(prev =>
      prev.map(u =>
        u.id === modalUsuario.id ? { ...u, avaliacoesUso: [...u.avaliacoesUso, novaAv] } : u,
      ),
    )
    setModalUsuario(null)
  }

  if (!espaco) {
    return (
      <div className="max-w-[1200px] py-10 text-center text-[#64748B]">
        <p>Espaço não encontrado.</p>
        <button onClick={() => router.back()} className="mt-4 text-sm text-[#2D5FA6] hover:underline">
          Voltar
        </button>
      </div>
    )
  }

  const abas: { key: Aba; label: string; count?: number }[] = [
    { key: 'detalhes', label: 'Detalhes' },
    { key: 'avaliacoes', label: 'Avaliações', count: avaliacoesDaQuadra.length },
    { key: 'relatos', label: 'Relatos', count: relatosDaQuadra.length },
    { key: 'avaliar-usuario', label: 'Avaliar Usuário', count: reservasDaQuadra.length },
  ]

  return (
    <div className="max-w-[900px] space-y-5">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#0D1F3C] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para Espaços
      </button>

      {/* Header */}
      <div className="bg-white rounded-[14px] shadow-card p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-[12px] bg-gradient-to-br from-[#2D5FA6] to-[#1B3A6B] flex items-center justify-center text-2xl shrink-0">
          🏅
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {espaco.nome}
          </h1>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="flex items-center gap-1 text-xs text-[#64748B]">
              <MapPin className="w-3.5 h-3.5" /> {espaco.bairro}
            </span>
            <span className="text-xs text-[#64748B]">{espaco.tipo}</span>
            {notaMedia !== null && (
              <span className="flex items-center gap-1 text-xs text-[#D97706] font-semibold">
                <Star className="w-3.5 h-3.5 fill-current" />
                {notaMedia.toFixed(1)}
              </span>
            )}
          </div>
        </div>
        <div>
          {espaco.status === 'ativo' ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1A9E60] bg-[#D1FAE5] px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A9E60]" /> Ativo
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#E53E3E] bg-[#FEE2E2] px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E53E3E]" /> Inativo
            </span>
          )}
        </div>
      </div>

      {/* Abas */}
      <div className="flex gap-1 bg-[#F4F7FB] rounded-[10px] p-1 overflow-x-auto">
        {abas.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setAba(key)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3 rounded-[8px] text-[11px] sm:text-xs font-medium transition-colors whitespace-nowrap ${
              aba === key ? 'bg-white text-[#0D1F3C] shadow-sm' : 'text-[#64748B] hover:text-[#0D1F3C]'
            }`}
          >
            {label}
            {count !== undefined && count > 0 && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${aba === key ? 'bg-[#E6F0FF] text-[#1B3A6B]' : 'bg-[#E5E7EB] text-[#64748B]'}`}>
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Detalhes */}
      {aba === 'detalhes' && (
        <div className="bg-white rounded-[14px] shadow-card p-5 space-y-4">
          <h2 className="text-sm font-bold text-[#0D1F3C]">Informações do espaço</h2>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Nome" value={espaco.nome} />
            <InfoItem label="Bairro" value={espaco.bairro} />
            <InfoItem label="Tipo" value={espaco.tipo} />
            <InfoItem label="Modalidades" value={espaco.modalidades.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')} />
            <InfoItem label="Status" value={espaco.status === 'ativo' ? 'Ativo' : 'Inativo'} />
            <InfoItem label="Total de reservas" value={String(reservasDaQuadra.length)} />
          </div>
          {reservasDaQuadra.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3 mt-2">Reservas recentes</h3>
              <div className="space-y-2">
                {reservasDaQuadra.slice(0, 5).map(r => (
                  <div key={r.id} className="flex items-center justify-between bg-[#F8FAFC] rounded-[8px] px-3 py-2">
                    <div>
                      <p className="text-sm font-medium text-[#0D1F3C]">{r.morador}</p>
                      <p className="text-xs text-[#64748B]">{r.data} · {r.horaInicio}–{r.horaFim}</p>
                    </div>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      r.tipo === 'escola' ? 'bg-[#E6F0FF] text-[#1B3A6B]' :
                      r.tipo === 'idosos' ? 'bg-[#FEF3C7] text-[#D97706]' :
                      'bg-[#F3F4F6] text-[#6B7280]'
                    }`}>
                      {r.tipo === 'escola' ? 'Escola' : r.tipo === 'idosos' ? 'Idosos' : 'Comum'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Avaliações */}
      {aba === 'avaliacoes' && (
        <div className="space-y-3">
          {avaliacoesDaQuadra.length === 0 ? (
            <div className="bg-white rounded-[14px] shadow-card p-10 text-center text-[#9CA3AF]">
              <Star className="w-8 h-8 mx-auto mb-2 text-[#E5E7EB]" />
              <p className="text-sm">Nenhuma avaliação para este espaço.</p>
            </div>
          ) : avaliacoesDaQuadra.map(item => {
            const av = item as typeof item & { nota: number; comentario: string }
            return (
              <div key={item.id} className="bg-white rounded-[12px] shadow-card p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <div className="w-7 h-7 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white text-[11px] font-bold">
                    {item.autor.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <span className="font-medium text-sm text-[#111827]">{item.autor}</span>
                  <span className="text-xs text-[#9CA3AF]">· {item.data}</span>
                </div>
                <EstrelaRow nota={av.nota} />
                <p className="text-sm text-[#374151] mt-2">{av.comentario}</p>
              </div>
            )
          })}
        </div>
      )}

      {/* Relatos */}
      {aba === 'relatos' && (
        <div className="space-y-3">
          {relatosDaQuadra.length === 0 ? (
            <div className="bg-white rounded-[14px] shadow-card p-10 text-center text-[#9CA3AF]">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-[#E5E7EB]" />
              <p className="text-sm">Nenhum relato de problema para este espaço.</p>
            </div>
          ) : relatosDaQuadra.map(item => {
            const prob = item as typeof item & { descricao?: string; status?: StatusProblema }
            const statusAtual = statusMap[item.id] ?? prob.status ?? 'aberto'
            return (
              <div key={item.id} className="bg-white rounded-[12px] shadow-card p-4">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-full shrink-0 mt-0.5">
                    <AlertTriangle className="w-3 h-3" /> PROBLEMA
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-sm text-[#111827]">{item.autor}</span>
                      <span className="text-xs text-[#9CA3AF]">· {item.data}</span>
                    </div>
                    <p className="text-sm text-[#374151]">{prob.descricao}</p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <StatusBadge status={statusAtual} />
                      <div className="flex gap-1">
                        <button
                          onClick={() => alterarStatus(item.id, 'em_andamento')}
                          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            statusAtual === 'em_andamento'
                              ? 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]'
                              : 'text-[#64748B] border-[#E5E7EB] hover:border-[#D97706] hover:text-[#D97706]'
                          }`}
                        >
                          <Clock className="w-3 h-3" /> Em andamento
                        </button>
                        <button
                          onClick={() => alterarStatus(item.id, 'resolvido')}
                          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors ${
                            statusAtual === 'resolvido'
                              ? 'bg-[#D1FAE5] text-[#1A9E60] border-[#1A9E60]'
                              : 'text-[#64748B] border-[#E5E7EB] hover:border-[#1A9E60] hover:text-[#1A9E60]'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" /> Resolvido
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Avaliar Usuário */}
      {aba === 'avaliar-usuario' && (
        <div className="space-y-3">
          <div className="bg-[#E6F0FF] rounded-[12px] p-3 flex items-start gap-2">
            <Users className="w-4 h-4 text-[#2D5FA6] shrink-0 mt-0.5" />
            <p className="text-xs text-[#1B3A6B]">
              Avalie como cada usuário utilizou este espaço. As avaliações impactam a pontuação do perfil do cidadão.
            </p>
          </div>
          {usuarios.map(u => {
            const pontuacao = calcularPontuacao(u.avaliacoesUso)
            const cls = classificarPerfil(pontuacao)
            const avsDesteEspaco = u.avaliacoesUso.filter(a => a.espacoId === id)
            const notaMediaU =
              u.avaliacoesUso.length > 0
                ? u.avaliacoesUso.reduce((s, a) => s + a.nota, 0) / u.avaliacoesUso.length
                : null
            return (
              <div key={u.id} className="bg-white rounded-[12px] shadow-card p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: cls.color }}>
                  {u.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0D1F3C]">{u.nome}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: cls.bg, color: cls.color }}>
                      {cls.label}
                    </span>
                    <span className="text-xs text-[#64748B]">{pontuacao} pts</span>
                    {notaMediaU !== null && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#D97706] fill-current" />
                        <span className="text-xs text-[#9CA3AF]">{notaMediaU.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                  {avsDesteEspaco.length > 0 && (
                    <p className="text-[11px] text-[#9CA3AF] mt-1">{avsDesteEspaco.length} avaliação(ões) neste espaço</p>
                  )}
                </div>
                <button
                  onClick={() => abrirModalUsuario(u)}
                  className="flex items-center gap-1.5 text-xs text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] px-3 py-1.5 rounded-[8px] transition-colors shrink-0"
                >
                  <Star className="w-3.5 h-3.5" /> Avaliar
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      {modalUsuario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-[16px] shadow-xl w-full max-w-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F1F5F9]">
              <div>
                <p className="font-bold text-[#0D1F3C] text-sm">Avaliar uso da quadra</p>
                <p className="text-xs text-[#64748B]">{modalUsuario.nome} · {espaco.nome}</p>
              </div>
              <button onClick={() => setModalUsuario(null)} className="p-1.5 rounded-full hover:bg-[#F1F5F9] text-[#9CA3AF] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-5 py-5 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#374151] mb-2">Nota de uso</p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button key={i} onMouseEnter={() => setHoveredStar(i + 1)} onMouseLeave={() => setHoveredStar(0)} onClick={() => setNotaModal(i + 1)} className="p-0.5">
                      <Star className={`w-7 h-7 transition-colors ${i < (hoveredStar || notaModal) ? 'text-[#D97706] fill-current' : 'text-[#E5E7EB] fill-current'}`} />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#9CA3AF] mt-1">
                  {notaModal === 5 ? 'Excelente' : notaModal === 4 ? 'Bom' : notaModal === 3 ? 'Regular' : notaModal === 2 ? 'Ruim' : 'Muito ruim'}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#374151] mb-1.5">Observação</p>
                <textarea value={comentarioModal} onChange={e => setComentarioModal(e.target.value)} placeholder="Descreva como o usuário deixou o espaço..." rows={3} className="w-full text-sm text-[#374151] border border-[#E5E7EB] rounded-[10px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D5FA6] resize-none" />
              </div>
              <div className="bg-[#F8FAFC] rounded-[10px] p-3 flex items-center gap-2">
                {notaModal >= 4 ? <CheckCircle2 className="w-4 h-4 text-[#1A9E60] shrink-0" /> : <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0" />}
                <p className="text-xs text-[#374151]">
                  {notaModal === 5 ? 'Sem impacto na pontuação (uso perfeito)' : notaModal === 4 ? 'Reduz 5 pontos do usuário' : notaModal === 3 ? 'Reduz 15 pontos do usuário' : notaModal === 2 ? 'Reduz 25 pontos do usuário' : 'Reduz 40 pontos do usuário'}
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 flex gap-2">
              <button onClick={() => setModalUsuario(null)} className="flex-1 py-2 text-sm font-medium text-[#374151] border border-[#E5E7EB] rounded-[10px] hover:bg-[#F9FAFB] transition-colors">Cancelar</button>
              <button onClick={salvarAvaliacao} disabled={!comentarioModal.trim()} className="flex-1 py-2 text-sm font-semibold text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] rounded-[10px] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Salvar avaliação</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
