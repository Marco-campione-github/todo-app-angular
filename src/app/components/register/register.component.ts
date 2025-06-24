// src/app/pages/register.component.ts
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = signal('');
  password = signal('');
  error = signal<string | null>(null);

  register() {
    const email = this.email().trim();
    const password = this.password().trim();

    if (!email || !password) return;

    this.authService.signUp(email, password)
      .then(() => this.router.navigate(['/todos']))
      .catch((err) => this.error.set(err.message));
  }
}
