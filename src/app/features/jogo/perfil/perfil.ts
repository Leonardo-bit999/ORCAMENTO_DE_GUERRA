import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLayout } from '../../../shared/components/game-layout/game-layout';
import { GameStateService } from '../../../core/services/game-state';
import { IconePerfil } from '../../../features/criar-personagem/components/icone-perfil/icone-perfil';
import {
  MORADIAS,
  FONTES_RENDA,
  CUSTOS_VIDA,
  RESPONSABILIDADES,
  OBJETIVOS,
  ESTILOS_VIDA,
  VIBES,
} from '../../../core/models/character.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, GameLayout, IconePerfil],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {
  private gameState = inject(GameStateService);

  perfil = computed(() => this.gameState.perfil());

  disponivel = this.gameState.disponivel;
  reserva = this.gameState.reserva;
  bemEstar = this.gameState.bemEstar;
  estresse = this.gameState.estresse;
  xp = this.gameState.xp;

  nome = computed(() => this.perfil()?.nome ?? '—');

  perfilId = computed(() => this.perfil()?.perfilId ?? null);

  perfilTitulo = computed(() => this.perfil()?.perfilTitulo ?? 'Personagem');

  perfilFrase = computed(() => this.perfil()?.perfilFrase ?? '');

  moradiaLabel = computed(() => this.labelDe(MORADIAS, this.perfil()?.moradia ?? null));

  fonteRendaLabel = computed(() => this.labelDe(FONTES_RENDA, this.perfil()?.fonteRenda ?? null));

  custoVidaLabel = computed(() => this.labelDe(CUSTOS_VIDA, this.perfil()?.custoVida ?? null));

  objetivoLabel = computed(() => {
    const p = this.perfil();
    if (!p) return null;
    if (p.objetivo === 'outro') {
      return p.objetivoOutroTexto?.trim() || 'Outro';
    }
    return this.labelDe(OBJETIVOS, p.objetivo);
  });

  estiloLabel = computed(() => this.labelDe(ESTILOS_VIDA, this.perfil()?.estiloVida ?? null));

  vibeLabel = computed(() => this.labelDe(VIBES, this.perfil()?.vibe ?? null));

  responsabilidadesLabels = computed(() => {
    const p = this.perfil();
    if (!p) return [];
    return p.responsabilidades
      .map((r) => this.labelDe(RESPONSABILIDADES, r))
      .filter((x): x is string => !!x);
  });

  rendaMensal = computed(() => this.perfil()?.rendaMensal ?? 0);

  formatarMoeda(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR')}`;
  }

  private labelDe<T extends { id: string; label: string }>(
    lista: readonly T[],
    id: string | null,
  ): string | null {
    if (id === null) return null;
    return lista.find((i) => i.id === id)?.label ?? null;
  }
}
