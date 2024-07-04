import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, LoginDetails } from '../interfaces/user'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserById(userId: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000/api/users'; // Set this to your backend URL

  constructor(private http: HttpClient) {}

  // Register a new user
  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(loginDetails: LoginDetails): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginDetails);
  }


  // Update user information
  updateUser(user: Partial<User>, userId?: string, email?: string): Observable<any> {
    // Ensure that only one of userId or email is provided
    if (!userId && !email) {
      throw new Error('Either userId or email must be provided');
    }

    const payload = { ...user, userId, email };
    return this.http.put<any>(`${this.baseUrl}/update`, payload);
  }


  // Delete a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // Get a single user by ID
  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }
}
