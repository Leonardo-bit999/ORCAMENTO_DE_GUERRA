/* =========================================================
   JornadaFinanceira — timeline narrativa das decisões
   ========================================================= */

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

  /** Histórico completo. */
  historico = computed<HistoricoEntry[]>(() => this.gameState.historico());

  /** Estado atual do jogador. */
  disponivel = this.gameState.disponivel;
  reserva = this.gameState.reserva;
  bemEstar = this.gameState.bemEstar;
  estresse = this.gameState.estresse;
  xp = this.gameState.xp;

  /** Nome do personagem. */
  nome = computed(() => this.gameState.perfil()?.nome ?? 'Seu personagem');

  /** Perfil (título). */
  perfilTitulo = computed(
    () => this.gameState.perfil()?.perfilTitulo ?? 'Aventureiro'
  );

  /** Se já tem histórico (já jogou pelo menos 1 missão). */
  temHistorico = computed(() => this.historico().length > 0);

  /** Volta pra jornada. */
  voltar() {
    this.router.navigate(['/jornada']);
  }

  /** Formata dinheiro. */
  formatarMoeda(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR')}`;
  }
}