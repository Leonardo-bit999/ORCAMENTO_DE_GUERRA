/* =========================================================
   Capitulo — agrupamento de missões na jornada
   ========================================================= */

/**
 * Um capítulo da jornada.
 *
 * Define quais missões pertencem ao capítulo e se ele está liberado.
 * O jogo decide quais missões mostrar como disponíveis com base no
 * progresso do jogador e nos pré-requisitos de cada missão.
 */
export interface Capitulo {
  id: string;
  titulo: string;
  descricao: string;

  /** Ids de todas as missões do capítulo (incluindo ramificações). */
  missoesIds: string[];

  /** Se o capítulo está liberado para jogar. */
  liberado: boolean;

  /** Ordem do capítulo na jornada (1, 2, 3...). */
  ordem: number;
}
