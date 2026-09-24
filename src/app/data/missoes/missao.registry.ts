/* =========================================================
   Registry de Missões — junta todas as missões em um mapa
   ========================================================= */

import { Missao } from '../../core/models/missao.model';
import { MISSAO_1 } from './missao-1';
import { MISSAO_2A } from './missao-2a';
import { MISSAO_2B } from './missao-2b';
import { MISSAO_3 } from './missao-3';
import { MISSAO_4 } from './missao-4';

/**
 * Lista de todas as missões do jogo.
 * Ordem importa: a M4 é a última missão do capítulo (final).
 */
export const MISSOES: Missao[] = [MISSAO_1, MISSAO_2A, MISSAO_2B, MISSAO_3, MISSAO_4];

/**
 * Mapa id → Missao. Lookup O(1).
 */
export const MISSOES_POR_ID: Record<string, Missao> = MISSOES.reduce(
  (mapa, missao) => {
    mapa[missao.id] = missao;
    return mapa;
  },
  {} as Record<string, Missao>,
);

/**
 * Busca uma missão pelo id.
 */
export function buscarMissao(id: string): Missao | undefined {
  return MISSOES_POR_ID[id];
}

/**
 * Devolve todas as missões de um capítulo, na ordem em que aparecem.
 */
export function missoesDoCapitulo(ids: string[]): Missao[] {
  return ids.map((id) => MISSOES_POR_ID[id]).filter((m): m is Missao => m !== undefined);
}
