'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShieldCheck, LogOut, LayoutDashboard } from 'lucide-react'
import { mockMunicipio } from '@/lib/mock-data'
import { useAuthStore } from '@/lib/auth-store'

export default function Header() {
  const { user, logout } = useAuthStore()
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push('/entrar')
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/inicio" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#1B3A6B] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-[#1B3A6B] text-base leading-none" style={{ fontFamily: 'var(--font-sans)' }}>
              QuadraGov
            </span>
            <span className="text-xs text-[#9CA3AF] hidden sm:block">
              {mockMunicipio.nome} — {mockMunicipio.estado}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Link rápido pro painel se for admin */}
              {user.role === 'admin' && (
                <Link
                  href="/admin/dashboard"
                  className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#1B3A6B] border border-[#1B3A6B] px-3 py-1.5 rounded-pill hover:bg-[#E6F0FF] transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Painel Admin
                </Link>
              )}

              {user.role === 'cidadao' && (
                <Link
                  href="/minhas-reservas"
                  className="text-sm text-[#374151] hover:text-[#1B3A6B] transition-colors hidden sm:block"
                >
                  Minhas reservas
                </Link>
              )}

              {/* Avatar + nome + sair */}
              <div className="flex items-center gap-2 pl-2 border-l border-[#E5E7EB]">
                <div className="w-7 h-7 rounded-full bg-[#1B3A6B] flex items-center justify-center text-white text-[11px] font-bold">
                  {user.avatar}
                </div>
                <span className="text-xs font-medium text-[#374151] hidden sm:block max-w-[100px] truncate">
                  {user.nome.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  aria-label="Sair"
                  className="p-1.5 rounded-full hover:bg-[#FEE2E2] text-[#9CA3AF] hover:text-[#E53E3E] transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <>
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
                Entrar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
