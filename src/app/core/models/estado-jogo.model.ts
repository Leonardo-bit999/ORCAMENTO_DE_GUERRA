/* =========================================================
   EstadoJogo — objeto raiz do jogo
   ========================================================= */

import { Perfil } from './perfil.model';
import { Pendencia } from './pendencia.model';
import { HistoricoEntry } from './historico-entry.model';

/**
 * Dinheiro real do jogo.
 * Não existem outros valores financeiros no MVP.
 */
export interface EstadoFinanceiro {
  disponivel: number; // renda mensal - despesas - gastos
  reserva: number; // dinheiro guardado separadamente
}

/**
 * Indicadores emocionais / narrativos.
 * Não bloqueiam nada. Apenas refletem a situação.
 */
export interface Indicadores {
  bemEstar: number; // 0-100
  estresse: number; // 0-100
}

/**
 * Progresso do jogador.
 */
export interface Progressao {
  xp: number;
  missoesConcluidas: string[]; // ids das missões concluídas
  licoesDesbloqueadas: string[]; // ids das lições desbloqueadas
}

/**
 * EstadoJogo — objeto central que representa tudo o que o jogador construiu.
 * É persistido no localStorage após cada decisão.
 */
export interface EstadoJogo {
  perfil: Perfil;
  financeiro: EstadoFinanceiro;
  indicadores: Indicadores;
  progressao: Progressao;
  flags: string[];
  pendencia: Pendencia | null;
  historico: HistoricoEntry[];
}
