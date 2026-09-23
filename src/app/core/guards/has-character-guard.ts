import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CharacterService } from '../services/character';

export const hasCharacterGuard: CanActivateFn = () => {
  const svc = inject(CharacterService);
  const router = inject(Router);

  if (svc.temPersonagem()) return true;

  router.navigate(['/criar-personagem']);
  return false;
};
