import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero';
import { DadosCarousel } from '../components/dados-carousel/dados-carousel';

@Component({
  selector: 'app-home-page',
  imports: [HeroComponent, DadosCarousel],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
