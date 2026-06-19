'use client'

import { useState } from 'react'
import { Star, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AvaliacaoCard from './AvaliacaoCard'
import ProblemaCard from './ProblemaCard'
import ModalAvaliar from './ModalAvaliar'
import ModalRelatarProblema from './ModalRelatarProblema'
import { useAuthStore } from '@/lib/auth-store'
import type { Postagem } from '@/lib/mock-data'

interface Props {
  espacoId: string
  espacoNome: string
  postagens: Postagem[]
}

export default function ListaAvaliacoes({ espacoId, espacoNome, postagens }: Props) {
  const [modalAvaliar, setModalAvaliar] = useState(false)
  const [modalRelatar, setModalRelatar] = useState(false)
  const [listaLocal, setListaLocal] = useState<Postagem[]>(postagens)

  const { user, marcarAvaliado } = useAuthStore()
  const router = useRouter()

  const logado = !!user
  const temReservaPassada = user?.reservasPassadas?.includes(espacoId) ?? false
  const jaCriticou = user?.jaAvaliou?.includes(espacoId) ?? false

  function onSubmitAvaliacao(data: { nota: number; comentario: string }) {
    const nova: Postagem = {
      id: `local-${Date.now()}`,
      tipo: 'avaliacao',
      espacoId,
      autor: user?.nome ?? 'Anônimo',
      nota: data.nota,
      comentario: data.comentario,
      data: new Date().toISOString().split('T')[0],
      foto: null,
    }
    setListaLocal(prev => [nova, ...prev])
    marcarAvaliado(espacoId)
  }

  function onSubmitRelato(data: { nome: string; descricao: string }) {
    const novo: Postagem = {
      id: `local-${Date.now()}`,
      tipo: 'problema',
      espacoId,
      autor: data.nome,
      descricao: data.descricao,
      data: new Date().toISOString().split('T')[0],
      foto: null,
      statusPrefeitura: 'aberto',
    }
    setListaLocal(prev => [novo, ...prev])
  }

  function BotaoAvaliar() {
    if (!logado) {
      return (
        <button
          onClick={() => router.push('/entrar')}
          className="flex items-center gap-2 flex-1 justify-center py-2.5 text-sm font-medium text-[#1B3A6B] border border-[#1B3A6B] rounded-[10px] hover:bg-[#E6F0FF] transition-colors"
        >
          <LogIn className="w-4 h-4" />
          Entre para avaliar
        </button>
      )
    }

    if (jaCriticou) {
      return (
        <div className="flex items-center gap-2 flex-1 justify-center py-2.5 text-sm font-medium text-[#1A9E60] bg-[#D1FAE5] rounded-[10px]">
          <Star className="w-4 h-4 fill-current" />
          Você já avaliou
        </div>
      )
    }

    if (!temReservaPassada) {
      return (
        <div className="relative flex-1 group">
          <button
            disabled
            className="w-full flex items-center gap-2 justify-center py-2.5 text-sm font-medium text-[#9CA3AF] bg-[#F3F4F6] rounded-[10px] cursor-not-allowed"
            aria-describedby={`tooltip-avaliar-${espacoId}`}
          >
            <Star className="w-4 h-4" />
            Avaliar esta quadra
          </button>
          <div
            id={`tooltip-avaliar-${espacoId}`}
            role="tooltip"
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-white bg-[#111827] rounded-[8px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
          >
            Você pode avaliar após usar a quadra
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#111827]" />
          </div>
        </div>
      )
    }

    return (
      <button
        onClick={() => setModalAvaliar(true)}
        className="flex items-center gap-2 flex-1 justify-center py-2.5 text-sm font-medium text-white bg-[#1B3A6B] hover:bg-[#2D5FA6] rounded-[10px] transition-colors"
      >
        <Star className="w-4 h-4" />
        Avaliar esta quadra
      </button>
    )
  }

  return (
    <>
      <section className="space-y-4">
        <h2 className="font-bold text-[#111827] text-lg" style={{ fontFamily: 'var(--font-sans)' }}>
          O que os moradores dizem
        </h2>

        <div className="flex gap-3">
          <BotaoAvaliar />
          <button
            onClick={() => setModalRelatar(true)}
            className="flex items-center gap-2 flex-1 justify-center py-2.5 text-sm font-medium text-[#D97706] border border-[#D97706] rounded-[10px] hover:bg-[#FEF3C7] transition-colors"
          >
            ⚠️ Relatar problema
          </button>
        </div>

        {listaLocal.length === 0 ? (
          <div className="text-center py-10 text-[#9CA3AF]">
            <p className="text-2xl mb-2">💬</p>
            <p className="text-sm">Nenhuma avaliação ainda. Seja o primeiro!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {listaLocal.map(p => {
              if (p.tipo === 'avaliacao') {
                const av = p as Extract<Postagem, { tipo: 'avaliacao' }>
                return (
                  <AvaliacaoCard
                    key={p.id}
                    autor={p.autor}
                    nota={av.nota}
                    comentario={av.comentario}
                    data={p.data}
                    foto={p.foto}
                  />
                )
              }
              const prob = p as Extract<Postagem, { tipo: 'problema' }>
              return (
                <ProblemaCard
                  key={p.id}
                  autor={p.autor}
                  descricao={prob.descricao}
                  data={p.data}
                  foto={p.foto}
                  statusPrefeitura={prob.statusPrefeitura}
                  dataResolucao={prob.dataResolucao}
                />
              )
            })}
          </div>
        )}
      </section>

      {modalAvaliar && (
        <ModalAvaliar
          espacoNome={espacoNome}
          reservaInfo="Reserva anterior nesta quadra"
          onClose={() => setModalAvaliar(false)}
          onSubmit={onSubmitAvaliacao}
        />
      )}

      {modalRelatar && (
        <ModalRelatarProblema
          espacoNome={espacoNome}
          onClose={() => setModalRelatar(false)}
          onSubmit={onSubmitRelato}
        />
      )}
    </>
  )
}
