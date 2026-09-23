import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtapaResumo } from '../../etapas/etapa-resumo/etapa-resumo';

@Component({
  selector: 'app-drawer-resumo',
  standalone: true,
  imports: [CommonModule, EtapaResumo],
  templateUrl: './drawer-resumo.html',
  styleUrl: './drawer-resumo.css',
})
export class DrawerResumo {
  @Input() aberto = false;
  @Output() fechar = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.aberto) this.fechar.emit();
  }

  clicarFundo(evento: MouseEvent) {
    if (evento.target === evento.currentTarget) {
      this.fechar.emit();
    }
  }
}
