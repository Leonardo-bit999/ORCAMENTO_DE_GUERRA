/* =========================================================
   Licao — item do Caderno de Aprendizado
   ========================================================= */

/**
 * Uma lição desbloqueada por uma missão.
 *
 * A ancoragem personalizada (frase específica pra escolha do jogador)
 * NÃO fica aqui — ela fica em cada Opcao (`ancoragemLicao`).
 * A lição define apenas o conceito geral.
 */
export interface Licao {
  id: string;
  titulo: string;

  /** Texto curto: 2 parágrafos no máximo. */
  conceito: string;

  /** Id da missão que desbloqueia essa lição. */
  missaoId: string;
}
