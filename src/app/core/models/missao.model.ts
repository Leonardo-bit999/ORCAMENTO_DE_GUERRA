/* =========================================================
   Missao — estrutura completa de uma missão
   ========================================================= */

import { EstadoJogo } from './estado-jogo.model';
import { Opcao } from './opcao.model';

/**
 * Tipo de missão.
 */
export type TipoMissao = 'decisao' | 'evento' | 'retrospectiva';

/**
 * Um texto de contexto que pode ser fixo ou dinâmico.
 * Se for string, é usado direto.
 * Se for função, recebe o EstadoJogo e devolve a string.
 */
export type TextoContexto = string | ((estado: EstadoJogo) => string);

/**
 * Bloco de contexto narrativo de uma missão.
 */
export interface ContextoMissao {
  abertura: TextoContexto; // primeira frase / título narrativo
  corpo: TextoContexto; // texto principal da situação
  pensamento?: TextoContexto; // pensamento do personagem (opcional)
}

/**
 * Uma missão do jogo.
 */
export interface Missao {
  id: string;
  titulo: string;
  tipo: TipoMissao;
  capituloId: string;

  /** Ids de missões que precisam estar concluídas pra essa ficar disponível. */
  preRequisitos: string[];

  contexto: ContextoMissao;
  opcoes: Opcao[];

  /** Id da lição que essa missão desbloqueia no Caderno. */
  licaoId: string;
}
