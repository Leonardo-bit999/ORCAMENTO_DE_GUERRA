import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['../auth-form.shared.css'],
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  mostrarSenha = signal(false);
  carregando = signal(false);
  erroServidor = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
  });

  get f() {
    return this.form.controls;
  }

  toggleSenha() {
    this.mostrarSenha.update((v) => !v);
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.carregando.set(true);
    this.erroServidor.set(null);

    const { email, senha } = this.form.getRawValue();
    try {
      await this.auth.entrar({ email: email!, senha: senha! });
      this.router.navigate(['/criar-personagem']);
    } catch (e: any) {
      this.erroServidor.set(e?.message ?? 'Erro ao entrar. Tente novamente.');
    } finally {
      this.carregando.set(false);
    }
  }
}
