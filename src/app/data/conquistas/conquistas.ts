/* =========================================================
   Conquistas do jogo
   ========================================================= */

import { Conquista } from '../../core/models/conquista.model';

export const CONQUISTAS: Conquista[] = [
    {
        id: 'primeiros-passos',
        titulo: 'Primeiros Passos',
        descricao: 'Você tomou sua primeira decisão na sua jornada financeira.',
        icone: 'primeiros-passos',
        missaoId: 'missao-1-primeiro-orcamento',
    },
];

/**
 * Busca uma conquista por id.
 */
export function buscarConquista(id: string): Conquista | undefined {
    return CONQUISTAS.find((c) => c.id === id);
}

/**
 * Devolve a conquista que uma missão desbloqueia (se houver).
 */
export function conquistaDaMissao(missaoId: string): Conquista | undefined {
    return CONQUISTAS.find((c) => c.missaoId === missaoId);
}