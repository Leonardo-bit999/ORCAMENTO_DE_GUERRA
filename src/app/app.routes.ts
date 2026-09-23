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
  // Redirects das rotas antigas
  {
    path: 'cadastro',
    redirectTo: '/entrar',
    pathMatch: 'full',
    // Usamos uma rota que aceita query:
    // na prática: /cadastro → /entrar
    // se quiser forçar tab=cadastro, use um componente redirecionador
  },
  { path: 'login', redirectTo: '/entrar', pathMatch: 'full' },

  {
    path: 'criar-personagem',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/criar-personagem/criacao/criacao').then((m) => m.Criacao),
  },

  {
    path: 'game',
    canActivate: [authGuard, hasCharacterGuard],
    loadComponent: () => import('./features/criar-personagem/game/game').then((m) => m.Game),
  },

  { path: '**', redirectTo: '' },
];
