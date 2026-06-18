import BadgeProblema from '@/components/portal/shared/BadgeProblema'
import StatusRelato from '@/components/portal/shared/StatusRelato'

interface Props {
  autor: string
  descricao: string
  data: string
  foto: string | null
  statusPrefeitura: 'aberto' | 'em_andamento' | 'resolvido'
  dataResolucao?: string
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

function formatDateFull(dateStr: string) {
  const [y, m, d] = dateStr.split('-')
  return `${d}/${m}/${y}`
}

export default function ProblemaCard({ autor, descricao, data, foto, statusPrefeitura, dataResolucao }: Props) {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-4 space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1.5">
          <BadgeProblema />
          <StatusRelato status={statusPrefeitura} />
        </div>
        <span className="text-xs text-[#9CA3AF] shrink-0">{formatDate(data)}</span>
      </div>

      <div className="flex items-start gap-3">
        {foto ? (
          <img
            src={foto}
            alt="Foto do problema"
            className="w-16 h-16 rounded-[6px] object-cover shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
          />
        ) : (
          <div className="w-12 h-12 rounded-[6px] bg-[#FEF3C7] flex items-center justify-center shrink-0 text-lg">
            ⚠️
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#374151]">{autor}</p>
          <p className="text-sm text-[#374151] mt-1 leading-relaxed">{descricao}</p>
        </div>
      </div>

      {statusPrefeitura === 'resolvido' && dataResolucao && (
        <div className="flex items-center gap-2 bg-[#D1FAE5] text-[#1A9E60] text-xs font-medium px-3 py-2 rounded-[8px]">
          <span>✅</span>
          <span>Prefeitura resolveu em {formatDateFull(dataResolucao)}</span>
        </div>
      )}

      {statusPrefeitura === 'em_andamento' && (
        <div className="flex items-center gap-2 bg-[#FEF3C7] text-[#D97706] text-xs font-medium px-3 py-2 rounded-[8px]">
          <span>🔄</span>
          <span>Prefeitura está resolvendo</span>
        </div>
      )}
    </div>
  )
}
