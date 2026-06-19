'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, CalendarDays, Clock, MapPin, ArrowRight } from 'lucide-react'
import Header from '@/components/portal/layout/Header'
import Footer from '@/components/portal/layout/Footer'
import DemoLoginBanner from '@/components/portal/layout/DemoLoginBanner'
import PortalNav from '@/components/portal/layout/PortalNav'

function formatarData(iso: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function ConfirmadaClient({ id }: { id: string }) {
  const searchParams = useSearchParams()
  const quadra = searchParams.get('quadra') ?? 'Quadra'
  const data = searchParams.get('data') ?? ''
  const hora = searchParams.get('hora') ?? ''

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header />

      <main className="flex-1 pb-20 sm:pb-0 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-sm space-y-5">

          <div className="bg-white rounded-[20px] shadow-card p-7 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D1FAE5] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9 text-[#1A9E60]" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-display)' }}>
                Reserva confirmada!
              </h1>
              <p className="text-sm text-[#6B7280] mt-1">
                Seu agendamento foi registrado com sucesso.
              </p>
            </div>

            <div className="bg-[#F9FAFB] rounded-[14px] p-4 text-left space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9CA3AF] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-[#9CA3AF]">Local</p>
                  <p className="text-sm font-semibold text-[#111827]">{quadra}</p>
                </div>
              </div>
              {data && (
                <div className="flex items-start gap-2.5">
                  <CalendarDays className="w-4 h-4 text-[#9CA3AF] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Data</p>
                    <p className="text-sm font-semibold text-[#111827] capitalize">{formatarData(data)}</p>
                  </div>
                </div>
              )}
              {hora && (
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#9CA3AF] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Horário</p>
                    <p className="text-sm font-semibold text-[#111827]">{hora}</p>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs text-[#9CA3AF]">
              Comprovante · Reserva <span className="font-mono font-semibold text-[#374151]">#{id}</span>
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/minhas-reservas"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] rounded-[12px] transition-colors"
            >
              Ver minhas reservas <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/inicio"
              className="flex items-center justify-center w-full py-3 text-sm font-medium text-[#374151] border border-[#E5E7EB] rounded-[12px] hover:bg-white transition-colors"
            >
              Voltar ao início
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <DemoLoginBanner />
      <PortalNav variant="bottom" />
    </div>
  )
}
