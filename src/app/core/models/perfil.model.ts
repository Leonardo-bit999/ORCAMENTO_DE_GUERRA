/* =========================================================
   Perfil — o personagem já criado, usado pelo jogo
   ========================================================= */

import { Character } from './character.model';

/**
 * O Perfil é o Character do onboarding adaptado para o jogo.
 * Ele contém o resultado do onboarding (nome, perfil, moradia, etc.)
 * mais os valores derivados que o jogo usa diretamente.
 */
export type Perfil = Character;

/**
 * Estado inicial do perfil.
 * Criado a partir do Character + dos cálculos iniciais.
 *
 * Este objeto é montado UMA VEZ, no momento em que o jogador
 * conclui a criação de personagem e entra no jogo pela primeira vez.
 */
export interface PerfilInicial {
  perfil: Perfil;
  disponivel: number; // renda mensal - despesas previstas
  reserva: number; // reservaInicial do perfil
  bemEstar: number; // 50 (neutro)
  estresse: number; // 30 (base)
}
