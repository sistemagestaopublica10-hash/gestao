import Link from 'next/link'
import { ShieldCheck, User } from 'lucide-react'
import { mockMunicipio } from '@/lib/mock-data'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/inicio" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#1B3A6B] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-syne font-bold text-[#1B3A6B] text-base leading-none">
              QuadraGov
            </span>
            <span className="text-xs text-[#9CA3AF] hidden sm:block">
              {mockMunicipio.nome} — {mockMunicipio.estado}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/minhas-reservas"
            className="text-sm text-[#374151] hover:text-[#1B3A6B] transition-colors hidden sm:block"
          >
            Minhas reservas
          </Link>
          <Link
            href="/entrar"
            className="flex items-center gap-1.5 text-sm font-medium text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] transition-colors px-3.5 py-2 rounded-pill"
          >
            <User className="w-3.5 h-3.5" />
            Entrar
          </Link>
        </div>
      </div>
    </header>
  )
}
