import { Component } from '@angular/core';
import { Navbar } from '../../../core/layout/navbar/navbar';

@Component({
  selector: 'app-auth-layout',
  imports: [ Navbar],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {}
