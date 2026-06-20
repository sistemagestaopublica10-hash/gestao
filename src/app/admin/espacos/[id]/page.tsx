import { mockEspacos } from '@/lib/mock-data'
import EspacoDetalheClient from './EspacoDetalheClient'

export function generateStaticParams() {
  return mockEspacos.map(e => ({ id: e.id }))
}

export default function Page({ params }: { params: { id: string } }) {
  return <EspacoDetalheClient id={params.id} />
}
