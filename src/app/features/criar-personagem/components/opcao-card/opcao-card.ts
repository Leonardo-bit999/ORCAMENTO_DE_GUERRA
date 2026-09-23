import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opcao-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './opcao-card.html',
  styleUrl: './opcao-card.css',
})
export class OpcaoCard {
  @Input({ required: true }) titulo = '';
  @Input() frase = '';
  @Input() bullets: string[] = [];
  @Input() destaque = '';
  @Input() destaque2 = '';
  @Input() rodape = '';
  @Input() selecionado = false;

  @Output() selecionar = new EventEmitter<void>();
}
