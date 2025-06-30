import { Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<string | null>(null);
  private authStateSubject = new BehaviorSubject<User | null | undefined>(undefined); // undefined = not loaded yet
  authState$ = this.authStateSubject.asObservable();

  constructor(private auth: Auth, private ngZone: NgZone) {
    onAuthStateChanged(this.auth, (user) => {
      this.ngZone.run(() => {
        this.currentUser.set(user?.uid ?? null);
        this.authStateSubject.next(user); // emit user or null
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
