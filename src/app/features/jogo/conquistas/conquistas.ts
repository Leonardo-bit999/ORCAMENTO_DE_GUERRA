import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLayout } from '../../../shared/components/game-layout/game-layout';
import { GameStateService } from '../../../core/services/game-state';
import { CONQUISTAS } from '../../../data/conquistas/conquistas';
import { Conquista } from '../../../core/models/conquista.model';

interface ItemConquista {
  conquista: Conquista;
  desbloqueada: boolean;
}

@Component({
  selector: 'app-conquistas',
  standalone: true,
  imports: [CommonModule, GameLayout],
  templateUrl: './conquistas.html',
  styleUrl: './conquistas.css',
})
export class Conquistas {
  private gameState = inject(GameStateService);

  itens = computed<ItemConquista[]>(() => {
    return CONQUISTAS.map((conquista) => ({
      conquista,
      desbloqueada: this.gameState.temConquista(conquista.id),
    }));
  });

  progresso = computed(() => {
    const itens = this.itens();
    return {
      desbloqueadas: itens.filter((i) => i.desbloqueada).length,
      total: itens.length,
    };
  });
}
