import { Suspense } from 'react'
import { mockMinhasReservas } from '@/lib/mock-data'
import ConfirmadaClient from '@/components/portal/reservar/ConfirmadaClient'

export function generateStaticParams() {
  return mockMinhasReservas.map(r => ({ id: r.id }))
}

export default function ConfirmadaPage({ params }: { params: { id: string } }) {
  return (
    <Suspense>
      <ConfirmadaClient id={params.id} />
    </Suspense>
  )
}
