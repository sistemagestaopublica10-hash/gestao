'use client'

import { useState } from 'react'
import { Star, LogIn } from 'lucide-react'
import AvaliacaoCard from './AvaliacaoCard'
import ProblemaCard from './ProblemaCard'
import ModalAvaliar from './ModalAvaliar'
import ModalRelatarProblema from './ModalRelatarProblema'
import type { Postagem } from '@/lib/mock-data'

// Mock user session — em produção viria de auth/Zustand
const MOCK_SESSION = {
  logado: true,
  nome: 'João Silva',
  // IDs de espaços onde o usuário tem reservas passadas
  reservasPassadas: ['1'] as string[],
  // IDs de espaços onde já avaliou
  jaAvaliou: [] as string[],
}

interface Props {
  espacoId: string
  espacoNome: string
  postagens: Postagem[]
}

export default function ListaAvaliacoes({ espacoId, espacoNome, postagens }: Props) {
  const [modalAvaliar, setModalAvaliar] = useState(false)
  const [modalRelatar, setModalRelatar] = useState(false)
  const [listaLocal, setListaLocal] = useState<Postagem[]>(postagens)

  const { logado, reservasPassadas, jaAvaliou } = MOCK_SESSION
  const temReservaPassada = reservasPassadas.includes(espacoId)
  const jaCriticou = jaAvaliou.includes(espacoId)

  function handleAvaliar() {
    if (!logado) { setModalAvaliar(true); return }
    setModalAvaliar(true)
  }

  function onSubmitAvaliacao(data: { nota: number; comentario: string }) {
    const nova: Postagem = {
      id: `local-${Date.now()}`,
      tipo: 'avaliacao',
      espacoId,
      autor: MOCK_SESSION.nome,
      nota: data.nota,
      comentario: data.comentario,
      data: new Date().toISOString().split('T')[0],
      foto: null,
    }
    setListaLocal(prev => [nova, ...prev])
    MOCK_SESSION.jaAvaliou.push(espacoId)
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

  // Botão Avaliar — 3 estados
  function BotaoAvaliar() {
    if (!logado) {
      return (
        <button
          onClick={() => setModalAvaliar(true)}
          className="flex items-center gap-2 flex-1 justify-center py-2.5 text-sm font-medium text-[#1B3A6B] border border-[#1B3A6B] rounded-[10px] hover:bg-[#E6F0FF] transition-colors"
        >
          <LogIn className="w-4 h-4" />
          Entre para avaliar
        </button>
      )
    }

    if (!temReservaPassada || jaCriticou) {
      return (
        <div className="relative flex-1 group">
          <button
            disabled
            className="w-full flex items-center gap-2 justify-center py-2.5 text-sm font-medium text-[#9CA3AF] bg-[#F3F4F6] rounded-[10px] cursor-not-allowed"
            aria-describedby="tooltip-avaliar"
          >
            <Star className="w-4 h-4" />
            {jaCriticou ? 'Você já avaliou' : 'Avaliar esta quadra'}
          </button>
          {!jaCriticou && (
            <div
              id="tooltip-avaliar"
              role="tooltip"
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs text-white bg-[#111827] rounded-[8px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
            >
              Você pode avaliar após usar a quadra
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#111827]" />
            </div>
          )}
        </div>
      )
    }

    return (
      <button
        onClick={handleAvaliar}
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
        <h2 className="font-bold text-[#111827] text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>
          O que os moradores dizem
        </h2>

        {/* Botões de ação */}
        <div className="flex gap-3">
          <BotaoAvaliar />
          <button
            onClick={() => setModalRelatar(true)}
            className="flex items-center gap-2 flex-1 justify-center py-2.5 text-sm font-medium text-[#D97706] border border-[#D97706] rounded-[10px] hover:bg-[#FEF3C7] transition-colors"
          >
            ⚠️ Relatar problema
          </button>
        </div>

        {/* Lista */}
        {listaLocal.length === 0 ? (
          <div className="text-center py-10 text-[#9CA3AF]">
            <p className="text-2xl mb-2">💬</p>
            <p className="text-sm">Nenhuma avaliação ainda. Seja o primeiro!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {listaLocal.map(p => {
              if (p.tipo === 'avaliacao') {
                return (
                  <AvaliacaoCard
                    key={p.id}
                    autor={p.autor}
                    nota={(p as any).nota}
                    comentario={(p as any).comentario}
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
          reservaInfo={temReservaPassada ? 'Sábado, 14 jun · 08:00–09:00' : undefined}
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
