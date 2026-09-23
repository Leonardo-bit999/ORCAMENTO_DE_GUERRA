import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../../../../core/services/character';
import {
  PERFIS,
  MORADIAS,
  CUSTOS_VIDA,
  OBJETIVOS,
  ESTILOS_VIDA,
  VIBES,
  Moradia,
  CustoVida,
  Objetivo,
  EstiloVida,
  Vibe,
} from '../../../../core/models/character.model';

@Component({
  selector: 'app-etapa-resumo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './etapa-resumo.html',
  styleUrl: './etapa-resumo.css',
})
export class EtapaResumo {
  private svc = inject(CharacterService);

  draft = this.svc.draft;

  perfilTitulo = computed(() => {
    const d = this.draft();
    return PERFIS.find((x) => x.id === d.perfilId)?.titulo ?? null;
  });

  objetivoLabel = computed(() => {
    const d = this.draft();
    if (!d.objetivo) return null;
    if (d.objetivo === 'outro') {
      return d.objetivoOutroTexto.trim() || 'Outro';
    }
    return this.labelDe(OBJETIVOS, d.objetivo);
  });

  estiloLabel = computed(() => this.labelDe(ESTILOS_VIDA, this.draft().estiloVida));

  vibeLabel = computed(() => this.labelDe(VIBES, this.draft().vibe));

  moradiaLabel = computed(() => this.labelDe(MORADIAS, this.draft().moradia));

  custoVidaLabel = computed(() => this.labelDe(CUSTOS_VIDA, this.draft().custoVida));

  renda = computed(() => this.svc.rendaMensalEfetiva());

  temRenda = computed(() => {
    const d = this.draft();
    return d.perfilId === 'personalizado'
      ? d.personalizado.rendaMensal !== null
      : d.fonteRenda !== null;
  });

  saldo = computed(() => this.svc.saldoInicial());
  reserva = computed(() => this.svc.reservaInicial());

  private labelDe<T extends { id: string; label: string }>(
    lista: readonly T[],
    id: string | null,
  ): string | null {
    if (id === null) return null;
    return lista.find((i) => i.id === id)?.label ?? null;
  }

  formatarMoeda(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR')}`;
  }
}
