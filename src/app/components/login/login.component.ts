// src/app/pages/login.component.ts
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = signal('');
  password = signal('');
  error = signal<string | null>(null);

  login() {
    const email = this.email().trim();
    const password = this.password().trim();

    if (!email || !password) return;

    this.authService.login(email, password)
      .then(() => this.router.navigate(['/todos']))
      .catch((err) => this.error.set(err.message));
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  
}
