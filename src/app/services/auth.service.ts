import { Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from '@angular/fire/auth';
import { NgZone } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<string | null>(null);

  constructor(
    private auth: Auth,
    private ngZone: NgZone
  ) {
    onAuthStateChanged(this.auth, user => {
      // Ensure change detection can see this
      this.ngZone.run(() => {
        this.currentUser.set(user?.uid ?? null);
      });
    });
  }

  signUp(email: string, password: string) {
    return this.ngZone.run(() =>
      createUserWithEmailAndPassword(this.auth, email, password)
    );
  }

  login(email: string, password: string) {
    return this.ngZone.run(() =>
      signInWithEmailAndPassword(this.auth, email, password)
    );
  }

  logout() {
    return this.ngZone.run(() =>
      signOut(this.auth)
    );
  }
}
