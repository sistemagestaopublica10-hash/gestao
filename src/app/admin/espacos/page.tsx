'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, MoreVertical, Pencil, PowerOff, X, Check, ChevronRight } from 'lucide-react'
import { mockEspacos } from '@/lib/mock-data'

type Espaco = typeof mockEspacos[number]

const TIPOS = ['Quadra de Tênis', 'Quadra Poliesportiva', 'Campo de Futebol', 'Quadra de Vôlei']
const MODALIDADES_OPTIONS = ['Tênis', 'Futsal', 'Basquete', 'Vôlei', 'Futebol', 'Vôlei de Areia', 'Handebol']
const PRIORIDADES = ['Livre', 'Idosos', 'Escolinhas', 'PcD', 'Projetos Sociais']

const TIPO_COLORS: Record<string, string> = {
  'Quadra de Tênis':     'linear-gradient(135deg, #2D5FA6, #1B3A6B)',
  'Quadra Poliesportiva':'linear-gradient(135deg, #1A9E60, #065f3c)',
  'Campo de Futebol':    'linear-gradient(135deg, #D97706, #92400e)',
  'Quadra de Vôlei':    'linear-gradient(135deg, #7C3AED, #4C1D95)',
}

const TIPO_ICON: Record<string, string> = {
  'Quadra de Tênis':     '🎾',
  'Quadra Poliesportiva':'🏀',
  'Campo de Futebol':    '⚽',
  'Quadra de Vôlei':   '🏐',
}

