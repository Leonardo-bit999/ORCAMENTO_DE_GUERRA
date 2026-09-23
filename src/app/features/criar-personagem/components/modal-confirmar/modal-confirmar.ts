import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-confirmar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-confirmar.html',
  styleUrl: './modal-confirmar.css',
})
export class ModalConfirmar {
  @Input() nome = '';
  @Input() perfil = '';
  @Input() saldo = 0;
  @Input() reserva = 0;
  @Input() carregando = false;

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  aoEsc() {
    if (!this.carregando) this.cancelar.emit();
  }

  clicarFora(evento: MouseEvent) {
    if (evento.target === evento.currentTarget && !this.carregando) {
      this.cancelar.emit();
    }
  }
}
