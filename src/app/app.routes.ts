import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { hasCharacterGuard } from './core/guards/has-character-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'entrar',
    loadComponent: () => import('./features/auth/entrar/entrar').then((m) => m.Entrar),
  },
  { path: 'cadastro', redirectTo: '/entrar', pathMatch: 'full' },
  { path: 'login', redirectTo: '/entrar', pathMatch: 'full' },

  {
    path: 'criar-personagem',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/criar-personagem/criacao/criacao').then((m) => m.Criacao),
  },

  // Jornada (home do jogo)
  {
    path: 'jornada',
    canActivate: [authGuard, hasCharacterGuard],
    loadComponent: () => import('./features/jogo/jornada/jornada').then((m) => m.Jornada),
  },

  { path: '**', redirectTo: '' },
];
