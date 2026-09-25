import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INTERVALO_AUTOPLAY_MS, SLIDES_COMO_JOGA, SlideComoJoga } from './como-funciona.data';

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

  protected irPara(index: number): void {
    if (index < 0 || index >= this.totalSlides) return;
    this.indiceAtual.set(index);
    this.reiniciarAutoplay();
  }

  protected anterior(): void {
    const novo = (this.indiceAtual() - 1 + this.totalSlides) % this.totalSlides;
    this.irPara(novo);
  }

  protected proximo(): void {
    const novo = (this.indiceAtual() + 1) % this.totalSlides;
    this.irPara(novo);
  }

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
        this.irPara(0);
        evento.preventDefault();
        break;
      case 'End':
        this.irPara(this.totalSlides - 1);
        evento.preventDefault();
        break;
    }
  }

  private iniciarAutoplay(): void {
    if (this.autoplayId || this.pausado) return;
    this.autoplayId = setInterval(() => {
      const novo = (this.indiceAtual() + 1) % this.totalSlides;
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
