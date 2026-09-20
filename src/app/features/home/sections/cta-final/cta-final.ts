import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-cta-final',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-final.html',
  styleUrls: ['./cta-final.css'],
})
export class CtaFinal {
  // Injeção de dependência moderna usando inject()
  private router = inject(Router);

  iniciarSimulacao(): void {
    // Opção 1: Navegar para uma rota específica do jogo
    this.router.navigate(['/simulacao']);
  }
}
