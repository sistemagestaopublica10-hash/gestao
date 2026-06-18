import { ShieldCheck } from 'lucide-react'
import { mockMunicipio } from '@/lib/mock-data'

export default function Footer() {
  return (
    <footer className="bg-[#F9FAFB] border-t border-[#E5E7EB] mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#1B3A6B]" />
          <span className="text-sm text-[#374151]">
            <strong>QuadraGov</strong> — Prefeitura Municipal de {mockMunicipio.nome}
          </span>
        </div>
        <p className="text-xs text-[#9CA3AF]">
          Serviço público gratuito. Sem cobranças.
        </p>
      </div>
    </footer>
  )
}
