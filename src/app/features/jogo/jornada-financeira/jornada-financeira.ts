import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameLayout } from '../../../shared/components/game-layout/game-layout';
import { GameStateService } from '../../../core/services/game-state';
import { HistoricoEntry } from '../../../core/models/historico-entry.model';

@Component({
  selector: 'app-jornada-financeira',
  standalone: true,
  imports: [CommonModule, GameLayout],
  templateUrl: './jornada-financeira.html',
  styleUrl: './jornada-financeira.css',
})
export class JornadaFinanceira {
  private router = inject(Router);
  private gameState = inject(GameStateService);

  historico = computed<HistoricoEntry[]>(() => this.gameState.historico());

  disponivel = this.gameState.disponivel;
  reserva = this.gameState.reserva;
  bemEstar = this.gameState.bemEstar;
  estresse = this.gameState.estresse;
  xp = this.gameState.xp;

  nome = computed(() => this.gameState.perfil()?.nome ?? 'Seu personagem');

  perfilTitulo = computed(() => this.gameState.perfil()?.perfilTitulo ?? 'Aventureiro');

  temHistorico = computed(() => this.historico().length > 0);

  voltar() {
    this.router.navigate(['/jornada']);
  }

  formatarMoeda(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR')}`;
  }
}
