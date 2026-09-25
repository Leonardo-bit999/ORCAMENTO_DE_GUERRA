import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadoRealidade, DESTAQUE, SECUNDARIOS } from './problema.data';

@Component({
  selector: 'app-problema',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './problema.html',
  styleUrl: './problema.css',
})
export class Problema {
  protected readonly destaque: DadoRealidade = DESTAQUE;
  protected readonly secundarios: DadoRealidade[] = SECUNDARIOS;
}
