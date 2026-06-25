// ── Admin data ──────────────────────────────────────────────────────────────

export const mockEspacos = [
  { id: '1', nome: 'Quadra Central de Tênis', bairro: 'Centro', tipo: 'Quadra de Tênis', modalidades: ['tenis'], status: 'ativo', foto: null },
  { id: '2', nome: 'Quadra Society Norte', bairro: 'Norte', tipo: 'Quadra Poliesportiva', modalidades: ['futsal', 'basquete'], status: 'ativo', foto: null },
  { id: '3', nome: 'Quadra de Vôlei Sul', bairro: 'Sul', tipo: 'Quadra Poliesportiva', modalidades: ['volei'], status: 'ativo', foto: null },
  { id: '4', nome: 'Campo Aberto Leste', bairro: 'Leste', tipo: 'Campo de Futebol', modalidades: ['futebol'], status: 'inativo', foto: null },
]

export const mockKpis = {
  reservasHoje: 23,
  reservasOntem: 19,
  reservasSemana: 142,
  reservasSemanaPAssada: 128,
  espacoMaisOcupado: { nome: 'Quadra Central de Tênis', ocupacao: 84 },
  espacoPiorNota: { nome: 'Quadra Society Norte', nota: 2.8 },
  reservasPendentes: 5,
}

export const mockReservas = [
  { id: '1', espacoId: '1', espacoNome: 'Quadra Central de Tênis', data: '2026-06-16', horaInicio: '08:00', horaFim: '09:00', morador: 'Maria Silva', telefone: '(27) 99999-0001', tipo: 'comum' },
  { id: '2', espacoId: '1', espacoNome: 'Quadra Central de Tênis', data: '2026-06-16', horaInicio: '10:00', horaFim: '11:00', morador: 'Escola Municipal João XXIII', telefone: '(27) 3333-0001', tipo: 'escola' },
  { id: '3', espacoId: '2', espacoNome: 'Quadra Society Norte', data: '2026-06-16', horaInicio: '09:00', horaFim: '10:00', morador: 'Grupo Ativo Sênior', telefone: '(27) 99999-0002', tipo: 'idosos' },
  { id: '4', espacoId: '3', espacoNome: 'Quadra de Vôlei Sul', data: '2026-06-17', horaInicio: '14:00', horaFim: '15:00', morador: 'Pedro Santos', telefone: '(27) 99999-0003', tipo: 'comum' },
  { id: '5', espacoId: '2', espacoNome: 'Quadra Society Norte', data: '2026-06-17', horaInicio: '19:00', horaFim: '20:00', morador: 'Luciana Ferreira', telefone: '(27) 99999-0004', tipo: 'comum' },
  { id: '6', espacoId: '1', espacoNome: 'Quadra Central de Tênis', data: '2026-06-18', horaInicio: '07:00', horaFim: '08:00', morador: 'Roberto Lima', telefone: '(27) 99999-0005', tipo: 'idosos' },
  { id: '7', espacoId: '3', espacoNome: 'Quadra de Vôlei Sul', data: '2026-06-18', horaInicio: '16:00', horaFim: '17:00', morador: 'Carla Mendes', telefone: '(27) 99999-0006', tipo: 'comum' },
  { id: '8', espacoId: '2', espacoNome: 'Quadra Society Norte', data: '2026-06-19', horaInicio: '08:00', horaFim: '09:00', morador: 'André Costa', telefone: '(27) 99999-0007', tipo: 'comum' },
]

export const mockAvaliacoes = [
  { id: '1', tipo: 'avaliacao' as const, espacoId: '1', espacoNome: 'Quadra Central de Tênis', autor: 'João Silva', nota: 4, comentario: 'Quadra em ótimo estado, só a rede precisa de troca logo.', data: '2026-06-14', foto: null, visivel: true },
  { id: '2', tipo: 'avaliacao' as const, espacoId: '1', espacoNome: 'Quadra Central de Tênis', autor: 'Ana Lima', nota: 5, comentario: 'Excelente! Limpinha e bem conservada.', data: '2026-06-12', foto: null, visivel: true },
  { id: '3', tipo: 'problema' as const, espacoId: '2', espacoNome: 'Quadra Society Norte', autor: 'Maria Oliveira', descricao: 'Rede completamente rasgada do lado direito', data: '2026-06-16', foto: null, status: 'aberto' as const, visivel: true },
  { id: '4', tipo: 'problema' as const, espacoId: '3', espacoNome: 'Quadra de Vôlei Sul', autor: 'Carlos Pereira', descricao: 'Buraco no piso perto da linha lateral', data: '2026-06-15', foto: null, status: 'em_andamento' as const, visivel: true },
  { id: '5', tipo: 'problema' as const, espacoId: '1', espacoNome: 'Quadra Central de Tênis', autor: 'Fernanda Rocha', descricao: 'Iluminação apagada no lado norte da quadra', data: '2026-06-13', foto: null, status: 'aberto' as const, visivel: true },
]

