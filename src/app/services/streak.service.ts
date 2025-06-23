// src/app/services/streak.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreakService {
  private readonly STREAK_KEY = 'todo_streak';
  private readonly LAST_COMPLETED_KEY = 'todo_last_completed';

  getStreak(): number {
    return parseInt(localStorage.getItem(this.STREAK_KEY) || '0', 10);
  }

  getLastCompletedDate(): string | null {
    return localStorage.getItem(this.LAST_COMPLETED_KEY);
  }

  updateStreakForToday(): number {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const lastCompleted = this.getLastCompletedDate();

    if (lastCompleted === today) {
      return this.getStreak(); // already counted today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak = 1;
    if (lastCompleted === yesterdayStr) {
      newStreak = this.getStreak() + 1;
    }

    localStorage.setItem(this.STREAK_KEY, newStreak.toString());
    localStorage.setItem(this.LAST_COMPLETED_KEY, today);

    return newStreak;
  }

  resetStreakIfNeeded() {
    const today = new Date().toISOString().split('T')[0];
    const last = this.getLastCompletedDate();
    if (!last) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (last !== today && last !== yesterdayStr) {
      localStorage.setItem(this.STREAK_KEY, '0');
    }
  }
}
