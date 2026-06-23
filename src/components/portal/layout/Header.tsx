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
    <header className="sticky top-0 z-40" style={{ background: '#2E7D52', height: 56 }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <Link href="/inicio" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-base leading-none text-white" style={{ fontFamily: 'var(--font-sans)' }}>
              QuadraGov
            </span>
            <span className="text-xs hidden sm:block" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {mockMunicipio.nome} — {mockMunicipio.estado}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link
                  href="/admin/dashboard"
                  className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.3)' }}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Painel Admin
                </Link>
              )}

              {user.role === 'cidadao' && (
                <Link
                  href="/minhas-reservas"
                  className="text-sm hidden sm:block transition-colors hover:opacity-70"
                  style={{ color: 'rgba(255,255,255,0.82)', fontFamily: 'var(--font-sans)' }}
                >
                  Minhas reservas
                </Link>
              )}

              <div className="flex items-center gap-2 pl-2" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  {user.avatar}
                </div>
                <span className="text-xs font-medium hidden sm:block max-w-[100px] truncate" style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-sans)' }}>
                  {user.nome.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  aria-label="Sair"
                  className="p-1.5 rounded-full transition-colors hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/minhas-reservas"
                className="text-sm hidden sm:block transition-colors hover:opacity-70"
                style={{ color: 'rgba(255,255,255,0.82)', fontFamily: 'var(--font-sans)' }}
              >
                Minhas reservas
              </Link>
              <Link
                href="/entrar"
                className="text-sm font-medium text-[#2E7D52] bg-white hover:bg-gray-100 transition-colors px-3.5 py-2 rounded-full"
                style={{ fontFamily: 'var(--font-sans)' }}
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
