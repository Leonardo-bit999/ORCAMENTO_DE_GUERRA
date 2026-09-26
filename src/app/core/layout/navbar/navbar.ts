import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type NavbarModo = 'home' | 'auth' | 'cadastro';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  /** Modo de exibição do navbar.
   *  - 'home'     → botão "Entrar" (leva pra /entrar)
   *  - 'auth'     → botão "Voltar ao site" (leva pra /)
   *  - 'cadastro' → botão "Voltar ao cadastro" (leva pra /entrar)
   */
  @Input() modo: NavbarModo = 'home';

  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
