'use client'

import { useState, useMemo, useEffect } from 'react'
import HeroBusca from '@/components/portal/inicio/HeroBusca'
import FiltrosBar from '@/components/portal/inicio/FiltrosBar'
import QuadraCard from '@/components/portal/inicio/QuadraCard'
import QuadraCardSkeleton from '@/components/portal/inicio/QuadraCardSkeleton'
import { mockEspacosPublicos } from '@/lib/mock-data'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debouncedValue
}

export default function InicioPage() {
  const [busca, setBusca] = useState('')
  const [bairro, setBairro] = useState('')
  const [tipo, setTipo] = useState('')
  const [loading, setLoading] = useState(true)

  const buscaDebounced = useDebounce(busca, 300)

  // Simula loading inicial
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const bairros = useMemo(
    () => Array.from(new Set(mockEspacosPublicos.map(e => e.bairro))).sort(),
    []
  )

  const tipos = useMemo(
    () => Array.from(new Set(mockEspacosPublicos.map(e => e.tipo))).sort(),
    []
  )

  const filtrados = useMemo(() => {
    const q = buscaDebounced.toLowerCase().trim()
    return mockEspacosPublicos.filter(e => {
      const matchBusca = !q || e.nome.toLowerCase().includes(q) || e.bairro.toLowerCase().includes(q)
      const matchBairro = !bairro || e.bairro === bairro
      const matchTipo = !tipo || e.tipo === tipo
      return matchBusca && matchBairro && matchTipo
    })
  }, [buscaDebounced, bairro, tipo])

  return (
    <>
      <HeroBusca busca={busca} onBuscaChange={setBusca} />

      <div className="max-w-5xl mx-auto">
        <FiltrosBar
          bairros={bairros}
          tipos={tipos}
          bairroSelecionado={bairro}
          tipoSelecionado={tipo}
          onBairroChange={setBairro}
          onTipoChange={setTipo}
          total={loading ? 0 : filtrados.length}
        />

        <div className="px-4 sm:px-6 pb-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <QuadraCardSkeleton key={i} />
              ))}
            </div>
          ) : filtrados.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-[#374151] font-medium">Nenhuma quadra encontrada para esse filtro.</p>
              <button
                onClick={() => { setBusca(''); setBairro(''); setTipo('') }}
                className="mt-4 text-sm text-[#2D5FA6] hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtrados.map((e, i) => (
                <QuadraCard key={e.id} espaco={e} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
