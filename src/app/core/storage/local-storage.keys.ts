/* =========================================================
   Chaves do localStorage
   ========================================================= */

/**
 * Chave principal do EstadoJogo do jogo.
 * Todo o estado do jogador é salvo aqui.
 */
export const CHAVE_ESTADO_JOGO = 'orcamento-de-guerra:estado';

/**
 * Versão do schema do estado.
 * Serve pra invalidar estados antigos se o formato mudar.
 * (Ainda não usada no MVP, mas útil pra v2.)
 */
export const VERSAO_SCHEMA = 1;

/**
 * Prefixo de todas as chaves do jogo.
 * Útil pra limpar tudo relacionado ao jogo de uma vez.
 */
export const PREFIXO_JOGO = 'orcamento-de-guerra:';
