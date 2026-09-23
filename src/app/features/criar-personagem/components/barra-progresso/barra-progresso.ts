import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface EtapaProgresso {
  numero: number;
  label: string;
}

@Component({
  selector: 'app-barra-progresso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-progresso.html',
  styleUrl: './barra-progresso.css',
})
export class BarraProgresso {
  @Input({ required: true }) etapas: EtapaProgresso[] = [];
  @Input({ required: true }) atual = 1;
  @Input() clicavel = false;

  @Output() irPara = new EventEmitter<number>();

  estadoDe(numero: number): 'concluida' | 'atual' | 'futura' {
    if (numero < this.atual) return 'concluida';
    if (numero === this.atual) return 'atual';
    return 'futura';
  }

  clicar(numero: number) {
    if (!this.clicavel) return;
    if (numero >= this.atual) return; // só volta pra etapas já visitadas
    this.irPara.emit(numero);
  }
}