export const mockRelatorioData = [
  { quadra: 'Quadra Central de Tênis', reservas: 98, cancelamentos: 7, notaMedia: 4.3 },
  { quadra: 'Quadra Society Norte', reservas: 112, cancelamentos: 12, notaMedia: 2.8 },
  { quadra: 'Quadra de Vôlei Sul', reservas: 76, cancelamentos: 4, notaMedia: 4.7 },
  { quadra: 'Campo Aberto Leste', reservas: 26, cancelamentos: 2, notaMedia: 3.9 },
]

export const mockGestor = {
  nome: 'João Mendonça',
  municipio: 'Colatina — ES',
  cargo: 'Gestor de Esportes',
}

// ── Portal do Cidadão data ───────────────────────────────────────────────────

export type EspacoPublico = {
  id: string
  nome: string
  bairro: string
  tipo: string
  modalidades: string[]
  horario: string
  nota: number
  totalAvaliacoes: number
  totalRelatosAbertos: number
  regras: string
  gradiente: string
}

export const mockEspacosPublicos: EspacoPublico[] = [
  {
    id: '1',
    nome: 'Quadra Central de Tênis',
    bairro: 'Centro',
    tipo: 'Quadra de Tênis',
    modalidades: ['Tênis'],
    horario: '07:00 – 22:00',
    nota: 4.8,
    totalAvaliacoes: 127,
    totalRelatosAbertos: 1,
    regras: 'Uso máximo de 1 hora quando houver fila. Trazer seus próprios equipamentos. Proibido fumar e consumir bebidas alcoólicas.',
    gradiente: 'from-[#2D5FA6] to-[#1B3A6B]',
  },
  {
    id: '2',
    nome: 'Quadra Society Norte',
    bairro: 'Bairro Norte',
    tipo: 'Quadra Poliesportiva',
    modalidades: ['Futsal', 'Basquete', 'Vôlei'],
    horario: '07:00 – 21:00',
    nota: 2.8,
    totalAvaliacoes: 43,
    totalRelatosAbertos: 3,
    regras: 'Máximo 10 pessoas por quadra. Reserva obrigatória.',
    gradiente: 'from-[#7C3AED] to-[#4C1D95]',
  },
  {
    id: '3',
    nome: 'Campo Aberto do Parque Sul',
    bairro: 'Zona Sul',
    tipo: 'Campo de Futebol',
    modalidades: ['Futebol'],
    horario: '06:00 – 20:00',
    nota: 4.2,
    totalAvaliacoes: 89,
    totalRelatosAbertos: 0,
    regras: 'Campo gramado. Permitido apenas chuteiras de travas de borracha.',
    gradiente: 'from-[#1A9E60] to-[#065f3c]',
  },
  {
    id: '4',
    nome: 'Quadra de Vôlei da Praia',
    bairro: 'Beira Rio',
    tipo: 'Quadra de Vôlei',
    modalidades: ['Vôlei de Areia'],
    horario: '07:00 – 20:00',
    nota: 4.6,
    totalAvaliacoes: 62,
    totalRelatosAbertos: 0,
    regras: 'Quadra de areia ao ar livre. Sem horário de chuva. Limite de 6 por lado.',
    gradiente: 'from-[#D97706] to-[#92400e]',
  },
  {
    id: '5',
    nome: 'Arena Poliesportiva Leste',
    bairro: 'Zona Leste',
    tipo: 'Quadra Poliesportiva',
    modalidades: ['Futsal', 'Basquete'],
    horario: '08:00 – 22:00',
    nota: 3.9,
    totalAvaliacoes: 38,
    totalRelatosAbertos: 2,
    regras: 'Uso de calçado adequado obrigatório. Não é permitido comer na quadra.',
    gradiente: 'from-[#0891b2] to-[#164e63]',
  },
  {
    id: '6',
    nome: 'Quadra do Bairro Novo',
    bairro: 'Bairro Novo',
    tipo: 'Quadra Poliesportiva',
    modalidades: ['Futsal', 'Vôlei'],
    horario: '07:00 – 21:00',
    nota: 4.1,
    totalAvaliacoes: 54,
    totalRelatosAbertos: 1,
    regras: 'Reserva com mínimo de 30 min de antecedência.',
    gradiente: 'from-[#be185d] to-[#831843]',
  },
]

