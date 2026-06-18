import { ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { mockAvaliacoes } from '@/lib/mock-data'

const statusColor: Record<string, string> = {
  aberto:       'bg-[#FEE2E2] text-[#E53E3E]',
  em_andamento: 'bg-[#FEF3C7] text-[#D97706]',
  resolvido:    'bg-[#D1FAE5] text-[#1A9E60]',
}

const statusLabel: Record<string, string> = {
  aberto:       'Aberto',
  em_andamento: 'Em andamento',
  resolvido:    'Resolvido',
}

export default function RelatosAbertosWidget() {
  const relatos = mockAvaliacoes
    .filter(a => a.tipo === 'problema' && a.visivel)
    .slice(0, 3)

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
  }

  return (
    <div
      className="bg-white rounded-lg shadow-card overflow-hidden"
      style={{ boxShadow: '0 1px 3px rgba(27,58,107,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
    >
      <div className="px-5 py-4 border-b border-[#E6F0FF] flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-[#E53E3E]" />
        <h2 className="text-sm font-semibold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Relatos de Problema Não Resolvidos
        </h2>
      </div>

      <div className="divide-y divide-[#E6F0FF]">
        {relatos.map(r => {
          const problema = r as typeof r & { descricao: string; status: string }
          return (
            <div key={r.id} className="flex items-start gap-4 px-5 py-4">
              {/* Thumb placeholder */}
              <div className="w-12 h-12 rounded-[6px] bg-[#E6F0FF] shrink-0 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-[#2D5FA6]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#0D1F3C] truncate">{r.espacoNome}</p>
                    <p className="text-xs text-[#64748B] mt-0.5 line-clamp-2">{problema.descricao}</p>
                  </div>
                  <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColor[problema.status]}`}>
                    {statusLabel[problema.status]}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-[#64748B]">{r.autor} · {formatDate(r.data)}</span>
                  <Link
                    href="/admin/avaliacoes"
                    className="text-[11px] text-[#2D5FA6] hover:underline flex items-center gap-0.5"
                  >
                    Ver <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-5 py-3 border-t border-[#E6F0FF]">
        <Link
          href="/admin/avaliacoes"
          className="flex items-center gap-1 text-xs text-[#2D5FA6] hover:underline"
        >
          Ver todos os relatos <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
