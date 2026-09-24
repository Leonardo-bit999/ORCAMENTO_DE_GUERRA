/* =========================================================
   Missão 2A — Uma chance de crescer
   ========================================================= */

import { Missao } from '../../core/models/missao.model';
import { EstadoJogo } from '../../core/models/estado-jogo.model';

const CUSTO_CURSO = 250;

/**
 * Abertura dinâmica: reconhece o estado da reserva do jogador.
 * Diferente da M1, aqui a leitura é sobre o DINHEIRO, não o perfil.
 */
function aberturaPorEstado(estado: EstadoJogo): string {
  const reserva = estado.financeiro.reserva;

  if (reserva >= 400) {
    return 'Você tem uma reserva que te dá alguma margem. Apareceu uma coisa que vale a pena considerar.';
  }

  if (reserva >= 100) {
    return 'Você tem uma reserva pequena. Apareceu uma oportunidade que custa quase tudo que você guardou.';
  }

  return 'Você tem pouca margem. Apareceu uma oportunidade que exige uma decisão cuidadosa.';
}

/**
 * Corpo da missão — a situação.
 */
function corpoCurso(estado: EstadoJogo): string {
  const disponivel = estado.financeiro.disponivel;
  const reserva = estado.financeiro.reserva;

  return [
    'Um curso curto que você queria fazer tá com inscrições abertas.',
    '',
    `Custa R$ ${CUSTO_CURSO}. É online, dá pra encaixar na rotina, e é o tipo de coisa que te deixaria mais preparado pra oportunidades melhores.`,
    '',
    'O pagamento é à vista — não parcela.',
    '',
    `Você tem R$ ${disponivel} disponíveis e R$ ${reserva} na reserva.`,
  ].join('\n');
}

/**
 * Pensamento do personagem — varia conforme a reserva.
 */
function pensamentoCurso(estado: EstadoJogo): string {
  const reserva = estado.financeiro.reserva;

  if (reserva >= 400) {
    return 'Eu tenho como pagar sem aperto. Mas será que vale mexer na reserva?';
  }
  if (reserva >= 100) {
    return 'Se eu pagar isso, minha reserva quase acaba. Vale a pena agora?';
  }
  return 'Vou ter que olhar com cuidado. Não posso me comprometer sem pensar.';
}

export const MISSAO_2A: Missao = {
  id: 'missao-2a-construindo-seguranca',
  titulo: 'Uma chance de crescer',
  tipo: 'decisao',
  capituloId: 'cap-1',
  preRequisitos: ['missao-1-primeiro-orcamento'],
  licaoId: 'licao-2a',

  contexto: {
    abertura: aberturaPorEstado,
    corpo: corpoCurso,
    pensamento: pensamentoCurso,
  },

  opcoes: [
    // =========================================================
    // A — PAGAR COM O DISPONÍVEL
    // =========================================================
    {
      id: 'pagar-com-disponivel',
      titulo: 'Pago com o que tenho',
      descricao: 'Não mexo na reserva.',
      custo: CUSTO_CURSO,
      fonte: 'disponivel',
      impacto: {
        disponivel: -CUSTO_CURSO,
        bemEstar: +3,
        estresse: +4,
        xp: 150,
      },
      flags: ['cursou-sem-mexer-reserva'],
      condicao: (estado) => estado.financeiro.disponivel >= CUSTO_CURSO,
      resultado:
        'Você pagou o curso sem tocar na reserva. Vai ter que segurar alguns gastos pequenos — mas sua reserva continua onde estava.',
      ancoragemLicao: 'Você escolheu manter a reserva e ajustar os gastos.',
    },

    // =========================================================
    // B — USAR A RESERVA
    // =========================================================
    {
      id: 'usar-reserva',
      titulo: 'Uso parte da reserva',
      descricao: 'A reserva tá aí pra isso.',
      custo: CUSTO_CURSO,
      fonte: 'reserva',
      impacto: {
        reserva: -CUSTO_CURSO,
        bemEstar: +4,
        estresse: -2,
        xp: 150,
      },
      flags: ['usou-reserva-para-investir'],
      condicao: (estado) => estado.financeiro.reserva >= CUSTO_CURSO,
      resultado:
        'Você usou R$ 250 da reserva. Ela ficou menor, mas você fez algo que queria fazer por você.',
      ancoragemLicao: 'Você escolheu usar parte da reserva.',
    },

    // =========================================================
    // C — ADIAR
    // =========================================================
    {
      id: 'adiar-curso',
      titulo: 'Adio o curso',
      descricao: 'Vou esperar o momento certo.',
      custo: 0,
      fonte: 'nenhuma',
      impacto: {
        bemEstar: -3,
        estresse: -1,
        xp: 150,
      },
      flags: ['adiou-investimento-pessoal'],
      gerarPendencia: {
        tipo: 'curso-adiado',
        missaoOrigem: 'missao-2a-construindo-seguranca',
        custo: CUSTO_CURSO,
        descricao: 'O curso que você adiou continua disponível.',
      },
      resultado:
        'Você decidiu esperar. A reserva permanece intacta, mas a oportunidade fica para depois.',
      ancoragemLicao: 'Você escolheu adiar a decisão.',
    },
  ],
};
