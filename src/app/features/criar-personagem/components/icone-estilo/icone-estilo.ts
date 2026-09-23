import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstiloVida } from '../../../../core/models/character.model';

@Component({
  selector: 'app-icone-estilo',
  imports: [CommonModule],
  templateUrl: './icone-estilo.html',
  styleUrl: './icone-estilo.css',
})
export class IconeEstilo {
  @Input({ required: true }) id!: EstiloVida;
}
