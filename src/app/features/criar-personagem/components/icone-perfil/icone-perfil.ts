import { Component, Input } from '@angular/core';
import { PerfilId } from '../../../../core/models/character.model';

@Component({
  selector: 'app-icone-perfil',
  standalone: true,
  templateUrl: './icone-perfil.html',
  styleUrl: './icone-perfil.css',
})
export class IconePerfil {
  @Input({ required: true }) id!: PerfilId;
}
