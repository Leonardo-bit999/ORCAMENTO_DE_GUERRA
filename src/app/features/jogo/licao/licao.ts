import { Component } from '@angular/core';
import { GameLayout } from '../../../shared/components/game-layout/game-layout';

@Component({
  selector: 'app-licao',
  standalone: true,
  imports: [GameLayout],
  template: `
    <app-game-layout>
      <p style="color: white; padding: 40px;">Lição — em construção.</p>
    </app-game-layout>
  `,
})
export class Licao { }