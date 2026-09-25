import { Conquista } from '../../core/models/conquista.model';

export const CONQUISTAS: Conquista[] = [
  {
    id: 'primeiros-passos',
    titulo: 'Primeiros Passos',
    descricao: 'Você tomou sua primeira decisão na sua jornada financeira.',
    icone: 'primeiros-passos',
    missoesIds: ['missao-1-primeiro-orcamento'],
  },
  {
    id: 'olho-no-orcamento',
    titulo: 'Olho no Orçamento',
    descricao: 'Você concluiu a primeira escolha da sua jornada com consciência.',
    icone: 'planejador',
    missoesIds: ['missao-2a-construindo-seguranca', 'missao-2b-vivendo-o-presente'],
  },
  {
    id: 'sobrevivente',
    titulo: 'Sobrevivente',
    descricao: 'Você lidou com um imprevisto sem deixar a peteca cair.',
    icone: 'anti-impulso',
    missoesIds: ['missao-3-o-imprevisto'],
  },
];

export function buscarConquista(id: string): Conquista | undefined {
  return CONQUISTAS.find((c) => c.id === id);
}

export function conquistaDaMissao(missaoId: string): Conquista | undefined {
  return CONQUISTAS.find((c) => c.missoesIds.includes(missaoId));
}
