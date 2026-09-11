import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero';

@Component({
  selector: 'app-home-page',
  imports: [HeroComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
