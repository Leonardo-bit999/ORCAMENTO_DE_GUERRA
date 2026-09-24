/* =========================================================
   StorageService — encapsula o localStorage
   ========================================================= */

import { Injectable } from '@angular/core';
import { EstadoJogo } from '../models/estado-jogo.model';
import { CHAVE_ESTADO_JOGO, PREFIXO_JOGO } from '../storage/local-storage.keys';

@Injectable({ providedIn: 'root' })
export class StorageService {
  /**
   * Salva o EstadoJogo completo no localStorage.
   */
  salvarEstado(estado: EstadoJogo): void {
    try {
      const json = JSON.stringify(estado);
      localStorage.setItem(CHAVE_ESTADO_JOGO, json);
    } catch (erro) {
      console.error('[StorageService] Erro ao salvar estado:', erro);
    }
  }

  /**
   * Carrega o EstadoJogo salvo.
   * Retorna null se não houver nada ou se o JSON estiver corrompido.
   */
  carregarEstado(): EstadoJogo | null {
    try {
      const json = localStorage.getItem(CHAVE_ESTADO_JOGO);
      if (!json) return null;
      const estado = JSON.parse(json) as EstadoJogo;
      // Fallback pra estados antigos sem o campo conquistas
      if (!estado.progressao.conquista) {
        estado.progressao.conquista = [];
      }
      return estado;
    } catch (erro) {
      console.error('[StorageService] Erro ao carregar estado:', erro);
      return null;
    }
  }

  /**
   * Verifica se existe um estado salvo.
   * (Não valida o conteúdo, só a existência.)
   */
  temEstadoSalvo(): boolean {
    return localStorage.getItem(CHAVE_ESTADO_JOGO) !== null;
  }

  /**
   * Remove o estado atual do jogo.
   */
  limpar(): void {
    localStorage.removeItem(CHAVE_ESTADO_JOGO);
  }

  /**
   * Remove TUDO relacionado ao jogo (estado + possíveis chaves futuras).
   * Útil pra "novo jogo" ou debug.
   */
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
