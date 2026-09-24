import { Injectable } from '@angular/core';
import { EstadoJogo } from '../models/estado-jogo.model';
import { Missao } from '../models/missao.model';
import { Opcao } from '../models/opcao.model';
import { HistoricoEntry } from '../models/historico-entry.model';
import { conquistaDaMissao } from '../../data/conquistas/conquistas';

export interface ResultadoDecisao {
  sucesso: boolean;
  motivo?: string;
  novoEstado?: EstadoJogo;
  opcaoEscolhida?: Opcao;
  historicoEntry?: HistoricoEntry;
}

@Injectable({ providedIn: 'root' })
export class DecisionService {

  processar(missao: Missao, opcao: Opcao, estadoAtual: EstadoJogo): ResultadoDecisao {
    // 1. Validar
    const erro = this.validar(opcao, estadoAtual);
    if (erro) {
      return { sucesso: false, motivo: erro };
    }

    // 2. Cópia profunda do estado
    const novo: EstadoJogo = structuredClone(estadoAtual);

    // 3. Aplicar impacto financeiro
    this.aplicarImpactoFinanceiro(novo, opcao);

    // 4. Aplicar indicadores
    this.aplicarIndicadores(novo, opcao);

    // 5. Aplicar XP
    novo.progressao.xp += opcao.impacto.xp;

    // 6. Aplicar flags
    this.aplicarFlags(novo, opcao);

    // 7. Atualizar pendência
    this.atualizarPendencia(novo, opcao);

    // 8. Marcar missão como concluída
    this.marcarMissaoConcluida(novo, missao);

    // 9. Desbloquear lição
    this.desbloquearLicao(novo, missao);

    // 10. Desbloquear conquista (se houver)
    this.desbloquearConquista(novo, missao);

    // 10. Gerar histórico
    const historicoEntry = this.gerarHistorico(novo, missao, opcao);
    novo.historico.push(historicoEntry);

    return {
      sucesso: true,
      novoEstado: novo,
      opcaoEscolhida: opcao,
      historicoEntry,
    };
  }

  private desbloquearConquista(estado: EstadoJogo, missao: Missao): void {
    const conquista = conquistaDaMissao(missao.id);
    if (!conquista) return;
    if (estado.progressao.conquista.includes(conquista.id)) return;
    estado.progressao.conquista.push(conquista.id);
  }

  private validar(opcao: Opcao, estado: EstadoJogo): string | null {
    // Condição customizada
    if (opcao.condicao && !opcao.condicao(estado)) {
      return 'Esta opção não está disponível no momento.';
    }

    // Efeito especial 'resolver-pendencia' → valida pelo custo da pendência
    if (opcao.efeitoEspecial === 'resolver-pendencia') {
      const pendencia = estado.pendencia;
      if (!pendencia) {
        return 'Não há pendência para resolver.';
      }
      const total = estado.financeiro.disponivel + estado.financeiro.reserva;
      if (pendencia.custo > total) {
        return 'Você não tem dinheiro suficiente para revisitar essa decisão.';
      }
      return null;
    }

    // Efeito especial 'consolidar-disponivel' → sem validação de dinheiro
    if (opcao.efeitoEspecial === 'consolidar-disponivel') {
      return null;
    }

    // Validação normal por fonte
    const disponivel = estado.financeiro.disponivel;
    const reserva = estado.financeiro.reserva;

    switch (opcao.fonte) {
      case 'disponivel':
        if (opcao.custo > disponivel) {
          return 'Você não tem saldo disponível suficiente.';
        }
        break;
      case 'reserva':
        if (opcao.custo > reserva) {
          return 'Você não tem reserva suficiente.';
        }
        break;
      case 'disponivel-depois-reserva':
        if (opcao.custo > disponivel + reserva) {
          return 'Você não tem dinheiro suficiente no total.';
        }
        break;
      case 'nenhuma':
        break;
    }

    return null;
  }

  // =========================================================
  // Impacto financeiro (com efeitos especiais)
  // =========================================================

