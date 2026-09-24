/* =========================================================
   Missao — tela de missão do jogo
   ========================================================= */

import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameLayout } from '../../../shared/components/game-layout/game-layout';
import { GameStateService } from '../../../core/services/game-state';
import { DecisionService } from '../../../core/services/decision';
import { MISSOES_POR_ID } from '../../../data/missoes/missao.registry';
import { Missao as MissaoModel } from '../../../core/models/missao.model';
import { Opcao } from '../../../core/models/opcao.model';
import { EstadoJogo } from '../../../core/models/estado-jogo.model';

@Component({
  selector: 'app-missao',
  standalone: true,
  imports: [CommonModule, GameLayout],
  templateUrl: './missao.html',
  styleUrl: './missao.css',
})
export class Missao {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameState = inject(GameStateService);
  private decision = inject(DecisionService);

  /** Erro ao tentar processar a decisão. */
  erro = signal<string | null>(null);

  /** Missão carregada. */
  missao = signal<MissaoModel | null>(null);

  /** Estado atual (readonly). */
  estadoAtual = computed<EstadoJogo | null>(() => this.gameState.estado());

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/jornada']);
      return;
    }

    const missao = MISSOES_POR_ID[id];

    if (!missao) {
      this.router.navigate(['/jornada']);
      return;
    }

    // Valida se a missão está disponível
    if (!this.gameState.missaoDisponivel(missao)) {
      this.router.navigate(['/jornada']);
      return;
    }

    this.missao.set(missao);
  }

  /** Título da missão (com prefixo se for evento). */
  tituloComPrefixo = computed(() => {
    const m = this.missao();
    if (!m) return '';
    return m.tipo === 'evento' ? `⚡ ${m.titulo}` : m.titulo;
  });

  /** Abertura resolvida (executa função ou usa string). */
  abertura = computed<string>(() => {
    const m = this.missao();
    const e = this.estadoAtual();
    if (!m || !e) return '';
    return this.resolverTexto(m.contexto.abertura, e);
  });

  /** Corpo resolvido. */
  corpo = computed<string>(() => {
    const m = this.missao();
    const e = this.estadoAtual();
    if (!m || !e) return '';
    return this.resolverTexto(m.contexto.corpo, e);
  });

  /** Pensamento resolvido (pode ser undefined). */
  pensamento = computed<string | null>(() => {
    const m = this.missao();
    const e = this.estadoAtual();
    if (!m || !e || !m.contexto.pensamento) return null;
    return this.resolverTexto(m.contexto.pensamento, e);
  });

  /** Opções filtradas por condicao. */
  opcoesDisponiveis = computed<Opcao[]>(() => {
    const m = this.missao();
    const e = this.estadoAtual();
    if (!m || !e) return [];
    return m.opcoes.filter((o) => !o.condicao || o.condicao(e));
  });

  /** Formata dinheiro. */
  formatarMoeda(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR')}`;
  }

  /** Verifica se a opção tem custo pra mostrar. */
  mostrarCusto(opcao: Opcao): boolean {
    return opcao.custo > 0;
  }

  /** Escolhe uma opção. */
  escolher(opcao: Opcao) {
    const m = this.missao();
    const e = this.estadoAtual();
    if (!m || !e) return;

    const resultado = this.decision.processar(m, opcao, e);

    if (!resultado.sucesso || !resultado.novoEstado) {
      this.erro.set(resultado.motivo ?? 'Não foi possível processar essa decisão.');
      return;
    }

    this.gameState.atualizar(resultado.novoEstado);
    this.router.navigate(['/resultado', m.id]);
  }

  /** Resolve um TextoContexto (string ou função). */
  private resolverTexto(
    texto: string | ((estado: EstadoJogo) => string),
    estado: EstadoJogo
  ): string {
    return typeof texto === 'function' ? texto(estado) : texto;
  }
}