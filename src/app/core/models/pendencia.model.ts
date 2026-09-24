/* =========================================================
   Pendencia — decisão que ficou em aberto e pode voltar na M4
   ========================================================= */

/**
 * Tipos de pendência possíveis no MVP.
 * Cada uma nasce em uma missão específica e é lida na Missão 4.
 */
export type TipoPendencia = 'curso-adiado' | 'role-recusado' | 'imprevisto-adiado';

/**
 * Uma pendência ativa no jogo.
 * Só existe UMA por vez no MVP.
 */
export interface Pendencia {
  tipo: TipoPendencia;
  missaoOrigem: string; // id da missão onde nasceu
  custo: number; // valor para "revisitar" (ex: 250, 180, 120)
  descricao: string; // frase curta para exibir na M4
}
