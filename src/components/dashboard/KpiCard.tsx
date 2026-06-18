import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface KpiCardProps {
  label: string
  value: string | number
  delta?: { value: number; label: string }
  sub?: string
  href?: string
  hrefLabel?: string
  danger?: boolean
}

export default function KpiCard({ label, value, delta, sub, href, hrefLabel, danger }: KpiCardProps) {
  const deltaPositive = delta && delta.value > 0

  return (
    <div
      className={`bg-white rounded-lg p-5 shadow-card flex flex-col gap-3 ${
        danger ? 'border-l-4 border-[#E53E3E]' : ''
      }`}
      style={{ boxShadow: '0 1px 3px rgba(27,58,107,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
    >
      <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">{label}</p>

      <p
        className="text-3xl font-bold text-[#0D1F3C] leading-none"
        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        {value}
      </p>

      {sub && <p className="text-sm text-[#64748B]">{sub}</p>}

      {delta && (
        <div className={`flex items-center gap-1 text-xs font-medium ${deltaPositive ? 'text-[#1A9E60]' : 'text-[#E53E3E]'}`}>
          {deltaPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span>
            {deltaPositive ? '+' : ''}{delta.value} {delta.label}
          </span>
        </div>
      )}

      {href && hrefLabel && (
        <Link
          href={href}
          className="flex items-center gap-1 text-xs text-[#2D5FA6] hover:underline mt-auto pt-1"
        >
          {hrefLabel} <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  )
}
