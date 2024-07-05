import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIdSubject = new BehaviorSubject<string | null>(null);
  public userId$ = this.userIdSubject.asObservable();

  constructor() {
    const storedUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    if (storedUserId) {
      this.userIdSubject.next(storedUserId);
    }
  }

  
  setUserId(userId: string, rememberMe: boolean = false): void {
    this.userIdSubject.next(userId);
    if (rememberMe) {
      localStorage.setItem('userId', userId); 
      sessionStorage.removeItem('userId'); 
    } else {
      sessionStorage.setItem('userId', userId); 
      localStorage.removeItem('userId'); 
    }
  }

 
  logout(): void {
    this.userIdSubject.next(null);
    localStorage.removeItem('userId');
    sessionStorage.removeItem('userId');
  }


  getUserId(): string | null {
    return this.userIdSubject.value;
  }
}
