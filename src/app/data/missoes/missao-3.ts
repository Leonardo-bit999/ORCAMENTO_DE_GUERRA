import { Missao } from '../../core/models/missao.model';
import { EstadoJogo } from '../../core/models/estado-jogo.model';

const CUSTO_CONSERTO = 120;
const CUSTO_ALTERNATIVA = 60;

function aberturaImprevisto(estado: EstadoJogo): string {
  const reserva = estado.financeiro.reserva;
  const disponivel = estado.financeiro.disponivel;

  const parteReserva = (() => {
    if (reserva >= 400) {
      return 'Você tem uma reserva que te dá margem pra lidar com isso sem aperto.';
    }
    if (reserva >= 100) {
      return 'Você tem alguma margem, mas precisa pensar antes de mexer nela.';
    }
    return 'Sua margem é pequena. Essa decisão vai exigir cuidado.';
  })();

  const parteDisponivel = (() => {
    if (disponivel >= 300) {
      return 'E você tem algum dinheiro disponível pra resolver sem comprometer o resto.';
    }
    if (disponivel >= 100) {
      return 'Seu dinheiro disponível tá no limite.';
    }
    return 'E o seu disponível já tá quase zerado.';
  })();

  return `${parteReserva} ${parteDisponivel}`;
}

function corpoImprevisto(estado: EstadoJogo): string {
  const disponivel = estado.financeiro.disponivel;
  const reserva = estado.financeiro.reserva;

  return [
    '⚡ O celular caiu no chão. A tela rachou em três lugares.',
    '',
    `O conserto custa R$ ${CUSTO_CONSERTO}. O aparelho funciona, mas a tela tá difícil de usar.`,
    '',
    'Você depende desse celular pra tudo — trabalho, contato, banco.',
    '',
    `Você tem R$ ${disponivel} disponíveis e R$ ${reserva} na reserva.`,
  ].join('\n');
}

function pensamentoImprevisto(estado: EstadoJogo): string {
  const total = estado.financeiro.disponivel + estado.financeiro.reserva;

  if (total >= CUSTO_CONSERTO * 2) {
    return 'Dá pra resolver. Mas vou ter que decidir como.';
  }
  if (total >= CUSTO_CONSERTO) {
    return 'Isso vai apertar. Mas dá pra resolver de algum jeito.';
  }
  return 'Isso vai ser difícil. Não tenho como pagar isso agora.';
}

export const MISSAO_3: Missao = {
  id: 'missao-3-o-imprevisto',
  titulo: 'O celular caiu',
  tipo: 'evento',
  capituloId: 'cap-1',
  preRequisitos: ['missao-2a-construindo-seguranca', 'missao-2b-vivendo-o-presente'],
  licaoId: 'licao-3',

  contexto: {
    abertura: aberturaImprevisto,
    corpo: corpoImprevisto,
    pensamento: pensamentoImprevisto,
  },

  opcoes: [
    {
      id: 'consertar-agora',
      titulo: 'Conserto agora',
      descricao: 'Uso o que tenho — disponível primeiro, reserva se precisar.',
      custo: CUSTO_CONSERTO,
      fonte: 'disponivel-depois-reserva',
      impacto: {
        disponivel: 0,
        reserva: 0,
        bemEstar: +2,
        estresse: +3,
        xp: 200,
      },
      flags: ['consertou-imprevisto'],
      resultado:
        'Você resolveu agora. O celular voltou a funcionar. Se precisou usar a reserva, ela diminuiu — mas o problema foi resolvido.',
      ancoragemLicao: 'Você escolheu resolver o problema agora.',
    },

    {
      id: 'adiar-conserto',
      titulo: 'Adio o conserto',
      descricao: 'Vou usando quebrado até sobrar.',
      custo: 0,
      fonte: 'nenhuma',
      impacto: {
        bemEstar: -4,
        estresse: +5,
        xp: 200,
      },
      flags: ['adiou-imprevisto'],
      gerarPendencia: {
        tipo: 'imprevisto-adiado',
        missaoOrigem: 'missao-3-o-imprevisto',
        custo: CUSTO_CONSERTO,
        descricao: 'O celular continua com a tela rachada.',
      },
      resultado:
        'Você decidiu esperar. O celular continua funcionando — mas você vai conviver com o problema até resolver.',
      ancoragemLicao: 'Você escolheu adiar o conserto.',
    },

    {
      id: 'alternativa-barata',
      titulo: 'Procuro uma alternativa mais barata',
      descricao: 'Conserto mínimo, só pra parar de incomodar.',
      custo: CUSTO_ALTERNATIVA,
      fonte: 'disponivel-depois-reserva',
      impacto: {
        disponivel: 0,
        reserva: 0,
        bemEstar: 0,
        estresse: +1,
        xp: 200,
      },
      flags: ['improvisou-imprevisto'],
      resultado:
        'Você encontrou alguém que faz um conserto mais simples por R$ 60. A tela não fica perfeita, mas dá pra usar.',
      ancoragemLicao: 'Você escolheu uma solução alternativa.',
    },
  ],
};
