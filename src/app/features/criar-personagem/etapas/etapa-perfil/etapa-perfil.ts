import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../../../core/services/character';
import { PERFIS, PerfilId } from '../../../../core/models/character.model';
import { IconePerfil } from '../../components/icone-perfil/icone-perfil';

@Component({
  selector: 'app-etapa-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, IconePerfil],
  templateUrl: './etapa-perfil.html',
  styleUrls: ['./etapa-perfil.css', '../../criacao.shared.css'],
})
export class EtapaPerfil {
  private svc = inject(CharacterService);

  perfis = PERFIS;
  draft = this.svc.draft;

  get nomeInvalido(): boolean {
    return this.draft().nome.length > 0 && this.draft().nome.trim().length < 2;
  }

  setNome(valor: string) {
    this.svc.atualizar({ nome: valor });
  }

  selecionarPerfil(id: PerfilId) {
    this.svc.selecionarPerfil(id);
  }

  formatarMoeda(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR')}`;
  }
}
