import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Conquista } from '../../../core/models/conquista.model';

@Component({
  selector: 'app-conquista-alerta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './conquista-alerta.html',
  styleUrl: './conquista-alerta.css',
})
export class ConquistaAlerta {
  @Input({ required: true }) conquista!: Conquista;
  @Output() fechar = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  aoEsc() {
    this.fechar.emit();
  }

  fecharModal() {
    this.fechar.emit();
  }
}
