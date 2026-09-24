/* =========================================================
   Lições do Caderno de Aprendizado
   ========================================================= */

import { Licao } from '../../core/models/licao.model';

export const LICOES: Licao[] = [
  {
    id: 'licao-1',
    missaoId: 'missao-1-primeiro-orcamento',
    titulo: 'Antes de decidir, descubra o que realmente sobra',
    conceito:
      'Orçamento não começa pelo que você quer fazer com o dinheiro. Começa pelo que já tem destino. Só depois de descontar os compromissos é que você sabe quanto está realmente disponível.\n\nIsso evita a armadilha mais comum: achar que você tem R$ 1.200 pra gastar quando, na verdade, só R$ 700 são seus pra decidir.',
  },
  {
    id: 'licao-2a',
    missaoId: 'missao-2a-construindo-seguranca',
    titulo: 'Reserva não é privação',
    conceito:
      'Reserva existe pra te dar opções, não pra te impedir de viver. Uma reserva que te faz dizer "não" a tudo deixa de ser segurança e vira um jeito de se limitar.\n\nA pergunta não é "posso gastar isso?". É: o que eu ganho e o que eu abro mão se eu gastar?',
  },
  {
    id: 'licao-2b',
    missaoId: 'missao-2b-vivendo-o-presente',
    titulo: 'Consumo consciente não é consumo zero',
    conceito:
      'Gastar com experiências não é errado. O problema é gastar sem saber o que você tá escolhendo. Consumo consciente é quando a decisão é sua não do grupo, não do impulso, não do medo de ficar de fora.\n\nA pergunta não é "eu deveria gastar?". É: o que eu tô escolhendo quando faço isso?',
  },
  {
    id: 'licao-3',
    missaoId: 'missao-3-o-imprevisto',
    titulo: 'Imprevisto não é castigo — é a vida',
    conceito:
      'Acontecer algo inesperado não significa que você fez algo errado. Significa que você vive num mundo onde coisas acontecem. O que importa não é evitar todo imprevisto é ter margem pra decidir com calma quando ele chega.\n\nReserva não é sobre ter muito dinheiro. É sobre ter escolhas quando o inesperado bate na porta.',
  },
  {
    id: 'licao-4',
    missaoId: 'missao-4-o-que-ficou',
    titulo: 'Decisões pequenas formam um caminho',
    conceito:
      'Nenhuma decisão que você tomou foi grande sozinha. Cada uma foi pequena. Mas olhando o conjunto, elas viraram uma situação e essa situação é sua.\n\nÉ isso que orçamento é, no fim das contas: um monte de decisões pequenas que, somadas, definem onde você está.',
  },
];

/**
 * Devolve uma lição pelo id.
 */
export function buscarLicao(id: string): Licao | undefined {
  return LICOES.find((l) => l.id === id);
}
