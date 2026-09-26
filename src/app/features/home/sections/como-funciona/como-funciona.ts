import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INTERVALO_AUTOPLAY_MS, SLIDES_COMO_JOGA, SlideComoJoga } from './como-funciona.data';

type Direcao = 'proximo' | 'anterior';

@Component({
  selector: 'app-como-funciona',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './como-funciona.html',
  styleUrl: './como-funciona.css',
})
export class ComoFunciona implements OnInit, OnDestroy {
  protected readonly slides: SlideComoJoga[] = SLIDES_COMO_JOGA;

  protected readonly indiceAtual = signal(0);
  protected readonly totalSlides = SLIDES_COMO_JOGA.length;

  /** Direção da última transição (pra animar corretamente). */
  protected readonly direcao = signal<Direcao>('proximo');

  protected readonly slideAtual = computed<SlideComoJoga>(() => this.slides[this.indiceAtual()]);

  private autoplayId: ReturnType<typeof setInterval> | undefined;
  private pausado = false;

  private readonly prefereMenosMovimento =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ngOnInit(): void {
    if (!this.prefereMenosMovimento) {
      this.iniciarAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.pararAutoplay();
  }

  // =========================================================
  // Navegação
  // =========================================================

  protected irPara(index: number, direcao?: Direcao): void {
    if (index < 0 || index >= this.totalSlides) return;
    if (index === this.indiceAtual()) return;

    // Detecta direção automaticamente se não foi passada
    if (!direcao) {
      direcao = index > this.indiceAtual() ? 'proximo' : 'anterior';
    }

    this.direcao.set(direcao);
    this.indiceAtual.set(index);
    this.reiniciarAutoplay();
  }

  protected anterior(): void {
    const novo = (this.indiceAtual() - 1 + this.totalSlides) % this.totalSlides;
    this.irPara(novo, 'anterior');
  }

  protected proximo(): void {
    const novo = (this.indiceAtual() + 1) % this.totalSlides;
    this.irPara(novo, 'proximo');
  }

  // =========================================================
  // Hover / foco (pausa autoplay)
  // =========================================================

  protected pausar(): void {
    this.pausado = true;
    this.pararAutoplay();
  }

  protected retomar(): void {
    this.pausado = false;
    if (!this.prefereMenosMovimento) {
      this.iniciarAutoplay();
    }
  }

  // =========================================================
  // Teclado
  // =========================================================

  protected aoPressionarTecla(evento: KeyboardEvent): void {
    switch (evento.key) {
      case 'ArrowRight':
        this.proximo();
        evento.preventDefault();
        break;
      case 'ArrowLeft':
        this.anterior();
        evento.preventDefault();
        break;
      case 'Home':
        this.irPara(0, 'anterior');
        evento.preventDefault();
        break;
      case 'End':
        this.irPara(this.totalSlides - 1, 'proximo');
        evento.preventDefault();
        break;
    }
  }

  // =========================================================
  // Autoplay
  // =========================================================

  private iniciarAutoplay(): void {
    if (this.autoplayId || this.pausado) return;
    this.autoplayId = setInterval(() => {
      const novo = (this.indiceAtual() + 1) % this.totalSlides;
      this.direcao.set('proximo');
      this.indiceAtual.set(novo);
    }, INTERVALO_AUTOPLAY_MS);
  }

  private pararAutoplay(): void {
    if (this.autoplayId) {
      clearInterval(this.autoplayId);
      this.autoplayId = undefined;
    }
  }

  private reiniciarAutoplay(): void {
    this.pararAutoplay();
    if (!this.prefereMenosMovimento && !this.pausado) {
      this.iniciarAutoplay();
    }
  }
}
