import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GameStateService } from '../services/game-state';

export const hasCharacterGuard: CanActivateFn = () => {
  const gameState = inject(GameStateService);
  const router = inject(Router);

  if (!gameState.temEstado()) {
    gameState.carregar();
  }

  if (gameState.temEstado()) {
    return true;
  }

  router.navigate(['/criar-personagem']);
  return false;
};
