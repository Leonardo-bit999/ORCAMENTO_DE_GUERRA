import { CanActivateFn } from '@angular/router';

export const noCharacterGuard: CanActivateFn = (route, state) => {
  return true;
};
