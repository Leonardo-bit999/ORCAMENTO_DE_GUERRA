/* =========================================================
   HistoricoEntry — snapshot de uma decisão para a timeline
   ========================================================= */

/**
 * Registro de uma decisão tomada.
 * Um por missão concluída.
 *
 * Usado para montar a timeline da "Sua Jornada Financeira".
 */
export interface HistoricoEntry {
  missaoId: string; // ex: 'missao-1-primeiro-orcamento'
  titulo: string; // ex: 'Seu primeiro salário'
  decisao: string; // id da opção escolhida
  textoCurto: string; // ex: 'Você decidiu guardar R$ 300.'

  // Snapshot do estado DEPOIS da decisão
  disponivelDepois: number;
  reservaDepois: number;
  bemEstarDepois: number;
  estresseDepois: number;
  xpDepois: number;

  // Quando aconteceu
  timestamp: string; // ISO
}
