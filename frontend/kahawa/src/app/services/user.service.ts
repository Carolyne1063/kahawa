import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, LoginDetails } from '../interfaces/user'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserById(userId: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  
  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(loginDetails: LoginDetails): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginDetails);
  }


 
  updateUser(user: Partial<User>, userId?: string, email?: string): Observable<any> {
    
    if (!userId && !email) {
      throw new Error('Either userId or email must be provided');
    }

    const payload = { ...user, userId, email };
    return this.http.put<any>(`${this.baseUrl}/update`, payload);
  }


  
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }

  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  
  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }
}