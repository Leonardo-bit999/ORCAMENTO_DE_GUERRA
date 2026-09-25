import { EstadoJogo } from './estado-jogo.model';
import { Opcao } from './opcao.model';

export type TipoMissao = 'decisao' | 'evento' | 'retrospectiva';

export type TextoContexto = string | ((estado: EstadoJogo) => string);
export interface ContextoMissao {
  abertura: TextoContexto;
  corpo: TextoContexto;
  pensamento?: TextoContexto;
}
export interface Missao {
  id: string;
  titulo: string;
  tipo: TipoMissao;
  capituloId: string;
  preRequisitos: string[];

  contexto: ContextoMissao;
  opcoes: Opcao[];
  licaoId: string;
}
