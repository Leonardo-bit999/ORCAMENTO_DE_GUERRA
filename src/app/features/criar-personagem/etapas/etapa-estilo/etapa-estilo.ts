import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../../../core/services/character';
import { ESTILOS_VIDA, VIBES, EstiloVida, Vibe } from '../../../../core/models/character.model';
import { OpcaoTile } from '../../components/opcao-tile/opcao-tile';
import { IconeEstilo } from '../../components/icone-estilo/icone-estilo';
import { IconeVibe } from '../../components/icone-vibe/icone-vibe';

@Component({
  selector: 'app-etapa-estilo',
  standalone: true,
  imports: [CommonModule, OpcaoTile, IconeEstilo, IconeVibe],
  templateUrl: './etapa-estilo.html',
  styleUrls: ['./etapa-estilo.css', '../../shared/criacao.shared.css'],
})
export class EtapaEstilo {
  private svc = inject(CharacterService);

  estilos = ESTILOS_VIDA;
  vibes = VIBES;

  draft = this.svc.draft;

  selecionarEstilo(id: EstiloVida) {
    this.svc.atualizar({ estiloVida: id });
  }

  selecionarVibe(id: Vibe) {
    this.svc.atualizar({ vibe: id });
  }
}
