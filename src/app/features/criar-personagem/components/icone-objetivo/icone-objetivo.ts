import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Objetivo } from '../../../../core/models/character.model';

@Component({
  selector: 'app-icone-objetivo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icone-objetivo.html',
  styleUrl: './icone-objetivo.css',
})
export class IconeObjetivo {
  @Input({ required: true }) id!: Objetivo;
}
