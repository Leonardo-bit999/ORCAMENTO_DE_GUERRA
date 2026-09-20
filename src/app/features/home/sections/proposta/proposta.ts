import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PropostaCard {
  id: string;
  moduleCode: string;
  title: string;
  description: string;
  colorTheme: 'green' | 'yellow' | 'purple';
  iconSvg: string; // Armazenando o path do SVG
}

@Component({
  selector: 'app-proposta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proposta.html',
  styleUrls: ['./proposta.css'],
})
export class Proposta {
  // Dados dos cards usando Signal
  cards = signal<PropostaCard[]>([
    {
      id: 'dinheiro',
      moduleCode: 'MOD_01',
      title: 'DINHEIRO',
      description:
        'Seu salário, suas despesas, sua reserva e suas dívidas mudam conforme suas escolhas.',
      colorTheme: 'green',
      // Ícone de "Link/Corrente"
      iconSvg:
        'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
    },
    {
      id: 'imprevistos',
      moduleCode: 'MOD_02',
      title: 'IMPREVISTOS',
      description:
        'Pneu furado, consulta médica, oportunidade de renda ou ajuda em casa. A vida não pergunta se você estava preparado.',
      colorTheme: 'yellow',
      // Ícone de Raio
      iconSvg: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    },
    {
      id: 'bem-estar',
      moduleCode: 'MOD_03',
      title: 'BEM-ESTAR',
      description:
        'O objetivo não é simplesmente economizar o máximo. É encontrar equilíbrio entre segurança financeira e qualidade de vida.',
      colorTheme: 'purple',
      // Ícone de Coração
      iconSvg:
        'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
    },
  ]);
}