  private aplicarImpactoFinanceiro(estado: EstadoJogo, opcao: Opcao): void {
    const imp = opcao.impacto;

    // === Efeito especial: consolidar tudo ===
    if (opcao.efeitoEspecial === 'consolidar-disponivel') {
      estado.financeiro.reserva += estado.financeiro.disponivel;
      estado.financeiro.disponivel = 0;
      return;
    }

    // === Efeito especial: resolver pendência ===
    if (opcao.efeitoEspecial === 'resolver-pendencia') {
      const pendencia = estado.pendencia;
      if (pendencia) {
        let restante = pendencia.custo;

        const doDisponivel = Math.min(restante, estado.financeiro.disponivel);
        estado.financeiro.disponivel -= doDisponivel;
        restante -= doDisponivel;

        if (restante > 0) {
          const daReserva = Math.min(restante, estado.financeiro.reserva);
          estado.financeiro.reserva -= daReserva;
        }
      }
      return;
    }

    // === Fonte dinâmica: disponível depois reserva ===
    if (opcao.fonte === 'disponivel-depois-reserva') {
      let restante = opcao.custo;

      const doDisponivel = Math.min(restante, estado.financeiro.disponivel);
      estado.financeiro.disponivel -= doDisponivel;
      restante -= doDisponivel;

      if (restante > 0) {
        const daReserva = Math.min(restante, estado.financeiro.reserva);
        estado.financeiro.reserva -= daReserva;
      }
      return;
    }

    // === Comportamento padrão (impacto estático) ===
    if (imp.disponivel !== undefined) {
      estado.financeiro.disponivel = Math.max(0, estado.financeiro.disponivel + imp.disponivel);
    }

    if (imp.reserva !== undefined) {
      estado.financeiro.reserva = Math.max(0, estado.financeiro.reserva + imp.reserva);
    }
  }

  // =========================================================
  // Indicadores
  // =========================================================

  private aplicarIndicadores(estado: EstadoJogo, opcao: Opcao): void {
    const imp = opcao.impacto;

    if (imp.bemEstar !== undefined) {
      estado.indicadores.bemEstar = this.clamp(estado.indicadores.bemEstar + imp.bemEstar, 0, 100);
    }

    if (imp.estresse !== undefined) {
      estado.indicadores.estresse = this.clamp(estado.indicadores.estresse + imp.estresse, 0, 100);
    }
  }

  // =========================================================
  // Flags, pendência, progressão
  // =========================================================

  private aplicarFlags(estado: EstadoJogo, opcao: Opcao): void {
    if (!opcao.flags || opcao.flags.length === 0) return;

    for (const flag of opcao.flags) {
      if (!estado.flags.includes(flag)) {
        estado.flags.push(flag);
      }
    }
  }

  private atualizarPendencia(estado: EstadoJogo, opcao: Opcao): void {
    if (opcao.gerarPendencia) {
      estado.pendencia = opcao.gerarPendencia;
    }
    if (opcao.resolverPendencia) {
      estado.pendencia = null;
    }
  }

  private marcarMissaoConcluida(estado: EstadoJogo, missao: Missao): void {
    if (!estado.progressao.missoesConcluidas.includes(missao.id)) {
      estado.progressao.missoesConcluidas.push(missao.id);
    }
  }

  private desbloquearLicao(estado: EstadoJogo, missao: Missao): void {
    if (!estado.progressao.licoesDesbloqueadas.includes(missao.licaoId)) {
      estado.progressao.licoesDesbloqueadas.push(missao.licaoId);
    }
  }

  // =========================================================
  // Histórico
  // =========================================================

  private gerarHistorico(estado: EstadoJogo, missao: Missao, opcao: Opcao): HistoricoEntry {
    return {
      missaoId: missao.id,
      titulo: missao.titulo,
      decisao: opcao.id,
      textoCurto: opcao.resultado,
      disponivelDepois: estado.financeiro.disponivel,
      reservaDepois: estado.financeiro.reserva,
      bemEstarDepois: estado.indicadores.bemEstar,
      estresseDepois: estado.indicadores.estresse,
      xpDepois: estado.progressao.xp,
      timestamp: new Date().toISOString(),
    };
  }

  // =========================================================
  // Utilidades
  // =========================================================

  private clamp(valor: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, valor));
  }
}
