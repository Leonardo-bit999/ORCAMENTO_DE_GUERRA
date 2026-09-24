/* =========================================================
   Resultado — tela de resultado de uma decisão
   ========================================================= */

import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameLayout } from '../../../shared/components/game-layout/game-layout';
import { GameStateService } from '../../../core/services/game-state';
import { MISSOES_POR_ID } from '../../../data/missoes/missao.registry';
import { HistoricoEntry } from '../../../core/models/historico-entry.model';
import { Missao as MissaoModel } from '../../../core/models/missao.model';
import { Opcao } from '../../../core/models/opcao.model';

interface Delta {
  disponivel: number;
  reserva: number;
  bemEstar: number;
  estresse: number;
  xp: number;
}

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, GameLayout],
  templateUrl: './resultado.html',
  styleUrl: './resultado.css',
})
export class Resultado {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameState = inject(GameStateService);

  /** Id da missão (via rota). */
  missaoId = '';

  /** Missão (pra pegar o id da lição e as opções). */
  missao = computed<MissaoModel | null>(() => {
    if (!this.missaoId) return null;
    return MISSOES_POR_ID[this.missaoId] ?? null;
  });

  /** Entrada do histórico desta decisão. */
  entry = computed<HistoricoEntry | null>(() => {
    const historico = this.gameState.historico();
    return historico.length > 0 ? historico[historico.length - 1] : null;
  });

  /** Opção escolhida (pra pegar o resultado/ancoragem). */
  opcaoEscolhida = computed<Opcao | null>(() => {
    const m = this.missao();
    const e = this.entry();
    if (!m || !e) return null;
    return m.opcoes.find((o) => o.id === e.decisao) ?? null;
  });

  /** Deltas calculados (antes vs depois). */
  deltas = computed<Delta | null>(() => {
    const e = this.entry();
    if (!e) return null;

    const historico = this.gameState.historico();
    const index = historico.length - 1;

    // Valores "antes"
    const antes = this.valoresAntes(index);

    return {
      disponivel: e.disponivelDepois - antes.disponivel,
      reserva: e.reservaDepois - antes.reserva,
      bemEstar: e.bemEstarDepois - antes.bemEstar,
      estresse: e.estresseDepois - antes.estresse,
      xp: e.xpDepois - antes.xp,
    };
  });

  /** Se é a M1 (tem "E se..."). */
  temESe = computed(() => this.missaoId === 'missao-1-primeiro-orcamento');

  /** Opção alternativa pro "E se..." (a mais contrastante). */
  opcaoAlternativa = computed<Opcao | null>(() => {
    const m = this.missao();
    const escolhida = this.opcaoEscolhida();
    if (!m || !escolhida) return null;

    const outras = m.opcoes.filter((o) => o.id !== escolhida.id);
    if (outras.length === 0) return null;

    // Regra: A ↔ C, B → A, C → A
    if (escolhida.id === 'criar-equilibrio') {
      return m.opcoes.find((o) => o.id === 'priorizar-seguranca') ?? outras[0];
    }
    if (escolhida.id === 'priorizar-seguranca') {
      return m.opcoes.find((o) => o.id === 'priorizar-presente') ?? outras[0];
    }
    if (escolhida.id === 'priorizar-presente') {
      return m.opcoes.find((o) => o.id === 'priorizar-seguranca') ?? outras[0];
    }
    return outras[0];
  });

  /** Estado do "E se..." aberto ou fechado. */
  eSeAberto = false;

  constructor() {
    const id = this.route.snapshot.paramMap.get('missaoId');
    if (!id) {
      this.router.navigate(['/jornada']);
      return;
    }
    this.missaoId = id;
  }

  /** Formata número com sinal (+/-). */
  formatarDelta(valor: number): string {
    if (valor > 0) return `+${valor}`;
    return `${valor}`;
  }

  /** Formata dinheiro. */
  formatarMoeda(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR')}`;
  }

  /** Formata moeda com sinal. */
  formatarMoedaDelta(valor: number): string {
    const sinal = valor >= 0 ? '+' : '-';
    const abs = Math.abs(valor);
    return `${sinal}R$ ${abs.toLocaleString('pt-BR')}`;
  }

  /** Abre/fecha o "E se...". */
  toggleESe() {
    this.eSeAberto = !this.eSeAberto;
  }

  /** Continuar pra lição. */
  continuar() {
    const m = this.missao();
    if (!m) {
      this.router.navigate(['/jornada']);
      return;
    }
    this.router.navigate(['/licao', m.licaoId]);
  }

  /** Volta pra jornada (se não houver lição — fallback). */
  voltarJornada() {
    this.router.navigate(['/jornada']);
  }

  // =========================================================
  // Helpers privados
  // =========================================================

  /**
   * Devolve os valores do estado "antes" desta decisão.
   * - Se é a primeira decisão, usa os valores iniciais do perfil.
   * - Senão, usa o entry anterior do histórico.
   */
  private valoresAntes(index: number): Delta {
    const historico = this.gameState.historico();

    if (index === 0) {
      // Antes da primeira decisão = valores iniciais do perfil
      const perfil = this.gameState.perfil();
      const renda = perfil?.rendaMensal ?? 0;
      const despesas = perfil?.despesasPrevistas ?? 0;
      return {
        disponivel: Math.max(0, renda - despesas),
        reserva: perfil?.reservaInicial ?? 0,
        bemEstar: 50,
        estresse: 30,
        xp: 0,
      };
    }

    const anterior = historico[index - 1];
    return {
      disponivel: anterior.disponivelDepois,
      reserva: anterior.reservaDepois,
      bemEstar: anterior.bemEstarDepois,
      estresse: anterior.estresseDepois,
      xp: anterior.xpDepois,
    };
  }
}