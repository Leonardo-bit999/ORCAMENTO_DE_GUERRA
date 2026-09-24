/* =========================================================
   GameStateService — fonte única de verdade do EstadoJogo
   ========================================================= */

import { Injectable, computed, inject, signal } from '@angular/core';
import { Character } from '../models/character.model';
import { EstadoJogo } from '../models/estado-jogo.model';
import { Missao } from '../models/missao.model';
import { Capitulo } from '../models/capitulo.model';
import { StorageService } from './storage';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private storage = inject(StorageService);

  /** Estado interno (signal). Ninguém fora do serviço mexe nele direto. */
  private _estado = signal<EstadoJogo | null>(null);

  /** Leitura pública (readonly). */
  readonly estado = this._estado.asReadonly();

  // =========================================================
  // Sinais derivados (helpers para leitura)
  // =========================================================

  readonly temEstado = computed(() => this._estado() !== null);
  readonly perfil = computed(() => this._estado()?.perfil ?? null);
  readonly disponivel = computed(() => this._estado()?.financeiro.disponivel ?? 0);
  readonly reserva = computed(() => this._estado()?.financeiro.reserva ?? 0);
  readonly bemEstar = computed(() => this._estado()?.indicadores.bemEstar ?? 0);
  readonly estresse = computed(() => this._estado()?.indicadores.estresse ?? 0);
  readonly xp = computed(() => this._estado()?.progressao.xp ?? 0);
  readonly missoesConcluidas = computed(() => this._estado()?.progressao.missoesConcluidas ?? []);
  readonly licoesDesbloqueadas = computed(
    () => this._estado()?.progressao.licoesDesbloqueadas ?? [],
  );
  readonly flags = computed(() => this._estado()?.flags ?? []);
  readonly pendencia = computed(() => this._estado()?.pendencia ?? null);
  readonly historico = computed(() => this._estado()?.historico ?? []);

  // =========================================================
  // Ciclo de vida
  // =========================================================

  carregar(): void {
    const salvo = this.storage.carregarEstado();
    this._estado.set(salvo);
  }

  inicializar(character: Character): void {
    const renda = character.rendaMensal ?? 0;
    const disponivel = renda - character.despesasPrevistas;

    const estadoInicial: EstadoJogo = {
      perfil: character,
      financeiro: {
        disponivel: Math.max(0, disponivel),
        reserva: character.reservaInicial,
      },
      indicadores: {
        bemEstar: 50,
        estresse: 30,
      },
      progressao: {
        xp: 0,
        missoesConcluidas: [],
        licoesDesbloqueadas: [],
      },
      flags: [],
      pendencia: null,
      historico: [],
    };

    this._estado.set(estadoInicial);
    this.storage.salvarEstado(estadoInicial);
  }

  atualizar(novoEstado: EstadoJogo): void {
    this._estado.set(novoEstado);
    this.storage.salvarEstado(novoEstado);
  }

  resetar(): void {
    this._estado.set(null);
    this.storage.limpar();
  }

  resetarTudo(): void {
    this._estado.set(null);
    this.storage.limparTudoDoJogo();
  }

  // =========================================================
  // Helpers de consulta
  // =========================================================

  temFlag(flag: string): boolean {
    return this._estado()?.flags.includes(flag) ?? false;
  }

  missaoConcluida(missaoId: string): boolean {
    return this._estado()?.progressao.missoesConcluidas.includes(missaoId) ?? false;
  }

  licaoDesbloqueada(licaoId: string): boolean {
    return this._estado()?.progressao.licoesDesbloqueadas.includes(licaoId) ?? false;
  }

  temPendencia(): boolean {
    return this._estado()?.pendencia !== null;
  }

  estadoAtual(): EstadoJogo | null {
    return this._estado();
  }

  // =========================================================
  // Progressão
  // =========================================================

  /**
   * Verifica se uma missão pode ser jogada agora.
   * - Não pode ter sido concluída.
   * - Todos os pré-requisitos precisam estar concluídos.
   */
  missaoDisponivel(missao: Missao): boolean {
    if (this.missaoConcluida(missao.id)) return false;
    return missao.preRequisitos.every((req) => this.missaoConcluida(req));
  }

  /**
   * Verifica se um capítulo está liberado.
   * Precisa ter `liberado: true` no dado e o capítulo anterior concluído.
   */
  capituloLiberado(capitulo: Capitulo, todosCapitulos: Capitulo[]): boolean {
    if (!capitulo.liberado) return false;
    if (capitulo.ordem === 1) return true;

    const anterior = todosCapitulos.find((c) => c.ordem === capitulo.ordem - 1);
    if (!anterior) return false;

    return this.capituloConcluido(anterior);
  }

  /**
   * Verifica se um capítulo foi concluído.
   *
   * Regra do MVP: o capítulo é concluído quando a sua ÚLTIMA missão
   * da lista foi concluída. Isso permite ramificações (2A/2B) sem
   * exigir que o jogador jogue as duas.
   */
  capituloConcluido(capitulo: Capitulo): boolean {
    if (capitulo.missoesIds.length === 0) return false;
    const ultimaId = capitulo.missoesIds[capitulo.missoesIds.length - 1];
    return this.missaoConcluida(ultimaId);
  }

  /**
   * Devolve a primeira missão disponível (não concluída e com prereqs ok).
   */
  proximaMissao(todas: Missao[]): Missao | null {
    return todas.find((m) => !this.missaoConcluida(m.id) && this.missaoDisponivel(m)) ?? null;
  }

  /**
   * Devolve todas as missões de um capítulo com seu estado atual.
   */
  estadoDasMissoes(
    capitulo: Capitulo,
    todas: Missao[],
  ): {
    missao: Missao;
    concluida: boolean;
    disponivel: boolean;
  }[] {
    return capitulo.missoesIds
      .map((id) => todas.find((m) => m.id === id))
      .filter((m): m is Missao => m !== undefined)
      .map((m) => ({
        missao: m,
        concluida: this.missaoConcluida(m.id),
        disponivel: this.missaoDisponivel(m),
      }));
  }

  /**
   * Devolve a última lição desbloqueada.
   */
  ultimaLicaoDesbloqueada(): string | null {
    const licoes = this._estado()?.progressao.licoesDesbloqueadas ?? [];
    return licoes.length > 0 ? licoes[licoes.length - 1] : null;
  }
}
