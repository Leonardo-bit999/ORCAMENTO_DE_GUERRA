/* =========================================================
   Jornada — tela principal do jogo
   ========================================================= */

import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameHud } from '../../../shared/components/game-hud/game-hud';
import { GameStateService } from '../../../core/services/game-state';
import { Navbar } from '../../../core/layout/navbar/navbar';
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
  imports: [CommonModule, Navbar, GameHud],
  templateUrl: './jornada.html',
  styleUrl: './jornada.css',
})
export class Jornada {
  private gameState = inject(GameStateService);
  private router = inject(Router);

  /** Capítulos e missões carregados dos dados. */
  private todosCapitulos = CAPITULOS;
  private todasMissoes = MISSOES;

  /** Capítulo atual = o primeiro não concluído. */
  capituloAtual = computed<Capitulo>(() => {
    const naoConcluido = this.todosCapitulos.find((c) => !this.gameState.capituloConcluido(c));
    return naoConcluido ?? this.todosCapitulos[this.todosCapitulos.length - 1];
  });

  /** Missões do capítulo atual com estado. */
  missoesDoCapitulo = computed<EstadoMissao[]>(() => {
    return this.gameState.estadoDasMissoes(this.capituloAtual(), this.todasMissoes);
  });

  /** Capítulos bloqueados (não jogáveis). */
  capitulosBloqueados = computed<Capitulo[]>(() => {
    return this.todosCapitulos.filter((c) => !c.liberado && c.id !== this.capituloAtual().id);
  });

  /** Progresso do capítulo atual (missões concluídas / total). */
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

  /** Próxima missão disponível (para o CTA principal). */
  proximaMissao = computed<Missao | null>(() => {
    return this.gameState.proximaMissao(this.todasMissoes);
  });

  /** Verifica se o jogador já terminou o capítulo 1. */
  capitulo1Concluido = computed(() => {
    const cap1 = this.todosCapitulos.find((c) => c.id === 'cap-1');
    return cap1 ? this.gameState.capituloConcluido(cap1) : false;
  });

  /** Navega para uma missão (só se disponível). */
  abrirMissao(estado: EstadoMissao) {
    if (!estado.disponivel) return;
    this.router.navigate(['/missao', estado.missao.id]);
  }

  /** Continuar de onde parou. */
  continuar() {
    const proxima = this.proximaMissao();
    if (proxima) {
      this.router.navigate(['/missao', proxima.id]);
    }
  }

  /** Ir para o fechamento do capítulo (Jornada Financeira). */
  verJornadaFinanceira() {
    this.router.navigate(['/jornada-financeira']);
  }
}
