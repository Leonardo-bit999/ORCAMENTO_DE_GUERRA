import { Injectable, inject, signal } from '@angular/core';
import { Auth } from './auth';
import {
  Character,
  CharacterDraft,
  DRAFT_INICIAL,
  PERFIS,
  RENDA_MENSAL_POR_FONTE,
  VALORES_BASE_DESPESA,
  MODIFICADOR_CUSTO_VIDA,
  MODIFICADOR_MORADIA,
  FonteRenda,
  PerfilId,
  Responsabilidade,
} from '../models/character.model';

const KEY_DRAFT = (uid: string) => `og:character-draft:${uid}`;
const KEY_CHAR = (uid: string) => `og:character:${uid}`;

export type EtapaId = 1 | 2 | 3 | 4;
export const TOTAL_ETAPAS: EtapaId = 4;

@Injectable({ providedIn: 'root' })
export class CharacterService {
  private auth = inject(Auth);

  private _draft = signal<CharacterDraft>(this.carregarDraftInicial());
  readonly draft = this._draft.asReadonly();

  // ---------- Helpers ----------
  private userId(): string | null {
    return this.auth.usuario()?.id ?? null;
  }

  private carregarDraftInicial(): CharacterDraft {
    const uid = this.auth.usuario()?.id;
    if (!uid) return structuredClone(DRAFT_INICIAL);
    try {
      const raw = localStorage.getItem(KEY_DRAFT(uid));
      return raw
        ? { ...structuredClone(DRAFT_INICIAL), ...JSON.parse(raw) }
        : structuredClone(DRAFT_INICIAL);
    } catch {
      return structuredClone(DRAFT_INICIAL);
    }
  }

  private persistir() {
    const uid = this.userId();
    if (!uid) return;
    localStorage.setItem(KEY_DRAFT(uid), JSON.stringify(this._draft()));
  }

  // ---------- Mutação ----------
  atualizar(parcial: Partial<CharacterDraft>) {
    this._draft.update((d) => ({ ...d, ...parcial }));
    this.persistir();
  }

  resetar() {
    this._draft.set(structuredClone(DRAFT_INICIAL));
    const uid = this.userId();
    if (uid) localStorage.removeItem(KEY_DRAFT(uid));
  }

  // ---------- Ações específicas ----------
  selecionarPerfil(perfilId: PerfilId) {
    this.atualizar({ perfilId });
  }

  selecionarFonteRenda(fonte: FonteRenda) {
    if (fonte === 'personalizado') {
      this.atualizar({
        fonteRenda: fonte,
        usarRendaSugerida: false,
        rendaMensal: this._draft().rendaMensal,
      });
      return;
    }
    this.atualizar({
      fonteRenda: fonte,
      usarRendaSugerida: true,
      rendaMensal: RENDA_MENSAL_POR_FONTE[fonte],
    });
  }

  toggleResponsabilidade(id: Responsabilidade) {
    const atual = this._draft().responsabilidades;
    const novas = atual.includes(id) ? atual.filter((r) => r !== id) : [...atual, id];
    this.atualizar({ responsabilidades: novas });
  }

  // ---------- Validação por etapa ----------
  etapaValida(etapa: EtapaId): boolean {
    const d = this._draft();
    switch (etapa) {
      case 1:
        return d.nome.trim().length >= 2 && d.perfilId !== null;

      case 2: {
        if (d.moradia === null || d.custoVida === null) return false;
        if (d.fonteRenda === null) return false;
        if (!d.usarRendaSugerida) {
          return d.rendaMensal !== null && d.rendaMensal > 0;
        }
        return true;
      }

      case 3:
        return (
          d.objetivo !== null && (d.objetivo !== 'outro' || d.objetivoOutroTexto.trim().length >= 2)
        );

      case 4:
        return d.estiloVida !== null && d.vibe !== null;

      default:
        return false;
    }
  }

  etapaTudoValido(): boolean {
    return this.etapaValida(1) && this.etapaValida(2) && this.etapaValida(3) && this.etapaValida(4);
  }

  // ---------- Cálculos ----------
  saldoInicial(): number {
    const d = this._draft();
    const preset = PERFIS.find((p) => p.id === d.perfilId);
    return preset?.saldoInicial ?? 0;
  }

  reservaInicial(): number {
    const d = this._draft();
    const preset = PERFIS.find((p) => p.id === d.perfilId);
    return preset?.reservaInicial ?? 0;
  }

  rendaMensalEfetiva(): number {
    const d = this._draft();
    return d.rendaMensal ?? 0;
  }

  despesasPrevistas(): number {
    const d = this._draft();
    if (!d.custoVida || !d.moradia) return 0;

    const somaBase = d.responsabilidades.reduce(
      (total, r) => total + (VALORES_BASE_DESPESA[r] ?? 0),
      0,
    );

    const multCusto = MODIFICADOR_CUSTO_VIDA[d.custoVida];
    const multMoradia = MODIFICADOR_MORADIA[d.moradia];

    return Math.round(somaBase * multCusto * multMoradia);
  }

  // ---------- Finalização ----------
  finalizar(): Character {
    const d = this._draft();
    const uid = this.userId();
    if (!uid) throw new Error('Usuário não autenticado.');
    if (!this.etapaTudoValido()) throw new Error('Dados incompletos.');

    const preset = PERFIS.find((p) => p.id === d.perfilId);

    const char: Character = {
      id: crypto.randomUUID(),
      userId: uid,
      criadoEm: new Date().toISOString(),

      nome: d.nome.trim(),
      perfilId: d.perfilId!,
      perfilTitulo: preset?.titulo ?? 'Personagem',
      perfilFrase: preset?.frase ?? '',

      moradia: d.moradia,
      fonteRenda: d.fonteRenda,
      usarRendaSugerida: d.usarRendaSugerida,
      rendaMensal: this.rendaMensalEfetiva(),
      custoVida: d.custoVida,
      responsabilidades: [...d.responsabilidades],

      objetivo: d.objetivo,
      objetivoOutroTexto: d.objetivoOutroTexto,

      estiloVida: d.estiloVida,
      vibe: d.vibe,

      saldoInicial: this.saldoInicial(),
      reservaInicial: this.reservaInicial(),
      despesasPrevistas: this.despesasPrevistas(),
    };

    localStorage.setItem(KEY_CHAR(uid), JSON.stringify(char));
    localStorage.removeItem(KEY_DRAFT(uid));
    this._draft.set(structuredClone(DRAFT_INICIAL));
    return char;
  }

  personagem(): Character | null {
    const uid = this.userId();
    if (!uid) return null;
    try {
      const raw = localStorage.getItem(KEY_CHAR(uid));
      return raw ? (JSON.parse(raw) as Character) : null;
    } catch {
      return null;
    }
  }

  temPersonagem(): boolean {
    return this.personagem() !== null;
  }
}
