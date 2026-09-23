import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opcao-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opcao-tile.html',
  styleUrl: './opcao-tile.css',
})
export class OpcaoTile {
  @Input({ required: true }) titulo = '';
  @Input() sub = '';
  @Input() selecionado = false;

  @Output() selecionar = new EventEmitter<void>();
}
