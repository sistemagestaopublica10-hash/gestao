import { mockEspacosPublicos } from '@/lib/mock-data'
import ReservarClient from '@/components/portal/reservar/ReservarClient'

export function generateStaticParams() {
  return mockEspacosPublicos.map(e => ({ id: e.id }))
}

export default function ReservarPage({ params }: { params: { id: string } }) {
  return <ReservarClient id={params.id} />
}
