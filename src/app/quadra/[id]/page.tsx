import Link from 'next/link'
import Header from '@/components/portal/layout/Header'
import Footer from '@/components/portal/layout/Footer'
import { mockEspacosPublicos } from '@/lib/mock-data'

export function generateStaticParams() {
  return mockEspacosPublicos.map(e => ({ id: e.id }))
}

export default function QuadraPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-10 text-center text-[#64748B]">
        <p className="text-lg font-semibold text-[#0D1F3C]" style={{ fontFamily: 'Syne, sans-serif' }}>
          Detalhes da Quadra #{params.id}
        </p>
        <p className="text-sm mt-1">Em construção — Tela 2</p>
        <Link href="/inicio" className="mt-4 inline-block text-sm text-[#2D5FA6] hover:underline">← Voltar</Link>
      </main>
      <Footer />
    </div>
  )
}
