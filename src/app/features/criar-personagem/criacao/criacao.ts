import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Navbar } from '../../../core/layout/navbar/navbar';
import { BarraProgresso, EtapaProgresso } from '../components/barra-progresso/barra-progresso';
import { CharacterService, EtapaId, TOTAL_ETAPAS } from '../../../core/services/character';
import { EtapaPerfil } from '../etapas/etapa-perfil/etapa-perfil';

@Component({
  selector: 'app-criacao',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    BarraProgresso,
    EtapaPerfil
],
  templateUrl: './criacao.html',
  styleUrls: ['./criacao.css', '../shared/criacao.shared.css'],
})
export class Criacao {
  private svc = inject(CharacterService);
  private router = inject(Router);

  etapas: EtapaProgresso[] = [
    { numero: 1, label: 'Perfil' },
    { numero: 2, label: 'Cenário' },
    { numero: 3, label: 'Objetivo' },
    { numero: 4, label: 'Estilo' },
    { numero: 5, label: 'Resumo' },
  ];

  private _etapaAtual = signal<EtapaId>(1);
  readonly etapaAtual = this._etapaAtual.asReadonly();
  readonly totalEtapas = TOTAL_ETAPAS;

  podeAvancar = computed(() => this.svc.etapaValida(this.etapaAtual()));
  ehUltima = computed(() => this.etapaAtual() === this.totalEtapas);

  avancar() {
    if (!this.podeAvancar()) return;
    const proxima = (this.etapaAtual() + 1) as EtapaId;
    if (proxima > this.totalEtapas) return;
    this._etapaAtual.set(proxima);
    this.scrollParaTopo();
  }

  voltar() {
    const anterior = (this.etapaAtual() - 1) as EtapaId;
    if (anterior < 1) return;
    this._etapaAtual.set(anterior);
    this.scrollParaTopo();
  }

  irPara(n: number) {
    if (n < 1 || n > this.etapaAtual()) return;
    this._etapaAtual.set(n as EtapaId);
    this.scrollParaTopo();
  }

  confirmar() {
    // implementado no Bloco 3 (chama svc.finalizar())
  }

  private scrollParaTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
