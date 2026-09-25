export type MockupTipo = 'missao' | 'decisao' | 'resultado' | 'licao';

export interface SlideComoJoga {
  id: string;
  numero: string;
  eyebrow: string;
  titulo: string;
  texto: string;
  mockup: MockupTipo;
}

export const SLIDES_COMO_JOGA: SlideComoJoga[] = [
  {
    id: 'situacao',
    numero: '01',
    eyebrow: 'Situação',
    titulo: 'Uma cena da vida real.',
    texto:
      'Cada missão começa com um contexto: o salário que caiu, o convite inesperado, a conta que chegou. Nada acontece fora da sua história.',
    mockup: 'missao',
  },
  {
    id: 'decisao',
    numero: '02',
    eyebrow: 'Decisão',
    titulo: 'Você escolhe um caminho.',
    texto:
      'Nenhuma decisão é perfeita. Cada uma tem um custo e um efeito. O jogo não diz qual é certa — ele te deixa decidir.',
    mockup: 'decisao',
  },
  {
    id: 'consequencia',
    numero: '03',
    eyebrow: 'Consequência',
    titulo: 'O jogo mostra o que aconteceu.',
    texto:
      'Sua decisão muda o cenário. Às vezes pra melhor. Às vezes não. E o que mudou fica registrado.',
    mockup: 'resultado',
  },
  {
    id: 'aprendizado',
    numero: '04',
    eyebrow: 'Aprendizado',
    titulo: 'Você entende o que estava em jogo.',
    texto:
      'Uma lição curta fecha a missão. Não é aula — é uma frase que te faz ver a decisão de outro jeito.',
    mockup: 'licao',
  },
];

export const INTERVALO_AUTOPLAY_MS = 6000;
