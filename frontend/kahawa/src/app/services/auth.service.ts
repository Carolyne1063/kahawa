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
    const storedUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    if (storedUserId) {
      this.userIdSubject.next(storedUserId);
    }
  }

  // Call this method when the user logs in
  setUserId(userId: string, rememberMe: boolean = false): void {
    this.userIdSubject.next(userId);
    if (rememberMe) {
      localStorage.setItem('userId', userId); // Store in localStorage for persistent login
      sessionStorage.removeItem('userId'); // Clear session storage if any
    } else {
      sessionStorage.setItem('userId', userId); // Store in sessionStorage for temporary login
      localStorage.removeItem('userId'); // Clear localStorage if any
    }
  }

  // Call this method when the user logs out
  logout(): void {
    this.userIdSubject.next(null);
    localStorage.removeItem('userId');
    sessionStorage.removeItem('userId');
  }

  // Get the current user ID
  getUserId(): string | null {
    return this.userIdSubject.value;
  }
}
