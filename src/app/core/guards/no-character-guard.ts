import { CanActivateFn } from '@angular/router';

export const noCharacterGuard: CanActivateFn = () => {
  return true;
};
