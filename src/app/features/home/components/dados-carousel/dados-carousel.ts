import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';

interface SlideDestaque {
  title: string;
  text: string;
  description: string;
  link: string;
  image: string;
  source: string;
  alt: string;
}

@Component({
  selector: 'app-dados-carousel',
  imports: [CommonModule],
  templateUrl: './dados-carousel.html',
  styleUrl: './dados-carousel.css'
})
export class DadosCarousel implements OnInit, OnDestroy {
  protected readonly activeIndex = signal(0);

  protected readonly slides: SlideDestaque[] = [
    {
      title: '80,6 milhões',
      description: 'de brasileiros terminaram o ano de 2025 inadimplentes',
      text: 'O país fechou o ano com recorde de pessoas com o nome negativado, segundo o Mapa da Inadimplência e Negociação de Dívidas.',
      source: 'Serasa Experian - Dezembro de 2025',
      link: 'https://www.serasa.com.br/imprensa/inadimplencia-ultrapassa-806-milhoes-virada-ano-dividas-impedem-sonhos-serasa/',
      image: '/images/dado-inadimplencia.png',
      alt: 'Contas e faturas em atraso espalhadas sobre a mesa de uma casa simples'
    },
    {
      title: '78,9%',
      description: 'das famílias brasileiras estavam endividadas',
      text: 'Quase 8 em cada 10 famílias encerraram 2025 com algum tipo de dívida a vencer — o maior nível já registrado para um mês de dezembro.',
      source: 'CNC - Pesquisa de Endividamento e Inadimplência do Consumidor (Peic) - Dezembro de 2025',
      link: 'https://pesquisascnc.com.br/pesquisa-peic/',
      image: '/images/dado-familias.png',
      alt: 'Mãos organizando comprovantes e moedas sobre uma mesa pequena em casa'
    },
    {
      title: 'R$ 518 bilhões',
      description: 'em dívidas atrasadas no país',
      text: 'O total de pendências equivale a cerca de metade da população adulta com contas em atraso, concentradas em bancos, cartões e contas básicas.',
      source: 'Serasa Experian - 2025',
      link: 'https://www.serasa.com.br/limpa-nome-online/blog/mapa-da-inadimplencia-e-renogociacao-de-dividas-no-brasil/',
      image: '/images/dado-cartao.png',
      alt: 'Mão segurando um cartão de crédito em frente a uma máquina de pagamento'
    },
    {
      title: 'Quase 1/3',
      description: 'dos brasileiros não têm nenhuma reserva financeira',
      text: 'E só 24% conseguiriam se sustentar por mais de seis meses com o que têm guardado. Sem colchão, qualquer imprevisto vira dívida.',
      source: 'Anbima/Datafolha - 2026',
      link: 'https://www.infomoney.com.br/onde-investir/quase-1-3-dos-brasileiros-nao-tem-nenhuma-reserva-financeira-diz-estudo-da-anbima/',
      image: '/images/dado-reserva.png',
      alt: 'Cofrinhos quase vazios com poucas moedas no parapeito de uma janela urbana'
    },
    {
      title: '+49%',
      description: 'de jovens de 18 a 25 anos renegociando dívidas',
      text: 'As negociações da Geração Z cresceram quase 50% entre janeiro e julho de 2025 — sinal de que a conta chega cedo.',
      source: 'Serasa Limpa Nome - 2025',
      link: 'https://www.serasa.com.br/imprensa/geracao-z-e-o-publico-que-mais-cresce-nas-negociacoes-de-dividas/',
      image: '/images/dado-jovens.png',
      alt: 'Jovem trabalhador de uniforme conferindo o celular em um ponto de ônibus à noite'
    },
  ];

  private readonly AUTOPLAY_INTERVAL = 6000; // 6 segundos (era 10s, deixei mais ágil)
  private autoplayId: ReturnType<typeof setInterval> | undefined;
  private isPaused = false;
  private readonly reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ngOnInit(): void {
    this.retomar();
  }

  ngOnDestroy(): void {
    this.pararAutoplay();
  }

  protected anterior(): void {
    this.activeIndex.update((index) => (index - 1 + this.slides.length) % this.slides.length);
    this.reiniciarAutoplay();
  }

  protected proximo(): void {
    this.activeIndex.update((index) => (index + 1) % this.slides.length);
    this.reiniciarAutoplay();
  }

  protected irPara(index: number): void {
    if (index < 0 || index >= this.slides.length) return;
    this.activeIndex.set(index);
    this.reiniciarAutoplay();
  }

  protected pausar(): void {
    this.isPaused = true;
    this.pararAutoplay();
  }

  protected onCarouselKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowRight':
        this.proximo();
        event.preventDefault();
        break;
      case 'ArrowLeft':
        this.anterior();
        event.preventDefault();
        break;
      case 'Home':
        this.irPara(0);
        event.preventDefault();
        break;
      case 'End':
        this.irPara(this.slides.length - 1);
        event.preventDefault();
        break;
      default:
        return;
    }
  }

  protected retomar(): void {
    this.isPaused = false;
    if (!this.reducedMotion) this.iniciarAutoplay();
  }

  private iniciarAutoplay(): void {
    if (this.autoplayId || this.isPaused || this.reducedMotion) return;
    this.autoplayId = setInterval(() => {
      this.activeIndex.update((index) => (index + 1) % this.slides.length);
    }, this.AUTOPLAY_INTERVAL);
  }

  private reiniciarAutoplay(): void {
    this.pararAutoplay();
    this.iniciarAutoplay();
  }

  private pararAutoplay(): void {
    if (this.autoplayId) clearInterval(this.autoplayId);
    this.autoplayId = undefined;
  }
}