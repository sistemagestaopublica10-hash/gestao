type Status = 'aberto' | 'em_andamento' | 'resolvido'

const config: Record<Status, { label: string; icon: string; cls: string }> = {
  aberto:       { label: 'Aberto',        icon: '🔴', cls: 'bg-[#FEE2E2] text-[#E53E3E]' },
  em_andamento: { label: 'Em andamento',  icon: '🔄', cls: 'bg-[#FEF3C7] text-[#D97706]' },
  resolvido:    { label: 'Resolvido',     icon: '✅', cls: 'bg-[#D1FAE5] text-[#1A9E60]' },
}

export default function StatusRelato({ status }: { status: Status }) {
  const { label, icon, cls } = config[status]
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-pill ${cls}`}>
      {icon} {label}
    </span>
  )
}
