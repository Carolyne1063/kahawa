// src/app/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getCoffeeTypes(): Observable<any> {
    return this.http.get('/api/coffee-types');
  }

  getOrders(): Observable<any> {
    return this.http.get('/api/orders');
  }

  getCustomers(): Observable<any> {
    return this.http.get('/api/customers');
  }
}
