export type TipoPendencia = 'curso-adiado' | 'role-recusado' | 'imprevisto-adiado';

export interface Pendencia {
  tipo: TipoPendencia;
  missaoOrigem: string;
  custo: number;
  descricao: string;
}
