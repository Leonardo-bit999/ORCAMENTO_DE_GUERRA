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
  @Input() expandido = false;

  @Output() selecionar = new EventEmitter<void>();
  @Output() alternarExpansao = new EventEmitter<void>();

  aoSelecionar() {
    this.selecionar.emit();
  }

  aoAlternar(evento: Event) {
    evento.stopPropagation();
    this.alternarExpansao.emit();
  }
}
