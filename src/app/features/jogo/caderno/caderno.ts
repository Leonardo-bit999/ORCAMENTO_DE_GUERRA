import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameLayout } from '../../../shared/components/game-layout/game-layout';
import { GameStateService } from '../../../core/services/game-state';
import { LICOES } from '../../../data/licoes/licoes';
import { Licao } from '../../../core/models/licao.model';

interface ItemCaderno {
  licao: Licao;
  desbloqueada: boolean;
}

@Component({
  selector: 'app-caderno',
  standalone: true,
  imports: [CommonModule, GameLayout],
  templateUrl: './caderno.html',
  styleUrl: './caderno.css',
})
export class Caderno {
  private router = inject(Router);
  private gameState = inject(GameStateService);

  itens = computed<ItemCaderno[]>(() => {
    return LICOES.map((licao) => ({
      licao,
      desbloqueada: this.gameState.licaoDesbloqueada(licao.id),
    }));
  });

  progresso = computed(() => {
    const itens = this.itens();
    return {
      desbloqueadas: itens.filter((i) => i.desbloqueada).length,
      total: itens.length,
    };
  });

  preview(licao: Licao): string {
    const texto = licao.conceito.split('\n\n')[0] ?? '';
    if (texto.length <= 140) return texto;
    return texto.slice(0, 140).trim() + '...';
  }

  abrir(item: ItemCaderno) {
    if (!item.desbloqueada) return;
    this.router.navigate(['/licao', item.licao.id]);
  }
}
