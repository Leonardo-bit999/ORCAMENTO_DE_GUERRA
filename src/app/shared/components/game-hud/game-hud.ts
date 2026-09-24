/* =========================================================
   GameHud — barra de indicadores do jogador
   ========================================================= */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../../core/services/game-state';

@Component({
  selector: 'app-game-hud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-hud.html',
  styleUrl: './game-hud.css',
})
export class GameHud {
  private gameState = inject(GameStateService);

  readonly disponivel = this.gameState.disponivel;
  readonly reserva = this.gameState.reserva;
  readonly bemEstar = this.gameState.bemEstar;
  readonly estresse = this.gameState.estresse;
  readonly xp = this.gameState.xp;

  formatarMoeda(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR')}`;
  }
}
