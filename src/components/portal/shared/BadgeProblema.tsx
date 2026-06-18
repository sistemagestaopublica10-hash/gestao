import { AlertTriangle } from 'lucide-react'

export default function BadgeProblema() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-white bg-[#D97706] px-2 py-0.5 rounded-pill">
      <AlertTriangle className="w-3 h-3" />
      Problema
    </span>
  )
}
