import { Component, effect, inject, signal } from '@angular/core';
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

  disponivelPulsou = signal(false);
  reservaPulsou = signal(false);
  xpPulsou = signal(false);

  private ultimoDisponivel = 0;
  private ultimaReserva = 0;
  private ultimoXp = 0;

  constructor() {
    effect(() => {
      const d = this.disponivel();
      const r = this.reserva();
      const x = this.xp();

      if (this.ultimoDisponivel !== 0 && d !== this.ultimoDisponivel) {
        this.pulsar(this.disponivelPulsou);
      }
      if (this.ultimaReserva !== 0 && r !== this.ultimaReserva) {
        this.pulsar(this.reservaPulsou);
      }
      if (this.ultimoXp !== 0 && x !== this.ultimoXp) {
        this.pulsar(this.xpPulsou);
      }

      this.ultimoDisponivel = d;
      this.ultimaReserva = r;
      this.ultimoXp = x;
    });
  }

  private pulsar(flag: ReturnType<typeof signal<boolean>>) {
    flag.set(true);
    setTimeout(() => flag.set(false), 450);
  }

  formatarMoeda(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR')}`;
  }
}
