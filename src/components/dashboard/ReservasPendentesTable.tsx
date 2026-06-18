'use client'

import { useState } from 'react'
import { Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { mockReservas } from '@/lib/mock-data'

export default function ReservasPendentesTable() {
  const [reservas, setReservas] = useState(mockReservas.slice(0, 8))

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
  }

  const cancelar = (id: string) => {
    setReservas(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div
      className="bg-white rounded-lg shadow-card overflow-hidden"
      style={{ boxShadow: '0 1px 3px rgba(27,58,107,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
    >
      <div className="px-5 py-4 border-b border-[#E6F0FF]">
        <h2 className="text-sm font-semibold text-[#0D1F3C]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Reservas Pendentes
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E6F0FF] bg-[#F4F7FB]">
              <th className="text-left px-5 py-3 text-xs font-medium text-[#64748B] uppercase tracking-wide">Quadra</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#64748B] uppercase tracking-wide">Data</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#64748B] uppercase tracking-wide">Horário</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-[#64748B] uppercase tracking-wide">Morador</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {reservas.map((r, i) => (
              <tr
                key={r.id}
                className={`border-b border-[#E6F0FF] hover:bg-[#F4F7FB] transition-colors ${i === reservas.length - 1 ? 'border-0' : ''}`}
              >
                <td className="px-5 py-3 font-medium text-[#0D1F3C] max-w-[180px] truncate">{r.espacoNome}</td>
                <td className="px-4 py-3 text-[#64748B]">{formatDate(r.data)}</td>
                <td className="px-4 py-3 text-[#64748B]">{r.horaInicio} – {r.horaFim}</td>
                <td className="px-4 py-3 text-[#0D1F3C] max-w-[160px] truncate">{r.morador}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => cancelar(r.id)}
                    aria-label={`Cancelar reserva de ${r.morador}`}
                    className="p-1.5 rounded hover:bg-[#FEE2E2] text-[#64748B] hover:text-[#E53E3E] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-[#E6F0FF]">
        <Link
          href="/admin/agenda"
          className="flex items-center gap-1 text-xs text-[#2D5FA6] hover:underline"
        >
          Ver todas as reservas <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
