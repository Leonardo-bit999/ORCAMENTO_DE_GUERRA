import { Capitulo } from '../../core/models/capitulo.model';

export const CAPITULOS: Capitulo[] = [
  {
    id: 'cap-1',
    titulo: 'Primeiros Passos',
    descricao:
      'Aprenda a organizar o que você tem, escolher entre caminhos diferentes e lidar com o que vier.',
    missoesIds: [
      'missao-1-primeiro-orcamento',
      'missao-2a-construindo-seguranca',
      'missao-2b-vivendo-o-presente',
      'missao-3-o-imprevisto',
      'missao-4-o-que-ficou',
    ],
    liberado: true,
    ordem: 1,
  },
  {
    id: 'cap-2',
    titulo: 'A Vida Acontece',
    descricao:
      'Você já aprendeu a organizar, escolher e lidar com imprevistos. Agora as decisões terão consequências mais complexas.',
    missoesIds: [],
    liberado: false,
    ordem: 2,
  },
];

export function buscarCapitulo(id: string): Capitulo | undefined {
  return CAPITULOS.find((c) => c.id === id);
}
