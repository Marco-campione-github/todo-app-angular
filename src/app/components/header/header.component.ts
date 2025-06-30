import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = 'My Todo App';
  public authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch((err) => {
      console.error('Logout failed:', err);
    });
  }
}