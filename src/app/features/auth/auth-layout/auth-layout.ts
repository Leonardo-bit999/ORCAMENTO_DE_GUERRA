import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../../core/layout/navbar/navbar';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterLink, Navbar],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
