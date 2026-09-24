/* =========================================================
   Licao — tela de lição do Caderno de Aprendizado
   ========================================================= */

import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameLayout } from '../../../shared/components/game-layout/game-layout';
import { GameStateService } from '../../../core/services/game-state';
import { buscarLicao } from '../../../data/licoes/licoes';
import { MISSOES } from '../../../data/missoes/missao.registry';
import { Licao as LicaoModel } from '../../../core/models/licao.model';
import { Missao } from '../../../core/models/missao.model';

@Component({
  selector: 'app-licao',
  standalone: true,
  imports: [CommonModule, GameLayout],
  templateUrl: './licao.html',
  styleUrl: './licao.css',
})
export class Licao {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameState = inject(GameStateService);

  licaoId = '';

  /** Lição carregada. */
  licao = computed<LicaoModel | null>(() => {
    if (!this.licaoId) return null;
    return buscarLicao(this.licaoId) ?? null;
  });

  /** Missão que desbloqueou essa lição. */
  missao = computed<Missao | null>(() => {
    const l = this.licao();
    if (!l) return null;
    return MISSOES.find((m) => m.id === l.missaoId) ?? null;
  });

  /** Frase de ancoragem personalizada da decisão do jogador. */
  ancoragem = computed<string | null>(() => {
    const m = this.missao();
    if (!m) return null;

    // Pega o histórico dessa missão
    const entry = this.gameState
      .historico()
      .find((e) => e.missaoId === m.id);
    if (!entry) return null;

    // Acha a opção escolhida
    const opcao = m.opcoes.find((o) => o.id === entry.decisao);
    return opcao?.ancoragemLicao ?? null;
  });

  constructor() {
    const id = this.route.snapshot.paramMap.get('licaoId');
    if (!id) {
      this.router.navigate(['/jornada']);
      return;
    }

    const licao = buscarLicao(id);
    if (!licao) {
      this.router.navigate(['/jornada']);
      return;
    }

    // Só permite acesso se a lição foi desbloqueada
    if (!this.gameState.licaoDesbloqueada(id)) {
      this.router.navigate(['/jornada']);
      return;
    }

    this.licaoId = id;
  }

  /** Parágrafos do conceito. */
  paragrafos = computed<string[]>(() => {
    const l = this.licao();
    if (!l) return [];
    return l.conceito
      .split('\n\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  });

  /** Volta pra jornada. */
  voltar() {
    this.router.navigate(['/jornada']);
  }

  /** Vai pro caderno (lista todas as lições). */
  irParaCaderno() {
    this.router.navigate(['/caderno']);
  }
}