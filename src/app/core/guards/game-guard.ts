import { CanActivateFn } from '@angular/router';

export const gameGuard: CanActivateFn = (route, state) => {
  return true;
};
