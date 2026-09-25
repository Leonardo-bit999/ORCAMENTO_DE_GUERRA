import { EstadoJogo } from './estado-jogo.model';
import { Pendencia } from './pendencia.model';

export type FonteDinheiro = 'disponivel' | 'reserva' | 'disponivel-depois-reserva' | 'nenhuma';

export type EfeitoEspecial = 'consolidar-disponivel' | 'resolver-pendencia';

export interface ImpactoOpcao {
  disponivel?: number;
  reserva?: number;
  bemEstar?: number;
  estresse?: number;
  xp: number;
}

export interface Opcao {
  id: string;
  titulo: string;
  descricao?: string;

  custo: number;

  fonte: FonteDinheiro;

  impacto: ImpactoOpcao;

  efeitoEspecial?: EfeitoEspecial;

  flags?: string[];

  gerarPendencia?: Pendencia;

  resolverPendencia?: boolean;

  condicao?: (estado: EstadoJogo) => boolean;

  resultado: string;

  ancoragemLicao: string;
}
