import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameLayout } from '../../../shared/components/game-layout/game-layout';
import { ConquistaAlerta } from '../../../shared/components/conquista-alerta/conquista-alerta';
import { GameStateService } from '../../../core/services/game-state';
import { MISSOES_POR_ID } from '../../../data/missoes/missao.registry';
import { buscarConquista } from '../../../data/conquistas/conquistas';
import { HistoricoEntry } from '../../../core/models/historico-entry.model';
import { Missao as MissaoModel } from '../../../core/models/missao.model';
import { Opcao } from '../../../core/models/opcao.model';
import { Conquista } from '../../../core/models/conquista.model';

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
  imports: [CommonModule, GameLayout, ConquistaAlerta],
  templateUrl: './resultado.html',
  styleUrl: './resultado.css',
})
export class Resultado {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameState = inject(GameStateService);

  missaoId = '';

  conquistaNova = signal<Conquista | null>(null);

  missao = computed<MissaoModel | null>(() => {
    if (!this.missaoId) return null;
    return MISSOES_POR_ID[this.missaoId] ?? null;
  });

  entry = computed<HistoricoEntry | null>(() => {
    const historico = this.gameState.historico();
    return historico.length > 0 ? historico[historico.length - 1] : null;
  });

  opcaoEscolhida = computed<Opcao | null>(() => {
    const m = this.missao();
    const e = this.entry();
    if (!m || !e) return null;
    return m.opcoes.find((o) => o.id === e.decisao) ?? null;
  });

  deltas = computed<Delta | null>(() => {
    const e = this.entry();
    if (!e) return null;

    const historico = this.gameState.historico();
    const index = historico.length - 1;
    const antes = this.valoresAntes(index);

    return {
      disponivel: e.disponivelDepois - antes.disponivel,
      reserva: e.reservaDepois - antes.reserva,
      bemEstar: e.bemEstarDepois - antes.bemEstar,
      estresse: e.estresseDepois - antes.estresse,
      xp: e.xpDepois - antes.xp,
    };
  });

  temESe = computed(() => this.missaoId === 'missao-1-primeiro-orcamento');

  opcaoAlternativa = computed<Opcao | null>(() => {
    const m = this.missao();
    const escolhida = this.opcaoEscolhida();
    if (!m || !escolhida) return null;

    const outras = m.opcoes.filter((o) => o.id !== escolhida.id);
    if (outras.length === 0) return null;

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

  eSeAberto = false;

  constructor() {
    const id = this.route.snapshot.paramMap.get('missaoId');
    if (!id) {
      this.router.navigate(['/jornada']);
      return;
    }
    this.missaoId = id;
  }

  private detectarConquistaNova(): Conquista | null {
    const conquistas = this.gameState.conquistas();
    if (conquistas.length === 0) return null;

    const ultimaId = conquistas[conquistas.length - 1];
    const conquista = buscarConquista(ultimaId);

    if (conquista && conquista.missoesIds.includes(this.missaoId)) {
      return conquista;
    }
    return null;
  }

  formatarDelta(valor: number): string {
    if (valor > 0) return `+${valor}`;
    return `${valor}`;
  }

  formatarMoeda(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR')}`;
  }

  formatarMoedaDelta(valor: number): string {
    const sinal = valor >= 0 ? '+' : '-';
    const abs = Math.abs(valor);
    return `${sinal}R$ ${abs.toLocaleString('pt-BR')}`;
  }

  toggleESe() {
    this.eSeAberto = !this.eSeAberto;
  }

  continuar() {
    const conquista = this.detectarConquistaNova();

    if (conquista) {
      this.conquistaNova.set(conquista);
      return;
    }

    this.irParaLicao();
  }

  fecharAlertaConquista() {
    this.conquistaNova.set(null);
    this.irParaLicao();
  }

  private irParaLicao() {
    const m = this.missao();
    if (!m) {
      this.router.navigate(['/jornada']);
      return;
    }
    this.router.navigate(['/licao', m.licaoId]);
  }

  voltarJornada() {
    this.router.navigate(['/jornada']);
  }

  private valoresAntes(index: number): Delta {
    const historico = this.gameState.historico();

    if (index === 0) {
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
