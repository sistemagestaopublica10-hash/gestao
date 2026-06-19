'use client'

import { useState } from 'react'
import { X, ImagePlus } from 'lucide-react'
import StarRatingInput from '@/components/portal/shared/StarRatingInput'

interface Props {
  espacoNome: string
  reservaInfo?: string
  onClose: () => void
  onSubmit: (data: { nota: number; comentario: string }) => void
}

export default function ModalAvaliar({ espacoNome, reservaInfo, onClose, onSubmit }: Props) {
  const [nota, setNota] = useState(0)
  const [comentario, setComentario] = useState('')
  const [fotoNome, setFotoNome] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const podeEnviar = nota > 0 && !enviando

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!podeEnviar) return
    setEnviando(true)
    await new Promise(r => setTimeout(r, 800))
    setEnviado(true)
    setTimeout(() => {
      onSubmit({ nota, comentario })
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full sm:max-w-md bg-white rounded-t-[20px] sm:rounded-[16px] shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-[#E5E7EB]">
          <div>
            <h2 className="font-semibold text-[#111827] text-base" style={{ fontFamily: 'var(--font-sans)' }}>
              Avaliar: {espacoNome}
            </h2>
            {reservaInfo && (
              <p className="text-xs text-[#9CA3AF] mt-0.5">Reserva: {reservaInfo}</p>
            )}
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
            <div className="text-4xl">🎉</div>
            <p className="font-semibold text-[#111827]">Avaliação publicada!</p>
            <p className="text-sm text-[#9CA3AF]">Obrigado por contribuir.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-5">
            {/* Estrelas */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#374151]">Como foi?</label>
              <StarRatingInput value={nota} onChange={setNota} />
              {nota === 0 && (
                <p className="text-xs text-[#9CA3AF]">Toque em uma estrela para avaliar</p>
              )}
            </div>

            {/* Comentário */}
            <div className="space-y-1.5">
              <label htmlFor="comentario" className="text-sm font-medium text-[#374151]">
                Comentário <span className="text-[#9CA3AF] font-normal">(opcional)</span>
              </label>
              <textarea
                id="comentario"
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                placeholder="Conte como foi sua experiência..."
                rows={3}
                className="w-full text-sm border border-[#E5E7EB] rounded-[10px] px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-[#2D5FA6] text-[#374151] placeholder:text-[#9CA3AF]"
              />
            </div>

            {/* Foto */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#374151]">
                Foto <span className="text-[#9CA3AF] font-normal">(opcional)</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-[#2D5FA6] border border-dashed border-[#2D5FA6] rounded-[10px] px-3 py-2.5 cursor-pointer hover:bg-[#E6F0FF] transition-colors">
                <ImagePlus className="w-4 h-4" />
                {fotoNome ? fotoNome : 'Adicionar foto'}
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={e => setFotoNome(e.target.files?.[0]?.name ?? null)}
                />
              </label>
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
                disabled={!podeEnviar}
                className="flex-1 py-2.5 text-sm font-medium text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF] rounded-[10px] transition-colors"
              >
                {enviando ? 'Publicando...' : 'Publicar avaliação'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
