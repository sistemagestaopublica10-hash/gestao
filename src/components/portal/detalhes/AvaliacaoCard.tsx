import { Star } from 'lucide-react'
import BadgeAvaliacao from '@/components/portal/shared/BadgeAvaliacao'

interface Props {
  autor: string
  nota: number
  comentario: string
  data: string
  foto: string | null
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffDays === 0) return 'hoje'
  if (diffDays === 1) return 'há 1 dia'
  if (diffDays < 30) return `há ${diffDays} dias`
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export default function AvaliacaoCard({ autor, nota, comentario, data, foto }: Props) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-4 space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1.5">
          <BadgeAvaliacao />
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < nota ? 'fill-[#D97706] text-[#D97706]' : 'text-[#E5E7EB]'}`}
              />
            ))}
          </div>
        </div>
        <span className="text-xs text-[#9CA3AF] shrink-0">{formatDate(data)}</span>
      </div>

      <div className="flex items-start gap-3">
        {foto && (
          <img
            src={foto}
            alt="Foto da avaliação"
            className="w-16 h-16 rounded-[6px] object-cover shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#374151]">{autor}</p>
          <p className="text-sm text-[#374151] mt-1 leading-relaxed">{comentario}</p>
        </div>
      </div>
    </div>
  )
}
