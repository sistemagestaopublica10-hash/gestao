'use client'

import { useState, useMemo, useEffect } from 'react'
import HeroBusca from '@/components/portal/inicio/HeroBusca'
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

const DM = 'var(--font-sans)'

export default function InicioPage() {
  const [busca, setBusca] = useState('')
  const [bairro, setBairro] = useState('')
  const [tipo, setTipo] = useState('')
  const [loading, setLoading] = useState(true)

  const buscaDebounced = useDebounce(busca, 300)

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
      <HeroBusca
        busca={busca}
        onBuscaChange={setBusca}
        bairros={bairros}
        tipos={tipos}
        bairroSelecionado={bairro}
        tipoSelecionado={tipo}
        onBairroChange={setBairro}
        onTipoChange={setTipo}
      />

      {/* Extra padding compensates for the floating filter bar overlap */}
      <div className="max-w-6xl mx-auto" style={{ paddingTop: 100 }}>

        {/* Results header */}
        <div
          className="px-4 sm:px-6 mb-5 flex items-center justify-between"
          style={{ fontFamily: DM }}
        >
          <p style={{ fontSize: 14, color: '#374151' }}>
            <span style={{ fontWeight: 600, color: '#111' }}>
              {loading ? '—' : filtrados.length}
            </span>{' '}
            {filtrados.length === 1 ? 'espaço disponível' : 'espaços disponíveis'}
          </p>

          {(bairro || tipo || busca) && (
            <button
              onClick={() => { setBusca(''); setBairro(''); setTipo('') }}
              style={{ fontSize: 13, color: '#1a4731', textDecoration: 'underline' }}
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="px-4 sm:px-6 pb-16">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <QuadraCardSkeleton key={i} />
              ))}
            </div>
          ) : filtrados.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p style={{ fontFamily: DM, color: '#374151', fontWeight: 500 }}>
                Nenhuma quadra encontrada para esse filtro.
              </p>
              <button
                onClick={() => { setBusca(''); setBairro(''); setTipo('') }}
                className="mt-4"
                style={{ fontFamily: DM, fontSize: 13, color: '#1a4731', textDecoration: 'underline' }}
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
