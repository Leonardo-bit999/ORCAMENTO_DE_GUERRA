import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Compromisso {
  categoria: string;
  valor: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero {

  protected readonly saldoDisponivel = 1240;

  protected readonly impactoRecente = -480;

  protected readonly bemEstar = 72;
  protected readonly estresse = 34;
  protected readonly financeiro = 55;

  protected readonly compromissos: Compromisso[] = [
    { categoria: 'Moradia', valor: 900 },
    { categoria: 'Alimentação', valor: 600 },
    { categoria: 'Transporte', valor: 350 }
  ];

  protected formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    });
  }
}