'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, LayoutDashboard, X } from 'lucide-react'
import { useAuthStore, DEMO_USERS } from '@/lib/auth-store'

export default function DemoLoginBanner() {
  const { user, login, logout } = useAuthStore()
  const router = useRouter()
  const [hidden, setHidden] = useState(false)

  if (hidden) return null

  function entrarComo(role: 'cidadao' | 'admin') {
    login(role)
    if (role === 'admin') router.push('/admin/dashboard')
  }

  function sair() {
    logout()
  }

  return (
    <div className="fixed bottom-[72px] sm:bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="bg-[#0D1F3C] text-white rounded-[14px] shadow-2xl px-4 py-3 flex items-center gap-3">
        <span className="text-lg shrink-0">🎭</span>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-[#94A3B8] font-medium uppercase tracking-wider mb-1.5">
            Modo demonstração
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => entrarComo('cidadao')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                user?.role === 'cidadao'
                  ? 'bg-[#2D5FA6] text-white ring-2 ring-white/30'
                  : 'bg-[#1B3A6B] text-[#94A3B8] hover:bg-[#2D5FA6] hover:text-white'
              }`}
            >
              <User className="w-3 h-3" />
              {DEMO_USERS.cidadao.nome.split(' ')[0]}
            </button>
            <button
              onClick={() => entrarComo('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                user?.role === 'admin'
                  ? 'bg-[#F59E0B] text-[#0D1F3C] ring-2 ring-white/30'
                  : 'bg-[#1B3A6B] text-[#94A3B8] hover:bg-[#F59E0B] hover:text-[#0D1F3C]'
              }`}
            >
              <LayoutDashboard className="w-3 h-3" />
              Admin
            </button>
            {user && (
              <button
                onClick={sair}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-[#1B3A6B] transition-all"
              >
                Sair
              </button>
            )}
          </div>
        </div>
        <button
          onClick={() => setHidden(true)}
          aria-label="Fechar painel demo"
          className="shrink-0 p-1 rounded-full text-[#64748B] hover:text-white hover:bg-[#1B3A6B] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