export type Postagem = {
  id: string
  tipo: 'avaliacao' | 'problema'
  espacoId: string
  autor: string
  data: string
  foto: string | null
} & (
  | { tipo: 'avaliacao'; nota: number; comentario: string }
  | { tipo: 'problema'; descricao: string; statusPrefeitura: 'aberto' | 'em_andamento' | 'resolvido'; dataResolucao?: string }
)

export const mockPostagens: Postagem[] = [
  { id: '1', tipo: 'avaliacao', espacoId: '1', autor: 'João Silva', nota: 4, comentario: 'Quadra em ótimo estado, só a rede precisa de troca logo.', data: '2026-06-14', foto: null },
  { id: '2', tipo: 'avaliacao', espacoId: '1', autor: 'Ana Lima', nota: 5, comentario: 'Excelente! Limpinha e bem conservada. Voltarei sempre.', data: '2026-06-12', foto: null },
  { id: '3', tipo: 'problema', espacoId: '1', autor: 'Fernanda Rocha', descricao: 'Iluminação apagada no lado norte da quadra', data: '2026-06-13', foto: null, statusPrefeitura: 'aberto' },
  { id: '4', tipo: 'avaliacao', espacoId: '2', autor: 'Pedro Moura', nota: 2, comentario: 'Piso escorregadio e rede rasgada. Precisa de manutenção urgente.', data: '2026-06-15', foto: null },
  { id: '5', tipo: 'problema', espacoId: '2', autor: 'Maria Oliveira', descricao: 'Rede completamente rasgada do lado direito', data: '2026-06-16', foto: null, statusPrefeitura: 'aberto' },
  { id: '6', tipo: 'problema', espacoId: '2', autor: 'Carlos Pereira', descricao: 'Buraco no piso perto da linha lateral', data: '2026-06-13', foto: null, statusPrefeitura: 'resolvido', dataResolucao: '2026-06-15' },
  { id: '7', tipo: 'avaliacao', espacoId: '3', autor: 'Roberta Costa', nota: 5, comentario: 'Gramado impecável, espaço amplo. Perfeito para jogar no fim de semana.', data: '2026-06-11', foto: null },
]

export const mockHorarios: Record<string, Record<string, { hora: string; status: 'livre' | 'ocupado' | 'bloqueado' }[]>> = {
  '1': {
    '2026-06-16': [
      { hora: '07:00', status: 'livre' },
      { hora: '08:00', status: 'ocupado' },
      { hora: '09:00', status: 'livre' },
      { hora: '10:00', status: 'livre' },
      { hora: '11:00', status: 'ocupado' },
      { hora: '12:00', status: 'bloqueado' },
      { hora: '13:00', status: 'bloqueado' },
      { hora: '14:00', status: 'livre' },
      { hora: '15:00', status: 'livre' },
      { hora: '16:00', status: 'ocupado' },
      { hora: '17:00', status: 'livre' },
      { hora: '18:00', status: 'ocupado' },
      { hora: '19:00', status: 'livre' },
      { hora: '20:00', status: 'livre' },
      { hora: '21:00', status: 'ocupado' },
    ],
  },
}

export const mockMinhasReservas = [
  { id: '2024-0847', espacoId: '1', espacoNome: 'Quadra Central de Tênis', data: '2026-06-16', horaInicio: '09:00', horaFim: '10:00', status: 'proxima' as const, avaliado: false },
  { id: '2024-0801', espacoId: '3', espacoNome: 'Campo Aberto do Parque Sul', data: '2026-06-10', horaInicio: '08:00', horaFim: '09:00', status: 'anterior' as const, avaliado: true },
  { id: '2024-0756', espacoId: '2', espacoNome: 'Quadra Society Norte', data: '2026-06-08', horaInicio: '19:00', horaFim: '20:00', status: 'anterior' as const, avaliado: false },
]

export const mockMunicipio = {
  nome: 'Colatina',
  estado: 'ES',
}

// ── Sistema de pontuação de usuários ────────────────────────────────────────

export type AvaliacaoUso = {
  id: string
  reservaId: string
  espacoId: string
  espacoNome: string
  dataReserva: string
  dataAvaliacao: string
  nota: number // 1–5
  comentario: string
  avaliador: string
}

