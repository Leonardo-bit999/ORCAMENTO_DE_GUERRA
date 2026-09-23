import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../../../core/services/character';
import { PERFIS, PerfilId } from '../../../../core/models/character.model';
import { OpcaoCard } from '../../components/opcao-card/opcao-card';
import { AvatarPicker } from '../../components/avatar-picker/avatar-picker';

@Component({
  selector: 'app-etapa-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, OpcaoCard, AvatarPicker],
  templateUrl: './etapa-perfil.html',
  styleUrls: ['./etapa-perfil.css', '../../shared/criacao.shared.css'],
})
export class EtapaPerfil {
  private svc = inject(CharacterService);

  perfis = PERFIS;
  draft = this.svc.draft;

  ehPersonalizado = computed(() => this.draft().perfilId === 'personalizado');

  get nomeInvalido(): boolean {
    return this.draft().nome.length > 0 && this.draft().nome.trim().length < 2;
  }

  setNome(valor: string) {
    this.svc.atualizar({ nome: valor });
  }

  selecionarPerfil(id: PerfilId) {
    this.svc.selecionarPerfil(id);
  }

  setPersonalizadoRenda(valor: string) {
    this.svc.atualizar({
      personalizado: {
        ...this.draft().personalizado,
        rendaMensal: this.paraNumero(valor),
      },
    });
  }

  setPersonalizadoSaldo(valor: string) {
    this.svc.atualizar({
      personalizado: {
        ...this.draft().personalizado,
        saldoInicial: this.paraNumero(valor),
      },
    });
  }

  setPersonalizadoReserva(valor: string) {
    this.svc.atualizar({
      personalizado: {
        ...this.draft().personalizado,
        reservaInicial: this.paraNumero(valor),
      },
    });
  }

  private paraNumero(valor: string): number | null {
    if (valor === '' || valor === null || valor === undefined) return null;
    const n = Number(valor);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }
}
