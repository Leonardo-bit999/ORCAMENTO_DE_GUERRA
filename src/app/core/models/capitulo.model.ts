export interface Capitulo {
  id: string;
  titulo: string;
  descricao: string;
  missoesIds: string[];
  liberado: boolean;
  ordem: number;
}
