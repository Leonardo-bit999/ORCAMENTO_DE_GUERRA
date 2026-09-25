import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opcao-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opcao-chip.html',
  styleUrl: './opcao-chip.css',
})
export class OpcaoChip {
  @Input({ required: true }) label = '';
  @Input() sub = '';
  @Input() selecionado = false;
  @Input() disabled = false;

  @Output() selecionar = new EventEmitter<void>();
}
