/* =========================================================
   Conquista — representação de uma conquista desbloqueável
   ========================================================= */

/**
 * Tipo de ícone da conquista.
 * Cada tipo é renderizado como um SVG diferente no componente.
 */
export type IconeConquista =
    | 'primeiros-passos'
    | 'reserva'
    | 'planejador'
    | 'anti-impulso';

/**
 * Uma conquista do jogo.
 */
export interface Conquista {
    id: string;
    titulo: string;
    descricao: string;

    /** Ícone (chave do SVG). */
    icone: IconeConquista;

    /**
     * Id da missão que desbloqueia essa conquista.
     * Quando essa missão for concluída, a conquista é adicionada.
     */
    missaoId: string;
}