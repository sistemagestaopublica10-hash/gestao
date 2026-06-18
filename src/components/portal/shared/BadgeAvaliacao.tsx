import { Star } from 'lucide-react'

export default function BadgeAvaliacao() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-white bg-[#1A9E60] px-2 py-0.5 rounded-pill">
      <Star className="w-3 h-3 fill-current" />
      Avaliação
    </span>
  )
}
