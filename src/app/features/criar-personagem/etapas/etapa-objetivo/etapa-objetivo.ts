import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../../../core/services/character';
import { OBJETIVOS, Objetivo } from '../../../../core/models/character.model';
import { OpcaoTile } from '../../components/opcao-tile/opcao-tile';
import { IconeObjetivo } from '../../components/icone-objetivo/icone-objetivo';

@Component({
  selector: 'app-etapa-objetivo',
  standalone: true,
  imports: [CommonModule, FormsModule, OpcaoTile, IconeObjetivo],
  templateUrl: './etapa-objetivo.html',
  styleUrls: ['./etapa-objetivo.css', '../../criacao.shared.css'],
})
export class EtapaObjetivo {
  private svc = inject(CharacterService);

  objetivos = OBJETIVOS;
  draft = this.svc.draft;

  ehOutro = computed(() => this.draft().objetivo === 'outro');

  get outroInvalido(): boolean {
    const d = this.draft();
    if (d.objetivo !== 'outro') return false;
    return d.objetivoOutroTexto.length > 0 && d.objetivoOutroTexto.trim().length < 2;
  }

  selecionarObjetivo(id: Objetivo) {
    this.svc.atualizar({ objetivo: id });
  }

  setOutroTexto(valor: string) {
    this.svc.atualizar({ objetivoOutroTexto: valor });
  }
}
