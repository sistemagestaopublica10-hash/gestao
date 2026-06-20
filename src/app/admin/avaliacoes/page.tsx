'use client'

import { useState, useMemo } from 'react'
import { Star, AlertTriangle, Eye, EyeOff, CheckCircle2, Clock } from 'lucide-react'
import { mockAvaliacoes } from '@/lib/mock-data'
import { mockEspacos } from '@/lib/mock-data'

type StatusProblema = 'aberto' | 'em_andamento' | 'resolvido'

type ItemBase = { id: string; tipo: 'avaliacao' | 'problema'; espacoId: string; espacoNome: string; autor: string; data: string; foto: null; visivel: boolean }
type ItemAv = ItemBase & { tipo: 'avaliacao'; nota: number; comentario: string }
type ItemProb = ItemBase & { tipo: 'problema'; descricao: string; status: StatusProblema }
type Item = ItemAv | ItemProb

export default function AvaliacoesPage() {
  const [items, setItems] = useState<Item[]>(mockAvaliacoes as Item[])
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'avaliacao' | 'problema'>('todos')
  const [filtroEspaco, setFiltroEspaco] = useState('')
  const [ordenacao, setOrdenacao] = useState<'recentes' | 'nota_baixa'>('recentes')
  const [abaOcultados, setAbaOcultados] = useState(false)

  function alterarStatus(id: string, status: StatusProblema) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status } as Item : i))
  }

  function toggleVisivel(id: string) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, visivel: !i.visivel } : i))
  }

  const { visiveis, ocultados } = useMemo(() => {
    const v = items.filter(i => i.visivel)
    const o = items.filter(i => !i.visivel)
    return { visiveis: v, ocultados: o }
  }, [items])

  const filtrados = useMemo(() => {
    let list = abaOcultados ? ocultados : visiveis
    if (filtroTipo !== 'todos') list = list.filter(i => i.tipo === filtroTipo)
    if (filtroEspaco) list = list.filter(i => i.espacoId === filtroEspaco)
    list = [...list].sort((a, b) => {
      if (ordenacao === 'recentes') return b.data.localeCompare(a.data)
      // nota_baixa: problemas primeiro (sem nota), depois por nota asc
      const na = 'nota' in a ? (a.nota ?? 0) : 0
      const nb = 'nota' in b ? (b.nota ?? 0) : 0
      return na - nb
    })
    return list
  }, [visiveis, ocultados, abaOcultados, filtroTipo, filtroEspaco, ordenacao])

  // KPIs
  const totalAvaliacoes = items.filter(i => i.tipo === 'avaliacao').length
  const relatosAbertos = items.filter(i => i.tipo === 'problema' && i.status === 'aberto').length
  const resolvidos = items.filter(i => i.tipo === 'problema' && i.status === 'resolvido').length

  return (
    <div className="max-w-[1200px] space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Avaliações e Relatos
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Moderação e gestão de relatos dos moradores</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard
          label="Total de avaliações"
          value={totalAvaliacoes}
          icon={<Star className="w-5 h-5 text-[#D97706]" />}
          bg="#FEF3C7"
        />
        <KpiCard
          label="Relatos abertos"
          value={relatosAbertos}
          icon={<AlertTriangle className="w-5 h-5 text-[#E53E3E]" />}
          bg="#FEE2E2"
        />
        <KpiCard
          label="Resolvidos"
          value={resolvidos}
          icon={<CheckCircle2 className="w-5 h-5 text-[#1A9E60]" />}
          bg="#D1FAE5"
        />
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-[12px] shadow-card p-4 flex flex-wrap items-start sm:items-center gap-3">
        {/* Abas ativos/ocultados */}
        <div className="flex rounded-[8px] border border-[#E5E7EB] overflow-hidden">
          <button
            onClick={() => setAbaOcultados(false)}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${!abaOcultados ? 'bg-[#1B3A6B] text-white' : 'text-[#374151] hover:bg-[#F4F7FB]'}`}
          >
            Ativos ({visiveis.length})
          </button>
          <button
            onClick={() => setAbaOcultados(true)}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${abaOcultados ? 'bg-[#1B3A6B] text-white' : 'text-[#374151] hover:bg-[#F4F7FB]'}`}
          >
            Ocultados ({ocultados.length})
          </button>
        </div>

        {/* Tipo */}
        <div className="flex rounded-[8px] border border-[#E5E7EB] overflow-hidden">
          {([['todos', 'Todos'], ['avaliacao', 'Avaliações'], ['problema', 'Problemas']] as const).map(([v, l]) => (
            <button
              key={v}
              onClick={() => setFiltroTipo(v)}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${filtroTipo === v ? 'bg-[#E6F0FF] text-[#1B3A6B]' : 'text-[#374151] hover:bg-[#F4F7FB]'}`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Espaço */}
        <select
          value={filtroEspaco}
          onChange={e => setFiltroEspaco(e.target.value)}
          className="border border-[#E5E7EB] rounded-[8px] px-3 py-1.5 text-xs text-[#374151] bg-white focus:outline-none"
        >
          <option value="">Todos os espaços</option>
          {mockEspacos.map(e => <option key={e.id} value={e.id}>{e.nome}</option>)}
        </select>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-[#64748B]">Ordenar:</span>
          <select
            value={ordenacao}
            onChange={e => setOrdenacao(e.target.value as 'recentes' | 'nota_baixa')}
            className="border border-[#E5E7EB] rounded-[8px] px-3 py-1.5 text-xs text-[#374151] bg-white focus:outline-none"
          >
            <option value="recentes">Mais recentes</option>
            <option value="nota_baixa">Nota mais baixa</option>
          </select>
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {filtrados.length === 0 ? (
          <div className="bg-white rounded-[12px] shadow-card p-10 text-center text-[#9CA3AF]">
            <p className="text-2xl mb-2">🔍</p>
            <p className="text-sm">Nenhum item para este filtro</p>
          </div>
        ) : filtrados.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            onAlterarStatus={alterarStatus}
            onToggleVisivel={toggleVisivel}
          />
        ))}
      </div>
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

function ItemCard({
  item,
  onAlterarStatus,
  onToggleVisivel,
}: {
  item: Item
  onAlterarStatus: (id: string, s: StatusProblema) => void
  onToggleVisivel: (id: string) => void
}) {
  const isAv = item.tipo === 'avaliacao'
  const nota = isAv ? (item as Extract<Item, { tipo: 'avaliacao' }>).nota : null
  const comentario = isAv ? (item as Extract<Item, { tipo: 'avaliacao' }>).comentario : null
  const descricao = !isAv ? (item as Extract<Item, { tipo: 'problema' }>).descricao : null
  const status = !isAv ? (item as Extract<Item, { tipo: 'problema' }>).status : null

  return (
    <div className="bg-white rounded-[12px] shadow-card p-4 flex flex-col sm:flex-row gap-3">
      {/* Badge tipo */}
      <div className="shrink-0">
        {isAv ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A9E60] bg-[#D1FAE5] px-2.5 py-1 rounded-full">
            <Star className="w-3 h-3 fill-current" />
            AVALIAÇÃO
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-full">
            <AlertTriangle className="w-3 h-3" />
            PROBLEMA
          </span>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="font-medium text-sm text-[#111827]">{item.autor}</span>
          <span className="text-xs text-[#9CA3AF]">·</span>
          <span className="text-xs text-[#9CA3AF]">{item.espacoNome}</span>
          <span className="text-xs text-[#9CA3AF]">·</span>
          <span className="text-xs text-[#9CA3AF]">{item.data}</span>
        </div>

        {isAv && nota !== null && (
          <div className="flex gap-0.5 mb-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < nota ? 'text-[#D97706] fill-current' : 'text-[#E5E7EB] fill-current'}`}
              />
            ))}
          </div>
        )}

        <p className="text-sm text-[#374151] line-clamp-2">{comentario ?? descricao}</p>

        {/* Status problema */}
        {!isAv && status && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <StatusBadge status={status} />
            <div className="flex gap-1">
              <button
                onClick={() => onAlterarStatus(item.id, 'em_andamento')}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  status === 'em_andamento'
                    ? 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]'
                    : 'text-[#64748B] border-[#E5E7EB] hover:border-[#D97706] hover:text-[#D97706]'
                }`}
              >
                <Clock className="w-3 h-3" />
                Em andamento
              </button>
              <button
                onClick={() => onAlterarStatus(item.id, 'resolvido')}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors ${
                  status === 'resolvido'
                    ? 'bg-[#D1FAE5] text-[#1A9E60] border-[#1A9E60]'
                    : 'text-[#64748B] border-[#E5E7EB] hover:border-[#1A9E60] hover:text-[#1A9E60]'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                Resolvido
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="shrink-0 self-start">
        <button
          onClick={() => onToggleVisivel(item.id)}
          title={item.visivel ? 'Ocultar' : 'Mostrar'}
          className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0D1F3C] px-2.5 py-1.5 rounded-[6px] hover:bg-[#F4F7FB] transition-colors"
        >
          {item.visivel ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {item.visivel ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: StatusProblema }) {
  if (status === 'aberto') return (
    <span className="text-[11px] font-semibold text-[#E53E3E] bg-[#FEE2E2] px-2 py-0.5 rounded-full">Aberto</span>
  )
  if (status === 'em_andamento') return (
    <span className="text-[11px] font-semibold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full">Em andamento</span>
  )
  return (
    <span className="text-[11px] font-semibold text-[#1A9E60] bg-[#D1FAE5] px-2 py-0.5 rounded-full">Resolvido</span>
  )
}
