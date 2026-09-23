import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarId, AVATARES } from '../../../../core/models/character.model';

@Component({
  selector: 'app-avatar-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-picker.html',
  styleUrl: './avatar-picker.css',
})
export class AvatarPicker {
  @Input() selecionado: AvatarId | null = null;
  @Output() selecionar = new EventEmitter<AvatarId>();

  avatares = AVATARES;

  corDe(id: AvatarId): string {
    const map: Record<AvatarId, string> = {
      'avatar-1': '#A8F000',
      'avatar-2': '#5EB8FF',
      'avatar-3': '#FFC928',
    };
    return map[id];
  }
}
