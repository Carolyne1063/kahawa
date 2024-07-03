// src/app/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getCoffeeTypes(): Observable<any> {
    return this.http.get('/api/coffee-types');
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders`);
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
}
