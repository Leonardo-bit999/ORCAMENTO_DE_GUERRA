export type IconeConquista = 'primeiros-passos' | 'reserva' | 'planejador' | 'anti-impulso';

export interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  icone: IconeConquista;
  missoesIds: string[];
}
