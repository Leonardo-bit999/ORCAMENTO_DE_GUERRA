import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface OpcaoMissao {
  id: string;
  icone: 'aceitar' | 'negociar' | 'recusar';
  titulo: string;
  descricao: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly opcoes: OpcaoMissao[] = [
    {
      id: 'aceitar',
      icone: 'aceitar',
      titulo: 'Aceitar e trabalhar',
      descricao: 'O dinheiro faz diferença.',
    },
    {
      id: 'negociar',
      icone: 'negociar',
      titulo: 'Negociar uma parte',
      descricao: 'Faço metade, ganho metade.',
    },
    {
      id: 'recusar',
      icone: 'recusar',
      titulo: 'Recusar e descansar',
      descricao: 'Meu tempo também vale.',
    },
  ];
}
