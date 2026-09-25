import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GameHud } from '../game-hud/game-hud';
import { Auth } from '../../../core/services/auth';

interface ItemMenu {
  rota: string;
  label: string;
  icone: 'jornada' | 'caderno' | 'conquistas' | 'timeline' | 'perfil';
}

@Component({
  selector: 'app-game-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, GameHud],
  templateUrl: './game-layout.html',
  styleUrl: './game-layout.css',
})
export class GameLayout {
  private router = inject(Router);
  private auth = inject(Auth);

  menuAberto = signal(false);

  itensMenu: ItemMenu[] = [
    { rota: '/jornada', label: 'Jornada', icone: 'jornada' },
    { rota: '/caderno', label: 'Caderno', icone: 'caderno' },
    { rota: '/conquistas', label: 'Conquistas', icone: 'conquistas' },
    { rota: '/jornada-financeira', label: 'Sua Jornada', icone: 'timeline' },
    { rota: '/perfil', label: 'Perfil', icone: 'perfil' },
  ];

  toggleMenu() {
    this.menuAberto.update((v) => !v);
  }

  fecharMenu() {
    this.menuAberto.set(false);
  }

  sair() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
