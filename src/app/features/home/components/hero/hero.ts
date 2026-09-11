import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para *ngFor e *ngIf

@Component({
  selector: 'app-hero',
  standalone: true, // Assumindo que seu projeto é standalone (Angular 15+)
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class HeroComponent {

  // Dados do Card (Mock)
  saldoDisponivel: number = 1240;
  despesasMes: number = 1560;
  progressoJornada: number = 33; // Porcentagem
  mesAtual: number = 4;
  diaAtual: number = 18;

  bemEstar: number = 72;
  estresse: number = 34;

  // Lista de Gastos
  gastos = [
    { categoria: 'Moradia', valor: 900 },
    { categoria: 'Alimentação', valor: 600 },
    { categoria: 'Transporte', valor: 350 }
  ];

  // Função para formatar moeda (BRL)
  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
  }
}