export type UsuarioMock = {
  id: string
  nome: string
  email: string
  avatar: string
  totalReservas: number
  avaliacoesUso: AvaliacaoUso[]
}

export const mockUsuarios: UsuarioMock[] = [
  {
    id: 'joao-silva',
    nome: 'João Silva',
    email: 'joao@demo.com',
    avatar: 'JS',
    totalReservas: 3,
    avaliacoesUso: [
      {
        id: 'au-1',
        reservaId: '2024-0801',
        espacoId: '3',
        espacoNome: 'Campo Aberto do Parque Sul',
        dataReserva: '2026-06-10',
        dataAvaliacao: '2026-06-11',
        nota: 4,
        comentario: 'Deixou o local bem organizado. Sem reclamações.',
        avaliador: 'João Mendonça',
      },
      {
        id: 'au-2',
        reservaId: '2024-0756',
        espacoId: '2',
        espacoNome: 'Quadra Society Norte',
        dataReserva: '2026-06-08',
        dataAvaliacao: '2026-06-09',
        nota: 2,
        comentario: 'Deixou lixo na quadra e não organizou o espaço adequadamente.',
        avaliador: 'João Mendonça',
      },
    ],
  },
  {
    id: 'maria-oliveira',
    nome: 'Maria Oliveira',
    email: 'maria@demo.com',
    avatar: 'MO',
    totalReservas: 5,
    avaliacoesUso: [
      {
        id: 'au-3',
        reservaId: '2024-0720',
        espacoId: '1',
        espacoNome: 'Quadra Central de Tênis',
        dataReserva: '2026-06-05',
        dataAvaliacao: '2026-06-06',
        nota: 5,
        comentario: 'Excelente! Quadra impecável após o uso.',
        avaliador: 'João Mendonça',
      },
      {
        id: 'au-4',
        reservaId: '2024-0698',
        espacoId: '1',
        espacoNome: 'Quadra Central de Tênis',
        dataReserva: '2026-05-28',
        dataAvaliacao: '2026-05-29',
        nota: 5,
        comentario: 'Usuária exemplar, sempre mantém o espaço limpo.',
        avaliador: 'João Mendonça',
      },
    ],
  },
  {
    id: 'pedro-santos',
    nome: 'Pedro Santos',
    email: 'pedro@demo.com',
    avatar: 'PS',
    totalReservas: 2,
    avaliacoesUso: [
      {
        id: 'au-5',
        reservaId: '2024-0710',
        espacoId: '2',
        espacoNome: 'Quadra Society Norte',
        dataReserva: '2026-06-03',
        dataAvaliacao: '2026-06-04',
        nota: 1,
        comentario: 'Danificou a rede da quadra e deixou o local em péssimas condições.',
        avaliador: 'João Mendonça',
      },
    ],
  },
  {
    id: 'ana-lima',
    nome: 'Ana Lima',
    email: 'ana@demo.com',
    avatar: 'AL',
    totalReservas: 1,
    avaliacoesUso: [],
  },
]

const PONTOS_REDUCAO: Record<number, number> = { 5: 0, 4: 5, 3: 15, 2: 25, 1: 40 }

export function calcularPontuacao(avaliacoes: AvaliacaoUso[]): number {
  if (avaliacoes.length === 0) return 100
  const total = avaliacoes.reduce(
    (acc, av) => acc - (PONTOS_REDUCAO[av.nota] ?? 0),
    100,
  )
  return Math.max(0, Math.min(100, total))
}

export type Classificacao = {
  label: string
  color: string
  bg: string
  ring: string
}

export function classificarPerfil(pontuacao: number): Classificacao {
  if (pontuacao >= 90) return { label: 'Exemplar',    color: '#1A9E60', bg: '#D1FAE5', ring: '#1A9E60' }
  if (pontuacao >= 70) return { label: 'Bom Usuário', color: '#2D5FA6', bg: '#E6F0FF', ring: '#2D5FA6' }
  if (pontuacao >= 50) return { label: 'Regular',     color: '#D97706', bg: '#FEF3C7', ring: '#D97706' }
  if (pontuacao >= 25) return { label: 'Em Risco',    color: '#E53E3E', bg: '#FEE2E2', ring: '#E53E3E' }
  return                      { label: 'Suspenso',    color: '#7C3AED', bg: '#EDE9FE', ring: '#7C3AED' }
}

// ── Métricas por quadra ──────────────────────────────────────────────────────

