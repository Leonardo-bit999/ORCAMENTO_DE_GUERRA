import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';

const KEY_USERS = 'og:users';
const KEY_SESSAO = 'og:sessao';

interface StoredUser extends User {
  senhaHash: string;
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private _usuario = signal<User | null>(this.lerSessao());
  readonly usuario = this._usuario.asReadonly();
  readonly logado = computed(() => this._usuario() !== null);

  private lerSessao(): User | null {
    try {
      const raw = localStorage.getItem(KEY_SESSAO);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  }

  private lerUsuarios(): StoredUser[] {
    try {
      return JSON.parse(localStorage.getItem(KEY_USERS) ?? '[]');
    } catch {
      return [];
    }
  }

  private hashSimples(s: string): string {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return `mock_${h}`;
  }

  cadastrar(dados: { nome: string; email: string; senha: string }): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuarios = this.lerUsuarios();
        const email = dados.email.trim().toLowerCase();

        if (usuarios.some((u) => u.email === email)) {
          return reject(new Error('Este e-mail já está cadastrado.'));
        }

        const novo: StoredUser = {
          id: crypto.randomUUID(),
          nome: dados.nome.trim(),
          email,
          criadoEm: new Date().toISOString(),
          senhaHash: this.hashSimples(dados.senha),
        };

        usuarios.push(novo);
        localStorage.setItem(KEY_USERS, JSON.stringify(usuarios));

        const { senhaHash, ...publico } = novo;
        localStorage.setItem(KEY_SESSAO, JSON.stringify(publico));
        this._usuario.set(publico);
        resolve(publico);
      }, 500);
    });
  }

  entrar(dados: { email: string; senha: string }): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usuarios = this.lerUsuarios();
        const email = dados.email.trim().toLowerCase();
        const encontrado = usuarios.find((u) => u.email === email);

        if (!encontrado || encontrado.senhaHash !== this.hashSimples(dados.senha)) {
          return reject(new Error('E-mail ou senha inválidos.'));
        }

        const { senhaHash, ...publico } = encontrado;
        localStorage.setItem(KEY_SESSAO, JSON.stringify(publico));
        this._usuario.set(publico);
        resolve(publico);
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem(KEY_SESSAO);
    this._usuario.set(null);
  }
}
