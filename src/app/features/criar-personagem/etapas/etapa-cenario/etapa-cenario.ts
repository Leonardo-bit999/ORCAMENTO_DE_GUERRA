import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../../../core/services/character';
import {
  CUSTOS_VIDA,
  FONTES_RENDA,
  MORADIAS,
  RESPONSABILIDADES,
  CustoVida,
  FonteRenda,
  Moradia,
  Responsabilidade,
} from '../../../../core/models/character.model';
import { OpcaoTile } from '../../components/opcao-tile/opcao-tile';
import { OpcaoChip } from '../../components/opcao-chip/opcao-chip';

@Component({
  selector: 'app-etapa-cenario',
  standalone: true,
  imports: [CommonModule, FormsModule, OpcaoTile, OpcaoChip],
  templateUrl: './etapa-cenario.html',
  styleUrls: ['./etapa-cenario.css', '../../shared/criacao.shared.css'],
})
export class EtapaCenario {
  private svc = inject(CharacterService);

  moradias = MORADIAS;
  fontesRenda = FONTES_RENDA;
  custosVida = CUSTOS_VIDA;
  responsabilidades = RESPONSABILIDADES;

  draft = this.svc.draft;

  ehPersonalizado = computed(() => this.draft().perfilId === 'personalizado');

  /**
   * Só faz sentido mostrar opções de renda sugerida quando o perfil NÃO é
   * personalizado (no personalizado a renda veio da etapa 1).
   */
  mostrarFontesRenda = computed(() => !this.ehPersonalizado());

  selecionarMoradia(id: Moradia) {
    this.svc.atualizar({ moradia: id });
  }

  selecionarFonte(id: FonteRenda) {
    this.svc.selecionarFonteRenda(id);
  }

  selecionarCusto(id: CustoVida) {
    this.svc.atualizar({ custoVida: id });
  }

  toggleResponsabilidade(id: Responsabilidade) {
    this.svc.toggleResponsabilidade(id);
  }

  setRendaCustom(valor: string) {
    const n = this.paraNumero(valor);
    this.svc.atualizar({ rendaMensal: n });
  }

  usarValorSugerido() {
    const d = this.draft();
    if (d.fonteRenda && d.fonteRenda !== 'personalizado') {
      this.svc.selecionarFonteRenda(d.fonteRenda);
    }
  }

  personalizarRenda() {
    this.svc.atualizar({ usarRendaSugerida: false });
  }

  private paraNumero(valor: string): number | null {
    if (valor === '' || valor === null || valor === undefined) return null;
    const n = Number(valor);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }

  get fonteAtual() {
    const d = this.draft();
    return this.fontesRenda.find((f) => f.id === d.fonteRenda) ?? null;
  }
}
