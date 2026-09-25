import { Character } from './character.model';

export type Perfil = Character;

export interface PerfilInicial {
  perfil: Perfil;
  disponivel: number;
  reserva: number;
  bemEstar: number;
  estresse: number;
}
