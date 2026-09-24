/* =========================================================
   Missão 1 — Seu primeiro salário
   ========================================================= */

import { Missao } from '../../core/models/missao.model';
import { EstadoJogo } from '../../core/models/estado-jogo.model';

/**
 * Abertura dinâmica: muda conforme o perfil do personagem.
 */
function aberturaPorPerfil(estado: EstadoJogo): string {
  const perfilId = estado.perfil.perfilId;

  switch (perfilId) {
    case 'iniciante':
      return 'Caiu hoje. O primeiro salário de verdade na sua conta.';
    case 'planejador':
      return 'Caiu hoje. Você já olhou o extrato três vezes desde ontem.';
    case 'reorganizador':
      return 'Caiu hoje. Mas você já sabe que boa parte tem destino.';
    case 'independente':
      return 'Caiu hoje. E você sabe que precisa durar.';
    default:
      return 'Caiu hoje. Seu primeiro salário.';
  }
}

/**
 * Pensamento do personagem: varia conforme o perfil.
 */
function pensamentoPorPerfil(estado: EstadoJogo): string {
  const perfilId = estado.perfil.perfilId;

  switch (perfilId) {
    case 'iniciante':
      return 'Nunca tive que organizar isso antes.';
    case 'planejador':
      return 'Vou olhar cada centavo antes de fazer qualquer coisa.';
    case 'reorganizador':
      return 'Já sei que boa parte já tem destino. Vamos ver o que sobra.';
    case 'independente':
      return 'Isso tem que durar. Melhor pensar direito.';
    default:
      return 'O que eu faço com isso?';
  }
}

/**
 * Corpo da missão — o mesmo texto pra todos os perfis.
 * Mostra salário, despesas fixas e o que sobra.
 */
function corpoPrimeiroOrcamento(estado: EstadoJogo): string {
  const renda = estado.perfil.rendaMensal ?? 0;
  const despesas = estado.perfil.despesasPrevistas;
  const sobra = Math.max(0, renda - despesas);

  return [
    `R$ ${renda} na conta.`,
    '',
    'Antes de decidir qualquer coisa, olha o que já tem destino:',
    `• Suas despesas fixas do mês: R$ ${despesas}`,
    '',
    `Sobram R$ ${sobra} pra você decidir o que fazer.`,
    '',
    'O que você faz com esse valor?',
  ].join('\n');
}

export const MISSAO_1: Missao = {
  id: 'missao-1-primeiro-orcamento',
  titulo: 'Seu primeiro salário',
  tipo: 'decisao',
  capituloId: 'cap-1',
  preRequisitos: [],
  licaoId: 'licao-1',

  contexto: {
    abertura: aberturaPorPerfil,
    corpo: corpoPrimeiroOrcamento,
    pensamento: pensamentoPorPerfil,
  },

  opcoes: [
    // =========================================================
    // A — PRIORIZAR SEGURANÇA
    // =========================================================
    {
      id: 'priorizar-seguranca',
      titulo: 'Coloco a maior parte na reserva',
      descricao: 'Ando com o resto até o próximo salário.',
      custo: 500,
      fonte: 'disponivel',
      impacto: {
        disponivel: -500,
        reserva: +500,
        bemEstar: -6,
        estresse: +6,
        xp: 100,
      },
      flags: ['priorizou-seguranca'],
      resultado:
        'Você transferiu R$ 500 para a reserva. Sua base ficou mais sólida mas o mês vai ser mais apertado do que precisava.',
      ancoragemLicao: 'Você escolheu priorizar segurança. Guardou R$ 500 dos R$ 700 disponíveis.',
    },

    // =========================================================
    // B — CRIAR EQUILÍBRIO
    // =========================================================
    {
      id: 'criar-equilibrio',
      titulo: 'Guardo uma parte, uso uma parte',
      descricao: 'Nem tudo é sobre amanhã.',
      custo: 300,
      fonte: 'disponivel',
      impacto: {
        disponivel: -300,
        reserva: +300,
        bemEstar: +3,
        estresse: -3,
        xp: 100,
      },
      flags: ['escolheu-equilibrio'],
      resultado:
        'Você guardou R$ 300 e deixou R$ 400 pra viver o mês. Sua reserva é pequena, mas existe. Você não abriu mão de viver.',
      ancoragemLicao: 'Você escolheu equilibrar. Guardou R$ 300 e ficou com R$ 400 pra você.',
    },

    // =========================================================
    // C — PRIORIZAR O PRESENTE
    // =========================================================
    {
      id: 'priorizar-presente',
      titulo: 'Trabalhei pra isso. Vou viver agora.',
      descricao: 'Fim de período pede um pouco de ar.',
      custo: 100,
      fonte: 'disponivel',
      impacto: {
        disponivel: -100,
        reserva: +100,
        bemEstar: +10,
        estresse: -8,
        xp: 100,
      },
      flags: ['priorizou-presente'],
      resultado:
        'Você viveu o mês. Sobrou R$ 100 na reserva — pouco, mas existe. Quando o próximo imprevisto bater, você vai lembrar disso.',
      ancoragemLicao:
        'Você escolheu priorizar o presente. Guardou R$ 100 e usou R$ 600 com você mesmo.',
    },
  ],
};
