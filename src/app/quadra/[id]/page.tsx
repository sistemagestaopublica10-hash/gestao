import { mockEspacosPublicos } from '@/lib/mock-data'
import QuadraDetalhes from '@/components/portal/detalhes/QuadraDetalhes'

export function generateStaticParams() {
  return mockEspacosPublicos.map(e => ({ id: e.id }))
}

export default function QuadraPage({ params }: { params: { id: string } }) {
  return <QuadraDetalhes id={params.id} />
}
