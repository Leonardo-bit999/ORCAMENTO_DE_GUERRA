/* =========================================================
   Missão 2B — O rolê
   ========================================================= */

import { Missao } from '../../core/models/missao.model';
import { EstadoJogo } from '../../core/models/estado-jogo.model';

const CUSTO_COMPLETO = 180;
const CUSTO_ADAPTADO = 90;

/**
 * Abertura: reconhece o estado financeiro atual.
 * Mesma lógica da M2A — o texto combina com a situação real do jogador.
 */
function aberturaPorEstado(estado: EstadoJogo): string {
  const reserva = estado.financeiro.reserva;

  if (reserva >= 300) {
    return 'Você tem alguma margem. E seus amigos chamaram pra uma coisa que você queria fazer há tempo.';
  }

  if (reserva >= 100) {
    return 'Você guardou pouco, mas ainda tem alguma coisa. Agora apareceu uma chance de sair com o pessoal.';
  }

  return 'Você tem pouca margem. E seus amigos chamaram pra sair.';
}

/**
 * Corpo: a situação do rolê.
 */
function corpoRole(estado: EstadoJogo): string {
  const disponivel = estado.financeiro.disponivel;
  const reserva = estado.financeiro.reserva;

  return [
    'Seu grupo vai fazer um rolê no fim de semana — jantar, depois um lugar pra dançar.',
    '',
    'É o tipo de noite que você não faz toda hora, e o pessoal tá contando com você.',
    '',
    'O programa completo custa R$ 180. Se você quiser, dá pra ir só no jantar (R$ 90) — o pessoal entende.',
    '',
    `Você tem R$ ${disponivel} disponíveis e R$ ${reserva} na reserva.`,
  ].join('\n');
}

/**
 * Pensamento: varia conforme a reserva.
 */
function pensamentoRole(estado: EstadoJogo): string {
  const reserva = estado.financeiro.reserva;

  if (reserva >= 300) {
    return 'Eu tenho. Mas quero mesmo gastar isso ou tô indo porque o pessoal vai?';
  }
  if (reserva >= 100) {
    return 'Eu quero ir. Mas vou ter que escolher o que cabe.';
  }
  return 'Eu quero ir. Mas preciso olhar o que isso faz com o meu mês.';
}

export const MISSAO_2B: Missao = {
  id: 'missao-2b-vivendo-o-presente',
  titulo: 'O rolê',
  tipo: 'decisao',
  capituloId: 'cap-1',
  preRequisitos: ['missao-1-primeiro-orcamento'],
  licaoId: 'licao-2b',

  contexto: {
    abertura: aberturaPorEstado,
    corpo: corpoRole,
    pensamento: pensamentoRole,
  },

  opcoes: [
    // =========================================================
    // A — IR NO PROGRAMA COMPLETO
    // =========================================================
    {
      id: 'participar-completo',
      titulo: 'Vou no programa inteiro',
      descricao: 'Jantar e o lugar depois.',
      custo: CUSTO_COMPLETO,
      fonte: 'disponivel',
      impacto: {
        disponivel: -CUSTO_COMPLETO,
        bemEstar: +5,
        estresse: +2,
        xp: 150,
      },
      flags: ['participou-role-completo'],
      condicao: (estado) => estado.financeiro.disponivel >= CUSTO_COMPLETO,
      resultado:
        'Você foi no programa inteiro. A noite foi boa — e o gasto veio da sua margem do mês, não da reserva.',
      ancoragemLicao: 'Você escolheu participar do programa inteiro.',
    },

    // =========================================================
    // B — ADAPTAR O GASTO
    // =========================================================
    {
      id: 'adaptar-role',
      titulo: 'Vou adaptar o que dá',
      descricao: 'Escolho uma parte só.',
      custo: CUSTO_ADAPTADO,
      fonte: 'disponivel',
      impacto: {
        disponivel: -CUSTO_ADAPTADO,
        bemEstar: +3,
        estresse: -1,
        xp: 150,
      },
      flags: ['adaptou-role'],
      condicao: (estado) => estado.financeiro.disponivel >= CUSTO_ADAPTADO,
      resultado: 'Você adaptou o rolê. Participou de uma parte, ficou dentro do que cabia.',
      ancoragemLicao: 'Você escolheu adaptar o gasto.',
    },

    // =========================================================
    // C — NÃO IR
    // =========================================================
    {
      id: 'recusar-role',
      titulo: 'Não vou desta vez',
      descricao: 'Fico de fora, mas guardo o dinheiro.',
      custo: 0,
      fonte: 'nenhuma',
      impacto: {
        bemEstar: -3,
        estresse: -1,
        xp: 150,
      },
      flags: ['recusou-role'],
      gerarPendencia: {
        tipo: 'role-recusado',
        missaoOrigem: 'missao-2b-vivendo-o-presente',
        custo: CUSTO_COMPLETO,
        descricao: 'Aquele rolê que você recusou ficou na memória.',
      },
      resultado:
        'Você decidiu não ir desta vez. Sua margem ficou intacta — mas também ficou a sensação de ter perdido algo.',
      ancoragemLicao: 'Você escolheu não participar desta vez.',
    },
  ],
};
