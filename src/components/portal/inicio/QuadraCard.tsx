import Link from 'next/link'
import { MapPin, Star, Clock, ArrowRight, AlertTriangle } from 'lucide-react'
import type { EspacoPublico } from '@/lib/mock-data'

const tipoIcon: Record<string, string> = {
  'Quadra de Tênis':   '🎾',
  'Quadra Poliesportiva': '🏀',
  'Campo de Futebol':  '⚽',
  'Quadra de Vôlei':  '🏐',
}

interface Props {
  espaco: EspacoPublico
}

export default function QuadraCard({ espaco }: Props) {
  const icon = tipoIcon[espaco.tipo] ?? '🏅'

  return (
    <Link
      href={`/quadra/${espaco.id}`}
      className="group bg-white rounded-[16px] overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-200 flex flex-col"
    >
      {/* Foto / gradiente */}
      <div className={`relative h-40 bg-gradient-to-br ${espaco.gradiente} flex items-end p-3`}>
        <span className="text-xs font-semibold text-white/90 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-pill">
          {icon} {espaco.tipo}
        </span>
        {espaco.totalRelatosAbertos > 0 && (
          <span
            className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-semibold bg-[#E53E3E] text-white px-2 py-0.5 rounded-pill"
            title={`${espaco.totalRelatosAbertos} relato(s) aberto(s)`}
          >
            <AlertTriangle className="w-3 h-3" />
            {espaco.totalRelatosAbertos}
          </span>
        )}
      </div>

      {/* Corpo */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-[#111827] text-[15px] leading-snug group-hover:text-[#1B3A6B] transition-colors line-clamp-2">
          {espaco.nome}
        </h3>

        <div className="flex items-center gap-1 text-sm text-[#9CA3AF]">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{espaco.bairro}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1 text-[#D97706] font-medium">
            <Star className="w-3.5 h-3.5 fill-current" />
            {espaco.nota.toFixed(1)}
          </span>
          <span className="text-[#9CA3AF]">·</span>
          <span className="text-[#9CA3AF]">{espaco.totalAvaliacoes} avaliações</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#9CA3AF]">
          <Clock className="w-3 h-3 shrink-0" />
          <span>{espaco.horario}</span>
        </div>

        <div className="mt-auto pt-2">
          <span className="flex items-center justify-center gap-1.5 w-full text-sm font-medium text-[#1B3A6B] bg-[#E6F0FF] group-hover:bg-[#1B3A6B] group-hover:text-white transition-colors py-2 rounded-[10px]">
            Ver detalhes <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
