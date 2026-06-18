'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'cidadao' | 'admin'

export interface AuthUser {
  nome: string
  email: string
  role: UserRole
  avatar: string
  // IDs de espaços com reservas passadas (para lógica de avaliação)
  reservasPassadas: string[]
  jaAvaliou: string[]
}

export const DEMO_USERS: Record<string, AuthUser> = {
  cidadao: {
    nome: 'João Silva',
    email: 'joao@demo.com',
    role: 'cidadao',
    avatar: 'JS',
    reservasPassadas: ['1', '3'],
    jaAvaliou: [],
  },
  admin: {
    nome: 'João Mendonça',
    email: 'admin@prefeitura.gov.br',
    role: 'admin',
    avatar: 'JM',
    reservasPassadas: [],
    jaAvaliou: [],
  },
}

interface AuthState {
  user: AuthUser | null
  login: (role: UserRole) => void
  logout: () => void
  marcarAvaliado: (espacoId: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (role) => set({ user: DEMO_USERS[role] }),
      logout: () => set({ user: null }),
      marcarAvaliado: (espacoId) =>
        set(state => ({
          user: state.user
            ? { ...state.user, jaAvaliou: [...state.user.jaAvaliou, espacoId] }
            : null,
        })),
    }),
    { name: 'quadragov-auth' }
  )
)
