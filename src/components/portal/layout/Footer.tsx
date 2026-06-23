import { ShieldCheck } from 'lucide-react'
import { mockMunicipio } from '@/lib/mock-data'

export default function Footer() {
  return (
    <footer style={{ background: '#2E7D52' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.7)' }} />
          <span className="text-sm font-medium" style={{ color: '#fff', fontFamily: 'var(--font-sans)' }}>
            QuadraGov — Prefeitura Municipal de {mockMunicipio.nome}
          </span>
        </div>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-sans)' }}>
          Serviço público gratuito. Sem cobranças.
        </p>
      </div>
    </footer>
  )
}