function SheetEspaco({
  open,
  espaco,
  onClose,
  onSave,
}: {
  open: boolean
  espaco: Espaco | null
  onClose: () => void
  onSave: (e: Espaco) => void
}) {
  const [nome, setNome] = useState(espaco?.nome ?? '')
  const [endereco, setEndereco] = useState('')
  const [bairro, setBairro] = useState(espaco?.bairro ?? '')
  const [tipo, setTipo] = useState(espaco?.tipo ?? TIPOS[0])
  const [modalidades, setModalidades] = useState<string[]>(espaco?.modalidades?.map(m => m.charAt(0).toUpperCase() + m.slice(1)) ?? [])
  const [status, setStatus] = useState<'ativo' | 'inativo'>(espaco?.status as 'ativo' | 'inativo' ?? 'ativo')
  const [faixas, setFaixas] = useState([
    { faixa: 'Manhã (07–12h)', prioridade: 'Livre' },
    { faixa: 'Tarde (12–18h)', prioridade: 'Livre' },
    { faixa: 'Noite (18–22h)', prioridade: 'Livre' },
  ])

  function toggleMod(m: string) {
    setModalidades(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  }

  function handleSave() {
    onSave({
      id: espaco?.id ?? String(Date.now()),
      nome,
      bairro,
      tipo,
      modalidades: modalidades.map(m => m.toLowerCase()),
      status,
      foto: null,
    })
    onClose()
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
      <aside className="fixed inset-y-0 right-0 z-50 w-[420px] bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
          <h2 className="font-bold text-[#0D1F3C] text-base" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {espaco ? 'Editar espaço' : 'Novo espaço'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[#F3F4F6] text-[#64748B]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <Field label="Nome do espaço">
            <input
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex: Quadra Central de Tênis"
              className="w-full border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40"
            />
          </Field>

          <Field label="Endereço">
            <input
              value={endereco}
              onChange={e => setEndereco(e.target.value)}
              placeholder="Rua, número"
              className="w-full border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40"
            />
          </Field>

          <Field label="Bairro">
            <input
              value={bairro}
              onChange={e => setBairro(e.target.value)}
              placeholder="Ex: Centro"
              className="w-full border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40"
            />
          </Field>

          <Field label="Tipo">
            <select
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              className="w-full border border-[#E5E7EB] rounded-[8px] px-3 py-2 text-sm text-[#111827] bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5FA6]/40"
            >
              {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>

          <Field label="Modalidades">
            <div className="flex flex-wrap gap-2">
              {MODALIDADES_OPTIONS.map(m => {
                const sel = modalidades.includes(m)
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => toggleMod(m)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      sel
                        ? 'bg-[#1B3A6B] text-white border-[#1B3A6B]'
                        : 'bg-white text-[#374151] border-[#E5E7EB] hover:border-[#1B3A6B]'
                    }`}
                  >
                    {sel && <Check className="w-3 h-3 inline mr-1" />}
                    {m}
                  </button>
                )
              })}
            </div>
          </Field>

          <Field label="Upload de foto">
            <div className="border-2 border-dashed border-[#E5E7EB] rounded-[8px] p-6 text-center cursor-pointer hover:border-[#2D5FA6] transition-colors">
              <p className="text-sm text-[#9CA3AF]">📷 Clique para selecionar imagem</p>
              <p className="text-xs text-[#9CA3AF] mt-1">PNG, JPG — máx 4MB</p>
            </div>
          </Field>

          <Field label="Status">
            <div className="flex gap-3">
              {(['ativo', 'inativo'] as const).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-2 rounded-[8px] text-sm font-medium border transition-colors ${
                    status === s
                      ? s === 'ativo'
                        ? 'bg-[#D1FAE5] text-[#1A9E60] border-[#1A9E60]'
                        : 'bg-[#FEE2E2] text-[#E53E3E] border-[#E53E3E]'
                      : 'bg-white text-[#9CA3AF] border-[#E5E7EB] hover:border-[#9CA3AF]'
                  }`}
                >
                  {s === 'ativo' ? '✓ Ativo' : '✕ Inativo'}
                </button>
              ))}
            </div>
          </Field>

          <div>
            <p className="text-xs font-semibold text-[#0D1F3C] uppercase tracking-wider mb-3">
              Regras de Horário
            </p>
            <div className="space-y-2">
              {faixas.map((f, i) => (
                <div key={f.faixa} className="flex items-center gap-3 bg-[#F4F7FB] rounded-[8px] px-3 py-2">
                  <span className="text-xs text-[#374151] w-36 shrink-0">{f.faixa}</span>
                  <select
                    value={f.prioridade}
                    onChange={e => {
                      const next = [...faixas]
                      next[i] = { ...next[i], prioridade: e.target.value }
                      setFaixas(next)
                    }}
                    className="flex-1 text-xs border border-[#E5E7EB] rounded-[6px] px-2 py-1.5 bg-white text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#2D5FA6]/40"
                  >
                    {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#E5E7EB] px-5 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-medium text-[#374151] border border-[#E5E7EB] rounded-[8px] hover:bg-[#F3F4F6] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 text-sm font-medium text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] rounded-[8px] transition-colors"
          >
            {espaco ? 'Salvar alterações' : 'Criar espaço'}
          </button>
        </div>
      </aside>
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#374151] mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function MenuEspaco({ onEditar, onDesativar }: { onEditar: () => void; onDesativar: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="p-1.5 rounded-md text-[#64748B] hover:bg-[#F3F4F6] transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 bg-white rounded-[10px] shadow-card-hover border border-[#E5E7EB] py-1 w-36">
            <button
              onClick={() => { setOpen(false); onEditar() }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#374151] hover:bg-[#F4F7FB]"
            >
              <Pencil className="w-3.5 h-3.5" /> Editar
            </button>
            <button
              onClick={() => { setOpen(false); onDesativar() }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-[#E53E3E] hover:bg-[#FEE2E2]"
            >
              <PowerOff className="w-3.5 h-3.5" /> Desativar
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function EspacosPage() {
  const router = useRouter()
  const [espacos, setEspacos] = useState(mockEspacos)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editando, setEditando] = useState<Espaco | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  function abrirNovo() {
    setEditando(null)
    setSheetOpen(true)
  }

  function abrirEditar(e: Espaco) {
    setEditando(e)
    setSheetOpen(true)
  }

  function salvar(e: Espaco) {
    setEspacos(prev => {
      const idx = prev.findIndex(x => x.id === e.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = e
        return next
      }
      return [...prev, e]
    })
  }

  function desativar(id: string) {
    setEspacos(prev => prev.map(e => e.id === id ? { ...e, status: 'inativo' } : e))
    setConfirmId(null)
  }

  return (
    <div className="max-w-[1200px] space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Espaços Esportivos
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">{espacos.length} espaços cadastrados</p>
        </div>
        <button
          onClick={abrirNovo}
          className="flex items-center gap-2 bg-[#1B3A6B] hover:bg-[#2D5FA6] text-white text-sm font-medium px-4 py-2.5 rounded-[10px] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo espaço
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[12px] shadow-card overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-[#F1F5F9]">
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider w-[52px]">Foto</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Nome</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Bairro</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden md:table-cell">Tipo</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider hidden lg:table-cell">Modalidades</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 w-16" />
            </tr>
          </thead>
          <tbody>
            {espacos.map(e => (
              <tr key={e.id} className="border-b border-[#F8FAFC] hover:bg-[#F8FAFC] transition-colors group">
                <td className="px-4 py-3">
                  <div
                    className="w-10 h-10 rounded-[8px] flex items-center justify-center text-lg shrink-0"
                    style={{ background: TIPO_COLORS[e.tipo] ?? 'linear-gradient(135deg, #64748B, #374151)' }}
                  >
                    <span>{TIPO_ICON[e.tipo] ?? '🏅'}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => router.push(`/admin/espacos/${e.id}`)}
                    className="font-medium text-[#111827] hover:text-[#2D5FA6] hover:underline text-left"
                  >
                    {e.nome}
                  </button>
                </td>
                <td className="px-4 py-3 text-[#64748B]">{e.bairro}</td>
                <td className="px-4 py-3 text-[#64748B] hidden md:table-cell">{e.tipo}</td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {e.modalidades.map(m => (
                      <span key={m} className="text-[11px] bg-[#E6F0FF] text-[#1B3A6B] px-2 py-0.5 rounded-full capitalize">
                        {m}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {e.status === 'ativo' ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1A9E60] bg-[#D1FAE5] px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A9E60]" />
                      Ativo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#E53E3E] bg-[#FEE2E2] px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E53E3E]" />
                      Inativo
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => router.push(`/admin/espacos/${e.id}`)}
                      className="p-1.5 rounded-md text-[#64748B] hover:bg-[#E6F0FF] hover:text-[#1B3A6B] transition-colors opacity-0 group-hover:opacity-100"
                      title="Ver detalhes"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <MenuEspaco
                      onEditar={() => abrirEditar(e)}
                      onDesativar={() => setConfirmId(e.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Sheet */}
      <SheetEspaco
        open={sheetOpen}
        espaco={editando}
        onClose={() => setSheetOpen(false)}
        onSave={salvar}
      />

      {/* Confirm modal */}
      {confirmId && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setConfirmId(null)} />
          <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[14px] shadow-card-hover p-6 w-80">
            <h3 className="font-bold text-[#0D1F3C] mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Desativar espaço?
            </h3>
            <p className="text-sm text-[#64748B] mb-5">
              Reservas existentes não serão canceladas. O espaço ficará invisível no portal.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 py-2 text-sm border border-[#E5E7EB] rounded-[8px] hover:bg-[#F3F4F6] text-[#374151]"
              >
                Cancelar
              </button>
              <button
                onClick={() => desativar(confirmId)}
                className="flex-1 py-2 text-sm bg-[#E53E3E] text-white rounded-[8px] hover:bg-[#C53030]"
              >
                Desativar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
