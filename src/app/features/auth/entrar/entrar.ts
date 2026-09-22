import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Cadastro } from '../cadastro/cadastro';
import { Login } from '../login/login';
import { AuthLayout } from '../auth-layout/auth-layout';

type Tab = 'login' | 'cadastro';

@Component({
  selector: 'app-entrar',
  imports: [CommonModule, AuthLayout, Cadastro, Login],
  templateUrl: './entrar.html',
  styleUrl: './entrar.css',
})
export class Entrar {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  tab = signal<Tab>('login');

  constructor() {
    const param = this.route.snapshot.queryParamMap.get('tab');
    if (param === 'cadastro' || param === 'login') {
      this.tab.set(param);
    }
    this.route.queryParamMap.subscribe((p) => {
      const t = p.get('tab');
      if (t === 'cadastro' || t === 'login') this.tab.set(t);
    });
  }

  trocar(t: Tab) {
    if (this.tab() === t) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: t },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  irParaCriacaoPersonagem() {
    this.router.navigate(['/character/create']);
  }
}
