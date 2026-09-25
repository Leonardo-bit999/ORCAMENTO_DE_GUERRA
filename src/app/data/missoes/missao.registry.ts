import { Missao } from '../../core/models/missao.model';
import { MISSAO_1 } from './missao-1';
import { MISSAO_2A } from './missao-2a';
import { MISSAO_2B } from './missao-2b';
import { MISSAO_3 } from './missao-3';
import { MISSAO_4 } from './missao-4';

export const MISSOES: Missao[] = [MISSAO_1, MISSAO_2A, MISSAO_2B, MISSAO_3, MISSAO_4];

export const MISSOES_POR_ID: Record<string, Missao> = MISSOES.reduce(
  (mapa, missao) => {
    mapa[missao.id] = missao;
    return mapa;
  },
  {} as Record<string, Missao>,
);

export function buscarMissao(id: string): Missao | undefined {
  return MISSOES_POR_ID[id];
}

export function missoesDoCapitulo(ids: string[]): Missao[] {
  return ids.map((id) => MISSOES_POR_ID[id]).filter((m): m is Missao => m !== undefined);
}
