import { Component } from '@angular/core';
import { Hero } from '../sections/hero/hero';
import { Problema } from '../sections/problema/problema';
import { Navbar } from '../sections/navbar/navbar';
import { Proposta } from '../sections/proposta/proposta';
import { ComoFunciona } from '../sections/como-funciona/como-funciona';
import { CtaFinal } from '../sections/cta-final/cta-final';
import { Footer } from '../../../core/layout/footer/footer';

@Component({
  selector: 'app-home-page',
  imports: [Navbar, Hero, Problema, Proposta, ComoFunciona, CtaFinal, Footer ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
