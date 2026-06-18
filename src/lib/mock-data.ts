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
