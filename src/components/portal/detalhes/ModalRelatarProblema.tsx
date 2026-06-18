'use client'

import { useState } from 'react'
import { X, ImagePlus, AlertCircle } from 'lucide-react'

interface Props {
  espacoNome: string
  onClose: () => void
  onSubmit: (data: { nome: string; descricao: string }) => void
}

export default function ModalRelatarProblema({ espacoNome, onClose, onSubmit }: Props) {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [fotoNome, setFotoNome] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erros, setErros] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!nome.trim()) e.nome = 'Informe seu nome'
    if (!descricao.trim()) e.descricao = 'Descreva o problema'
    if (!fotoNome) e.foto = 'A foto é obrigatória para o relato'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errsFound = validate()
    if (Object.keys(errsFound).length) { setErros(errsFound); return }
    setErros({})
    setEnviando(true)
    await new Promise(r => setTimeout(r, 800))
    setEnviado(true)
    setTimeout(() => {
      onSubmit({ nome, descricao })
      onClose()
    }, 1400)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full sm:max-w-md bg-white rounded-t-[20px] sm:rounded-[16px] shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-[#E5E7EB]">
          <div>
            <h2 className="font-semibold text-[#111827] text-base" style={{ fontFamily: 'Syne, sans-serif' }}>
              Relatar problema
            </h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">{espacoNome}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="p-1.5 rounded-full hover:bg-[#F3F4F6] transition-colors text-[#9CA3AF]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {enviado ? (
          <div className="p-10 text-center space-y-3">
            <div className="text-4xl">📋</div>
            <p className="font-semibold text-[#111827]">Relato enviado!</p>
            <p className="text-sm text-[#9CA3AF]">A prefeitura foi notificada e irá verificar.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Nome */}
            <div className="space-y-1.5">
              <label htmlFor="rel-nome" className="text-sm font-medium text-[#374151]">
                Seu nome <span className="text-[#E53E3E]">*</span>
              </label>
              <input
                id="rel-nome"
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Ex: João Silva"
                className={`w-full text-sm border rounded-[10px] px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D5FA6] text-[#374151] placeholder:text-[#9CA3AF] ${erros.nome ? 'border-[#E53E3E]' : 'border-[#E5E7EB]'}`}
              />
              {erros.nome && <p className="text-xs text-[#E53E3E] flex items-center gap-1"><AlertCircle className="w-3 h-3" />{erros.nome}</p>}
            </div>

            {/* Descrição */}
            <div className="space-y-1.5">
              <label htmlFor="rel-desc" className="text-sm font-medium text-[#374151]">
                O que está errado? <span className="text-[#E53E3E]">*</span>
              </label>
              <textarea
                id="rel-desc"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                placeholder="Descreva o problema brevemente..."
                rows={3}
                className={`w-full text-sm border rounded-[10px] px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-[#2D5FA6] text-[#374151] placeholder:text-[#9CA3AF] ${erros.descricao ? 'border-[#E53E3E]' : 'border-[#E5E7EB]'}`}
              />
              {erros.descricao && <p className="text-xs text-[#E53E3E] flex items-center gap-1"><AlertCircle className="w-3 h-3" />{erros.descricao}</p>}
            </div>

            {/* Foto obrigatória */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#374151]">
                Foto do problema <span className="text-[#E53E3E]">*</span>
                <span className="text-[#9CA3AF] font-normal ml-1">— importante para a prefeitura</span>
              </label>
              <label className={`flex items-center gap-2 text-sm border border-dashed rounded-[10px] px-3 py-2.5 cursor-pointer transition-colors ${
                erros.foto
                  ? 'border-[#E53E3E] text-[#E53E3E] bg-[#FEF2F2]'
                  : fotoNome
                  ? 'border-[#1A9E60] text-[#1A9E60] bg-[#F0FDF4]'
                  : 'border-[#2D5FA6] text-[#2D5FA6] hover:bg-[#E6F0FF]'
              }`}>
                <ImagePlus className="w-4 h-4 shrink-0" />
                {fotoNome ? fotoNome : 'Adicionar foto'}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={e => {
                    setFotoNome(e.target.files?.[0]?.name ?? null)
                    setErros(prev => { const n = { ...prev }; delete n.foto; return n })
                  }}
                />
              </label>
              {erros.foto && <p className="text-xs text-[#E53E3E] flex items-center gap-1"><AlertCircle className="w-3 h-3" />{erros.foto}</p>}
            </div>

            {/* Ações */}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 text-sm font-medium text-[#374151] border border-[#E5E7EB] rounded-[10px] hover:bg-[#F9FAFB] transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={enviando}
                className="flex-1 py-2.5 text-sm font-medium text-white bg-[#D97706] hover:bg-[#B45309] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] rounded-[10px] transition-colors"
              >
                {enviando ? 'Enviando...' : 'Enviar relato'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
