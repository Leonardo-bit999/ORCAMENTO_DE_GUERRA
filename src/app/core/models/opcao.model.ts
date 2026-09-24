/* =========================================================
   Opcao — uma escolha possível dentro de uma missão
   ========================================================= */

import { EstadoJogo } from './estado-jogo.model';
import { Pendencia } from './pendencia.model';

/**
 * De onde sai o dinheiro de uma opção.
 * - 'disponivel': sai do disponível
 * - 'reserva': sai da reserva
 * - 'disponivel-depois-reserva': sai do disponível primeiro, depois da reserva
 * - 'nenhuma': não envolve dinheiro
 */
export type FonteDinheiro = 'disponivel' | 'reserva' | 'disponivel-depois-reserva' | 'nenhuma';

/**
 * Efeito especial que precisa de cálculo dinâmico no DecisionService.
 * - 'consolidar-disponivel': move todo o disponível para a reserva
 * - 'resolver-pendencia': usa o custo da pendência como fonte do gasto
 */
export type EfeitoEspecial = 'consolidar-disponivel' | 'resolver-pendencia';

/**
 * Impacto de uma opção em cada parte do estado.
 * Os valores são DELTAS (positivos ou negativos).
 *
 * ATENÇÃO: quando `fonte === 'disponivel-depois-reserva'` ou quando
 * `efeitoEspecial` está definido, os campos `disponivel` e `reserva`
 * do impacto são IGNORADOS — o DecisionService calcula dinamicamente.
 */
export interface ImpactoOpcao {
  disponivel?: number;
  reserva?: number;
  bemEstar?: number;
  estresse?: number;
  xp: number; // sempre obrigatório
}

/**
 * Uma opção de decisão dentro de uma missão.
 */
export interface Opcao {
  id: string;
  titulo: string;
  descricao?: string;

  /** Custo em R$ (0 se a opção não envolve dinheiro). */
  custo: number;

  /** De onde sai o custo. */
  fonte: FonteDinheiro;

  /** Deltas aplicados ao estado após escolher. */
  impacto: ImpactoOpcao;

  /**
   * Efeito que precisa de cálculo dinâmico no DecisionService.
   * Quando definido, `impacto.disponivel` e `impacto.reserva` são ignorados.
   */
  efeitoEspecial?: EfeitoEspecial;

  /** Flags adicionadas ao estado (opcional). */
  flags?: string[];

  /** Se essa opção cria uma pendência (opcional). */
  gerarPendencia?: Pendencia;

  /** Se essa opção resolve a pendência ativa (opcional). */
  resolverPendencia?: boolean;

  /**
   * Se definida, a opção só aparece quando a função retorna true.
   * Recebe o EstadoJogo atual e devolve boolean.
   */
  condicao?: (estado: EstadoJogo) => boolean;

  /** Texto narrativo mostrado após a decisão. */
  resultado: string;

  /**
   * Frase personalizada que aparece na lição do Caderno quando
   * essa opção é escolhida.
   */
  ancoragemLicao: string;
}
