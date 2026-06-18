import { mockMinhasReservas } from '@/lib/mock-data'
import ConfirmadaClient from '@/components/portal/reservar/ConfirmadaClient'

export function generateStaticParams() {
  return mockMinhasReservas.map(r => ({ id: r.id }))
}

export default function ConfirmadaPage({ params }: { params: { id: string } }) {
  return <ConfirmadaClient id={params.id} />
}
