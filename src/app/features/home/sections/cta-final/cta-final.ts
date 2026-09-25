import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-final',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cta-final.html',
  styleUrl: './cta-final.css',
})
export class CtaFinal {}
