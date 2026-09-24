/* =========================================================
   Jornada — tela principal do jogo
   ========================================================= */

import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameLayout } from '../../../shared/components/game-layout/game-layout';
import { GameStateService } from '../../../core/services/game-state';
import { CAPITULOS } from '../../../data/capitulos/capitulos';
import { MISSOES } from '../../../data/missoes/missao.registry';
import { Missao } from '../../../core/models/missao.model';
import { Capitulo } from '../../../core/models/capitulo.model';

interface EstadoMissao {
  missao: Missao;
  concluida: boolean;
  disponivel: boolean;
}

@Component({
  selector: 'app-jornada',
  standalone: true,
  imports: [CommonModule, GameLayout],
  templateUrl: './jornada.html',
  styleUrl: './jornada.css',
})
export class Jornada {
  private gameState = inject(GameStateService);
  private router = inject(Router);

  private todosCapitulos = CAPITULOS;
  private todasMissoes = MISSOES;

  capituloAtual = computed<Capitulo>(() => {
    const naoConcluido = this.todosCapitulos.find((c) => !this.gameState.capituloConcluido(c));
    return naoConcluido ?? this.todosCapitulos[this.todosCapitulos.length - 1];
  });

  missoesDoCapitulo = computed<EstadoMissao[]>(() => {
    return this.gameState.estadoDasMissoes(this.capituloAtual(), this.todasMissoes);
  });

  capitulosBloqueados = computed<Capitulo[]>(() => {
    return this.todosCapitulos.filter((c) => !c.liberado && c.id !== this.capituloAtual().id);
  });

  progresso = computed(() => {
    const missoes = this.missoesDoCapitulo();
    const total = missoes.length;
    const concluidas = missoes.filter((m) => m.concluida).length;
    return {
      concluidas,
      total,
      percentual: total > 0 ? Math.round((concluidas / total) * 100) : 0,
    };
  });

  proximaMissao = computed<Missao | null>(() => {
    return this.gameState.proximaMissao(this.todasMissoes);
  });

  capitulo1Concluido = computed(() => {
    const cap1 = this.todosCapitulos.find((c) => c.id === 'cap-1');
    return cap1 ? this.gameState.capituloConcluido(cap1) : false;
  });

  abrirMissao(estado: EstadoMissao) {
    if (!estado.disponivel) return;
    this.router.navigate(['/missao', estado.missao.id]);
  }

  continuar() {
    const proxima = this.proximaMissao();
    if (proxima) {
      this.router.navigate(['/missao', proxima.id]);
    }
  }

  verJornadaFinanceira() {
    this.router.navigate(['/jornada-financeira']);
  }
}
