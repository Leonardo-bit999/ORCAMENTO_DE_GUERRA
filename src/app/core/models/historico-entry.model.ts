export interface HistoricoEntry {
  missaoId: string;
  titulo: string;
  decisao: string;
  textoCurto: string;

  disponivelDepois: number;
  reservaDepois: number;
  bemEstarDepois: number;
  estresseDepois: number;
  xpDepois: number;
  timestamp: string;
}
