/* =========================================================
   Missão 4 — O que ficou (retrospectiva + decisão final)
   ========================================================= */

import { Missao } from '../../core/models/missao.model';
import { EstadoJogo } from '../../core/models/estado-jogo.model';

/**
 * Mapeia o objetivo do jogador pra uma frase curta.
 */
function objetivoFrase(estado: EstadoJogo): string {
  const objetivo = estado.perfil.objetivo;

  switch (objetivo) {
    case 'reserva':
      return 'Você começou dizendo que queria construir uma reserva.';
    case 'sair-casa':
      return 'Você começou dizendo que queria sair da casa dos pais.';
    case 'comprar':
      return 'Você começou dizendo que queria comprar algo importante.';
    case 'evitar-dividas':
      return 'Você começou dizendo que queria evitar dívidas.';
    case 'ajudar-familia':
      return 'Você começou dizendo que queria ajudar a família.';
    case 'projeto':
      return 'Você começou dizendo que queria começar um projeto.';
    case 'outro':
      return estado.perfil.objetivoOutroTexto?.trim()
        ? `Você começou com um objetivo: ${estado.perfil.objetivoOutroTexto.trim()}.`
        : 'Você começou com um objetivo próprio.';
    default:
      return 'Você começou com um objetivo em mente.';
  }
}

/**
 * Abertura: reconhece objetivo + estado + pendência.
 */
function aberturaFechamento(estado: EstadoJogo): string {
  const partes: string[] = [];

  // 1. Objetivo
  partes.push(objetivoFrase(estado));

  // 2. Estado atual
  const disponivel = estado.financeiro.disponivel;
  const reserva = estado.financeiro.reserva;

  partes.push(
    `E olhando agora, sua reserva tá em R$ ${reserva} e seu disponível tá em R$ ${disponivel}.`,
  );

  // 3. Pendência
  if (estado.pendencia) {
    partes.push(estado.pendencia.descricao);
  }

  return partes.join('\n\n');
}

/**
 * Corpo: situação final do capítulo.
 */
function corpoFechamento(estado: EstadoJogo): string {
  const disponivel = estado.financeiro.disponivel;

  if (disponivel > 0) {
    return [
      `Chegou o fim do período. Sobrou R$ ${disponivel} na sua conta.`,
      '',
      'Você pode fazer uma coisa com esse valor — e essa coisa vai marcar como o próximo capítulo começa.',
    ].join('\n');
  }

  if (estado.financeiro.reserva > 0) {
    return [
      'Chegou o fim do período. Sua margem acabou, mas ainda tem reserva.',
      '',
      'O que você decidir aqui marca como o próximo capítulo começa.',
    ].join('\n');
  }

  return [
    'Chegou o fim do período. Você não tem caixa nem reserva.',
    '',
    'O período fechou no zero — e isso também é um ponto de partida.',
  ].join('\n');
}

/**
 * Pensamento: varia conforme a situação.
 */
function pensamentoFechamento(estado: EstadoJogo): string {
  if (estado.pendencia) {
    return 'Tem uma coisa que ficou em aberto. Vou decidir se vale voltar nela.';
  }
  if (estado.financeiro.disponivel > 0) {
    return 'O que eu faço com o que sobrou?';
  }
  return 'O capítulo acabou. O que eu levo disso?';
}

export const MISSAO_4: Missao = {
  id: 'missao-4-o-que-ficou',
  titulo: 'O que ficou',
  tipo: 'retrospectiva',
  capituloId: 'cap-1',
  preRequisitos: ['missao-3-o-imprevisto'],
  licaoId: 'licao-4',

  contexto: {
    abertura: aberturaFechamento,
    corpo: corpoFechamento,
    pensamento: pensamentoFechamento,
  },

  opcoes: [
    // =========================================================
    // A — CONSOLIDAR
    // =========================================================
    {
      id: 'consolidar',
      titulo: 'Vou consolidar o que construí',
      descricao: 'Movo o que sobrou pra reserva.',
      custo: 0,
      fonte: 'disponivel',
      efeitoEspecial: 'consolidar-disponivel',
      impacto: {
        xp: 200,
      },
      flags: ['fechou-consolidando'],
      condicao: (estado) => estado.financeiro.disponivel > 0,
      resultado:
        'Você moveu o que sobrou pra reserva. O próximo capítulo começa com mais proteção.',
      ancoragemLicao: 'Você fechou o capítulo consolidando.',
    },

    // =========================================================
    // B — REVISITAR UMA DECISÃO ANTERIOR
    // =========================================================
    {
      id: 'revisitar',
      titulo: 'Vou revisitar uma decisão',
      descricao: 'Tem uma coisa que ficou em aberto. Vou resolver agora.',
      custo: 0,
      fonte: 'disponivel-depois-reserva',
      efeitoEspecial: 'resolver-pendencia',
      impacto: {
        bemEstar: +5,
        estresse: -3,
        xp: 200,
      },
      flags: ['fechou-revisitando'],
      resolverPendencia: true,
      condicao: (estado) => estado.pendencia !== null,
      resultado:
        'Você voltou atrás numa coisa que tinha deixado pendente. Nem toda decisão precisa ser final.',
      ancoragemLicao: 'Você fechou o capítulo revisitando uma decisão.',
    },

    // =========================================================
    // C — ENCERRAR SEM MEXER
    // =========================================================
    {
      id: 'encerrar',
      titulo: 'Vou deixar como está',
      descricao: 'O capítulo acabou. Vou seguir.',
      custo: 0,
      fonte: 'nenhuma',
      impacto: {
        xp: 200,
      },
      flags: ['fechou-encerrando'],
      resultado: 'Você decidiu não mexer. O capítulo fechou do jeito que estava.',
      ancoragemLicao: 'Você fechou o capítulo encerrando sem mexer.',
    },
  ],
};
