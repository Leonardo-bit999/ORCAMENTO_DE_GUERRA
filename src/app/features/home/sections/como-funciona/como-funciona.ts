import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PassoJogo {
  numero: string;
  titulo: string;
  descricao: string;
  cor: 'green' | 'yellow' | 'purple' | 'blue';
  icone: string; // Path do SVG
}

@Component({
  selector: 'app-como-funciona',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './como-funciona.html',
  styleUrls: ['./como-funciona.css'],
})
export class ComoFunciona {
  // Dados dos passos da jornada
  passos = signal<PassoJogo[]>([
    {
      numero: '01',
      titulo: 'Escolha seu Personagem',
      descricao:
        'Assuma o papel de um perfil real. Cada personagem tem uma renda, despesas e objetivos diferentes. Não existem fórmulas mágicas, apenas realidades distintas.',
      cor: 'blue',
      icone:
        'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M23 11h-6',
    },
    {
      numero: '02',
      titulo: 'Tome Decisões',
      descricao:
        'O jogo apresenta situações do dia a dia. Onde morar? Quanto guardar? Comprar à vista ou parcelar? Suas escolhas alteram diretamente o seu saldo e equilíbrio.',
      cor: 'green',
      icone: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    },
    {
      numero: '03',
      titulo: 'Enfrente Imprevistos',
      descricao:
        'A vida não é linear. Eventos aleatórios como um pneu furado ou uma oportunidade de renda extra surgem para testar sua resiliência e planejamento.',
      cor: 'yellow',
      icone: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
    },
    {
      numero: '04',
      titulo: 'Aprenda com o Feedback',
      descricao:
        'Não há "game over", há aprendizado. O jogo mostra o impacto de cada decisão, ensinando na prática sobre orçamento, dívidas e qualidade de vida.',
      cor: 'purple',
      icone: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3',
    },
  ]);
}
