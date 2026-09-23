import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Navbar } from '../../../core/layout/navbar/navbar';
import { BarraProgresso, EtapaProgresso } from '../components/barra-progresso/barra-progresso';
import { CharacterService, EtapaId, TOTAL_ETAPAS } from '../../../core/services/character';
import { PERFIS } from '../../../core/models/character.model';
import { EtapaPerfil } from '../etapas/etapa-perfil/etapa-perfil';
import { EtapaCenario } from '../etapas/etapa-cenario/etapa-cenario';
import { EtapaObjetivo } from '../etapas/etapa-objetivo/etapa-objetivo';
import { EtapaEstilo } from '../etapas/etapa-estilo/etapa-estilo';
import { ModalConfirmar } from '../components/modal-confirmar/modal-confirmar';
import { EtapaResumo } from '../etapas/etapa-resumo/etapa-resumo';


@Component({
  selector: 'app-criacao',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    BarraProgresso,
    EtapaPerfil,
    EtapaCenario,
    EtapaObjetivo,
    EtapaEstilo,
    ModalConfirmar,
    EtapaResumo,
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
  ];

  private _etapaAtual = signal<EtapaId>(1);
  readonly etapaAtual = this._etapaAtual.asReadonly();
  readonly totalEtapas = TOTAL_ETAPAS;

  modalAberto = signal(false);
  carregando = signal(false);
  /** Nome da etapa atual para animação key */
  private _animKey = signal(0);
  readonly animKey = this._animKey.asReadonly();

  podeAvancar = computed(() => this.svc.etapaValida(this.etapaAtual()));
  ehPrimeira = computed(() => this.etapaAtual() === 1);
  ehUltima = computed(() => this.etapaAtual() === this.totalEtapas);
  tudoValido = computed(() => this.svc.etapaTudoValido());

  // Dados pro modal
  readonly draft = this.svc.draft;
  nome = computed(() => this.draft().nome);

  perfilTitulo = computed(() => {
    const d = this.draft();
    return PERFIS.find((x) => x.id === d.perfilId)?.titulo ?? 'Personagem';
  });

  saldo = computed(() => this.svc.saldoInicial());
  reserva = computed(() => this.svc.reservaInicial());

  avancar() {
    if (!this.podeAvancar()) return;
    const proxima = (this.etapaAtual() + 1) as EtapaId;
    if (proxima > this.totalEtapas) return;
    this._etapaAtual.set(proxima);
    this._animKey.update((n) => n + 1);
    this.scrollParaTopo();
  }

  voltar() {
    const anterior = (this.etapaAtual() - 1) as EtapaId;
    if (anterior < 1) return;
    this._etapaAtual.set(anterior);
    this._animKey.update((n) => n + 1);
    this.scrollParaTopo();
  }

  irPara(n: number) {
    if (n < 1 || n > this.etapaAtual()) return;
    this._etapaAtual.set(n as EtapaId);
    this._animKey.update((v) => v + 1);
    this.scrollParaTopo();
  }

  abrirModal() {
    if (!this.tudoValido()) return;
    this.modalAberto.set(true);
  }

  fecharModal() {
    if (this.carregando()) return;
    this.modalAberto.set(false);
  }

  async confirmarFinalizacao() {
    if (this.carregando()) return;
    this.carregando.set(true);

    await new Promise((r) => setTimeout(r, 900));

    try {
      this.svc.finalizar();
      this.router.navigate(['/game']);
    } catch (e) {
      this.carregando.set(false);
      this.modalAberto.set(false);
      console.error(e);
    }
  }

  private scrollParaTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
