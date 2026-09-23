import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Navbar } from '../../../core/layout/navbar/navbar';
import { Auth } from '../../../core/services/auth';
import { CharacterService } from '../../../core/services/character';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {
  private auth = inject(Auth);
  private char = inject(CharacterService);
  private router = inject(Router);

  usuario = this.auth.usuario;
  personagem = this.char.personagem();

  sair() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
