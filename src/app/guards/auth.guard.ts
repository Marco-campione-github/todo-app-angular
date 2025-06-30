// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, filter, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authState$.pipe(
    filter((user) => user !== undefined), // wait until Firebase has initialized
    take(1),
    map((user) => {
      if (user) return true;
      router.navigate(['/login']);
      return false;
    })
  );
};
