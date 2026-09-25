import { Injectable } from '@angular/core';
import { EstadoJogo } from '../models/estado-jogo.model';
import { CHAVE_ESTADO_JOGO, PREFIXO_JOGO } from '../storage/local-storage.keys';

@Injectable({ providedIn: 'root' })
export class StorageService {
  salvarEstado(estado: EstadoJogo): void {
    try {
      const json = JSON.stringify(estado);
      localStorage.setItem(CHAVE_ESTADO_JOGO, json);
    } catch (erro) {
      console.error('[StorageService] Erro ao salvar estado:', erro);
    }
  }

  carregarEstado(): EstadoJogo | null {
    try {
      const json = localStorage.getItem(CHAVE_ESTADO_JOGO);
      if (!json) return null;

      const estado = JSON.parse(json) as EstadoJogo;

      if (!estado.progressao.conquistas) {
        estado.progressao.conquistas = [];
      }

      return estado;
    } catch (erro) {
      console.error('[StorageService] Erro ao carregar estado:', erro);
      return null;
    }
  }

  temEstadoSalvo(): boolean {
    return localStorage.getItem(CHAVE_ESTADO_JOGO) !== null;
  }

  limpar(): void {
    localStorage.removeItem(CHAVE_ESTADO_JOGO);
  }

  limparTudoDoJogo(): void {
    const chavesParaRemover: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const chave = localStorage.key(i);
      if (chave && chave.startsWith(PREFIXO_JOGO)) {
        chavesParaRemover.push(chave);
      }
    }
    chavesParaRemover.forEach((c) => localStorage.removeItem(c));
  }
}
