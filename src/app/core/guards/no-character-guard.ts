import { CanActivateFn } from '@angular/router';

/**
 * TODO: ligar depois que decidirmos a regra.
 * Ideia: se o usuário JÁ tem personagem, redirecionar para /game.
 * Por enquanto libera geral.
 */
export const noCharacterGuard: CanActivateFn = () => {
  return true;
};
