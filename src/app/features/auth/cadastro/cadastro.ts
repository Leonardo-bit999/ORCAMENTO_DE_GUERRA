import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../core/services/auth';


function senhasIguais(group: AbstractControl): ValidationErrors | null {
  const s = group.get('senha')?.value;
  const c = group.get('confirmarSenha')?.value;
  return s === c ? null : { senhasDiferentes: true };
}

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css', '../../shared/auth-form.css'],
})
export class Cadastro {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  mostrarSenha = signal(false);
  mostrarConfirmar = signal(false);
  carregando = signal(false);
  erroServidor = signal<string | null>(null);

  form = this.fb.group(
    {
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required]],
      aceitaTermos: [false, [Validators.requiredTrue]],
    },
    { validators: senhasIguais },
  );

  get f() {
    return this.form.controls;
  }

  toggleSenha() {
    this.mostrarSenha.update((v) => !v);
  }
  toggleConfirmar() {
    this.mostrarConfirmar.update((v) => !v);
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.carregando.set(true);
    this.erroServidor.set(null);

    const { nome, email, senha } = this.form.getRawValue();
    try {
      await this.auth.cadastrar({ nome: nome!, email: email!, senha: senha! });
      this.router.navigate(['/criar-personagem']);
    } catch (e: any) {
      this.erroServidor.set(e?.message ?? 'Erro ao criar conta. Tente novamente.');
    } finally {
      this.carregando.set(false);
    }
  }
}
