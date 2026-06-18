'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, User, LayoutDashboard, ArrowRight } from 'lucide-react'
import { useAuthStore, DEMO_USERS } from '@/lib/auth-store'

export default function EntrarPage() {
  const { login, user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (user?.role === 'admin') router.replace('/admin/dashboard')
    else if (user?.role === 'cidadao') router.replace('/inicio')
  }, [user, router])

  function entrarComo(role: 'cidadao' | 'admin') {
    login(role)
    if (role === 'admin') router.push('/admin/dashboard')
    else router.push('/inicio')
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-[#1B3A6B] flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-[#1B3A6B] text-xl" style={{ fontFamily: 'Syne, sans-serif' }}>
          QuadraGov
        </span>
      </div>

      <div className="bg-white rounded-[16px] shadow-card w-full max-w-sm p-6 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="font-bold text-[#111827] text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>
            Acesso de demonstração
          </h1>
          <p className="text-sm text-[#9CA3AF]">
            Escolha um perfil para explorar o sistema
          </p>
        </div>

        {/* Perfil cidadão */}
        <button
          onClick={() => entrarComo('cidadao')}
          className="group w-full flex items-center gap-4 p-4 rounded-[12px] border-2 border-[#E5E7EB] hover:border-[#2D5FA6] hover:bg-[#F4F7FB] transition-all text-left"
        >
          <div className="w-11 h-11 rounded-full bg-[#E6F0FF] flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-[#2D5FA6]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[#111827] text-sm">{DEMO_USERS.cidadao.nome}</p>
            <p className="text-xs text-[#9CA3AF]">{DEMO_USERS.cidadao.email}</p>
            <p className="text-xs text-[#2D5FA6] mt-0.5">Portal do Cidadão</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#2D5FA6] transition-colors shrink-0" />
        </button>

        {/* Perfil admin */}
        <button
          onClick={() => entrarComo('admin')}
          className="group w-full flex items-center gap-4 p-4 rounded-[12px] border-2 border-[#E5E7EB] hover:border-[#0D1F3C] hover:bg-[#F4F7FB] transition-all text-left"
        >
          <div className="w-11 h-11 rounded-full bg-[#E6F0FF] flex items-center justify-center shrink-0">
            <LayoutDashboard className="w-5 h-5 text-[#0D1F3C]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[#111827] text-sm">{DEMO_USERS.admin.nome}</p>
            <p className="text-xs text-[#9CA3AF]">{DEMO_USERS.admin.email}</p>
            <p className="text-xs text-[#0D1F3C] mt-0.5">Painel da Prefeitura</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#0D1F3C] transition-colors shrink-0" />
        </button>

        <p className="text-[11px] text-center text-[#9CA3AF]">
          Sem senha — apenas para demonstração
        </p>
      </div>

      <button
        onClick={() => router.push('/inicio')}
        className="mt-5 text-sm text-[#9CA3AF] hover:text-[#374151] transition-colors"
      >
        Continuar sem entrar →
      </button>
    </div>
  )
}
