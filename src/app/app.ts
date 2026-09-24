import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameStateService } from './core/services/game-state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private gameState = inject(GameStateService);

  ngOnInit(): void {
    this.gameState.carregar();
  }
}
