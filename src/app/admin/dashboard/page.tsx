import KpiCard from '@/components/dashboard/KpiCard'
import ReservasPendentesTable from '@/components/dashboard/ReservasPendentesTable'
import RelatosAbertosWidget from '@/components/dashboard/RelatosAbertosWidget'
import { mockKpis, mockGestor } from '@/lib/mock-data'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

export default function DashboardPage() {
  const kpis = mockKpis
  const deltaDia = kpis.reservasHoje - kpis.reservasOntem
  const deltaSemana = kpis.reservasSemana - kpis.reservasSemanaPAssada

  const firstName = mockGestor.nome.split(' ')[0]

  return (
    <div className="max-w-[1200px] space-y-6">
      {/* Saudação */}
      <div>
        <h1
          className="text-xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          {getGreeting()}, {firstName}.
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Aqui está o resumo de hoje.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4">
        <KpiCard
          label="Reservas Hoje"
          value={kpis.reservasHoje}
          delta={{ value: deltaDia, label: 'vs. ontem' }}
        />
        <KpiCard
          label="Reservas na Semana"
          value={kpis.reservasSemana}
          delta={{ value: deltaSemana, label: 'vs. semana passada' }}
        />
        <KpiCard
          label="Quadra Mais Ocupada"
          value={kpis.espacoMaisOcupado.nome}
          sub={`${kpis.espacoMaisOcupado.ocupacao}% de ocupação`}
          href="/admin/agenda"
          hrefLabel="Ver agenda"
        />
        <KpiCard
          label="Pior Nota de Avaliação"
          value={`⭐ ${kpis.espacoPiorNota.nota.toFixed(1)}`}
          sub={kpis.espacoPiorNota.nome}
          href="/admin/avaliacoes"
          hrefLabel="Ver relatos"
          danger
        />
      </div>

      {/* Reservas pendentes */}
      <ReservasPendentesTable />

      {/* Relatos abertos */}
      <RelatosAbertosWidget />
    </div>
  )
}
