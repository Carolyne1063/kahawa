import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIdSubject = new BehaviorSubject<string | null>(null);
  public userId$ = this.userIdSubject.asObservable();

  constructor() {
    // Retrieve userId from local storage or session storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userIdSubject.next(storedUserId);
    }
  }

  // Call this method when the user logs in
  setUserId(userId: string): void {
    this.userIdSubject.next(userId);
    localStorage.setItem('userId', userId);
  }

  // Call this method when the user logs out
  logout(): void {
    this.userIdSubject.next(null);
    localStorage.removeItem('userId');
  }

  // Get the current user ID
  getUserId(): string | null {
    return this.userIdSubject.value;
  }
}
