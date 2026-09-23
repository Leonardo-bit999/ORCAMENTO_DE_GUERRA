import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vibe } from '../../../../core/models/character.model';

@Component({
  selector: 'app-icone-vibe',
  imports: [CommonModule],
  templateUrl: './icone-vibe.html',
  styleUrl: './icone-vibe.css',
})
export class IconeVibe {
  @Input({ required: true }) id!: Vibe;
}
