import { Perfil } from './perfil.model';
import { Pendencia } from './pendencia.model';
import { HistoricoEntry } from './historico-entry.model';

export interface EstadoFinanceiro {
  disponivel: number;
  reserva: number;
}
export interface Indicadores {
  bemEstar: number;
  estresse: number;
}
export interface Progressao {
  xp: number;
  missoesConcluidas: string[];
  licoesDesbloqueadas: string[];
  conquistas: string[];
}
export interface EstadoJogo {
  perfil: Perfil;
  financeiro: EstadoFinanceiro;
  indicadores: Indicadores;
  progressao: Progressao;
  flags: string[];
  pendencia: Pendencia | null;
  historico: HistoricoEntry[];
}