export type MetricasQuadra = {
  espacoId: string
  taxaOcupacao: number
  totalReservasMes: number
  notaMedia: number
  totalAvaliacoes: number
  ocupacaoPorHora: { hora: string; ocupacao: number }[]
  diasSemana: { dia: string; reservas: number }[]
  reclamacoesComuns: { descricao: string; count: number }[]
  sugestoesEvento: string[]
}

export const mockMetricasQuadras: MetricasQuadra[] = [
  {
    espacoId: '1',
    taxaOcupacao: 84,
    totalReservasMes: 98,
    notaMedia: 4.3,
    totalAvaliacoes: 127,
    ocupacaoPorHora: [
      { hora: '07:00', ocupacao: 40 }, { hora: '08:00', ocupacao: 75 },
      { hora: '09:00', ocupacao: 90 }, { hora: '10:00', ocupacao: 85 },
      { hora: '11:00', ocupacao: 60 }, { hora: '12:00', ocupacao: 20 },
      { hora: '13:00', ocupacao: 15 }, { hora: '14:00', ocupacao: 45 },
      { hora: '15:00', ocupacao: 55 }, { hora: '16:00', ocupacao: 80 },
      { hora: '17:00', ocupacao: 95 }, { hora: '18:00', ocupacao: 100 },
      { hora: '19:00', ocupacao: 90 }, { hora: '20:00', ocupacao: 70 },
      { hora: '21:00', ocupacao: 40 },
    ],
    diasSemana: [
      { dia: 'Seg', reservas: 14 }, { dia: 'Ter', reservas: 12 },
      { dia: 'Qua', reservas: 18 }, { dia: 'Qui', reservas: 16 },
      { dia: 'Sex', reservas: 20 }, { dia: 'Sáb', reservas: 22 },
      { dia: 'Dom', reservas: 10 },
    ],
    reclamacoesComuns: [
      { descricao: 'Rede precisa de troca', count: 4 },
      { descricao: 'Iluminação apagada no lado norte', count: 2 },
      { descricao: 'Falta de bebedouro', count: 1 },
    ],
    sugestoesEvento: [
      'Torneio de Tênis Amador — final de semana de alto movimento (Sáb/Dom)',
      'Aulas abertas de tênis para jovens — manhãs de sábado (horário mais cheio)',
      'Campeonato Interescolar de Tênis — horário de baixa (12h–14h) para treinos',
    ],
  },
  {
    espacoId: '2',
    taxaOcupacao: 61,
    totalReservasMes: 112,
    notaMedia: 2.8,
    totalAvaliacoes: 43,
    ocupacaoPorHora: [
      { hora: '07:00', ocupacao: 30 }, { hora: '08:00', ocupacao: 55 },
      { hora: '09:00', ocupacao: 70 }, { hora: '10:00', ocupacao: 60 },
      { hora: '11:00', ocupacao: 45 }, { hora: '12:00', ocupacao: 10 },
      { hora: '13:00', ocupacao: 5  }, { hora: '14:00', ocupacao: 30 },
      { hora: '15:00', ocupacao: 40 }, { hora: '16:00', ocupacao: 65 },
      { hora: '17:00', ocupacao: 75 }, { hora: '18:00', ocupacao: 80 },
      { hora: '19:00', ocupacao: 85 }, { hora: '20:00', ocupacao: 60 },
      { hora: '21:00', ocupacao: 20 },
    ],
    diasSemana: [
      { dia: 'Seg', reservas: 16 }, { dia: 'Ter', reservas: 14 },
      { dia: 'Qua', reservas: 19 }, { dia: 'Qui', reservas: 17 },
      { dia: 'Sex', reservas: 22 }, { dia: 'Sáb', reservas: 24 },
      { dia: 'Dom', reservas: 8  },
    ],
    reclamacoesComuns: [
      { descricao: 'Rede rasgada do lado direito', count: 7 },
      { descricao: 'Buraco no piso lateral', count: 5 },
      { descricao: 'Falta de iluminação noturna', count: 3 },
      { descricao: 'Banheiros sem água', count: 2 },
    ],
    sugestoesEvento: [
      'Mutirão de manutenção — prioridade antes de qualquer evento público',
      'Copa de Futsal da Comunidade Norte — após resolução da rede',
      'Treino aberto de basquete — noites de sexta (alta demanda às 19h)',
    ],
  },
  {
    espacoId: '3',
    taxaOcupacao: 72,
    totalReservasMes: 76,
    notaMedia: 4.7,
    totalAvaliacoes: 89,
    ocupacaoPorHora: [
      { hora: '07:00', ocupacao: 20 }, { hora: '08:00', ocupacao: 35 },
      { hora: '09:00', ocupacao: 50 }, { hora: '10:00', ocupacao: 45 },
      { hora: '11:00', ocupacao: 40 }, { hora: '12:00', ocupacao: 10 },
      { hora: '13:00', ocupacao: 5  }, { hora: '14:00', ocupacao: 60 },
      { hora: '15:00', ocupacao: 85 }, { hora: '16:00', ocupacao: 95 },
      { hora: '17:00', ocupacao: 100 },{ hora: '18:00', ocupacao: 90 },
      { hora: '19:00', ocupacao: 70 }, { hora: '20:00', ocupacao: 40 },
    ],
    diasSemana: [
      { dia: 'Seg', reservas: 8  }, { dia: 'Ter', reservas: 9  },
      { dia: 'Qua', reservas: 11 }, { dia: 'Qui', reservas: 10 },
      { dia: 'Sex', reservas: 14 }, { dia: 'Sáb', reservas: 18 },
      { dia: 'Dom', reservas: 16 },
    ],
    reclamacoesComuns: [
      { descricao: 'Falta de iluminação para horário noturno', count: 2 },
      { descricao: 'Bebedouro quebrado', count: 1 },
    ],
    sugestoesEvento: [
      'Festival de Vôlei de Areia — tarde de sábado (pico máximo: 15h–18h)',
      'Aulas de vôlei para terceira idade — manhãs de segunda (baixo movimento)',
      'Campeonato Municipal de Vôlei — horário nobre 16h–19h',
    ],
  },
  {
    espacoId: '4',
    taxaOcupacao: 28,
    totalReservasMes: 26,
    notaMedia: 3.9,
    totalAvaliacoes: 38,
    ocupacaoPorHora: [
      { hora: '07:00', ocupacao: 5  }, { hora: '08:00', ocupacao: 10 },
      { hora: '09:00', ocupacao: 20 }, { hora: '10:00', ocupacao: 25 },
      { hora: '11:00', ocupacao: 20 }, { hora: '12:00', ocupacao: 5  },
      { hora: '13:00', ocupacao: 5  }, { hora: '14:00', ocupacao: 15 },
      { hora: '15:00', ocupacao: 30 }, { hora: '16:00', ocupacao: 35 },
      { hora: '17:00', ocupacao: 40 }, { hora: '18:00', ocupacao: 30 },
      { hora: '19:00', ocupacao: 15 }, { hora: '20:00', ocupacao: 5  },
    ],
    diasSemana: [
      { dia: 'Seg', reservas: 2 }, { dia: 'Ter', reservas: 2 },
      { dia: 'Qua', reservas: 3 }, { dia: 'Qui', reservas: 3 },
      { dia: 'Sex', reservas: 4 }, { dia: 'Sáb', reservas: 8 },
      { dia: 'Dom', reservas: 7 },
    ],
    reclamacoesComuns: [
      { descricao: 'Gramado mal conservado', count: 3 },
      { descricao: 'Falta de vestiário', count: 2 },
      { descricao: 'Acesso difícil para cadeirantes', count: 1 },
    ],
    sugestoesEvento: [
      'Torneio de Futebol Comunitário — finais de semana (única movimentação real)',
      'Dia de Esporte para Crianças — promover uso nos horários vazios das manhãs',
      'Feira de Saúde e Esporte — baixa demanda permite estrutura temporária no campo',
    ],
  },
]

// ── Eventos públicos ─────────────────────────────────────────────────────────

export type Evento = {
  id: string
  espacoId: string
  titulo: string
  descricao: string
  data: string
  horaInicio: string
  horaFim: string
  organizador: string
}

export const mockEventosIniciais: Evento[] = [
  {
    id: 'ev-1',
    espacoId: '1',
    titulo: 'Torneio de Tênis Amador',
    descricao: 'Torneio aberto à comunidade. Inscrições na Prefeitura de Colatina.',
    data: '2026-06-28',
    horaInicio: '08:00',
    horaFim: '17:00',
    organizador: 'Prefeitura de Colatina',
  },
  {
    id: 'ev-2',
    espacoId: '3',
    titulo: 'Festival de Vôlei Sul',
    descricao: 'Evento gratuito com times locais e convidados de cidades vizinhas.',
    data: '2026-06-29',
    horaInicio: '14:00',
    horaFim: '20:00',
    organizador: 'Associação Esportiva Sul',
  },
]
