import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';  // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/api/orders';  // Set this to your backend URL

  constructor(private http: HttpClient) {}

  // Create a new order
createOrder(userId: string, productId: string, quantity: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/create-order`, { userId, productId, quantity });
}


  // Update an existing order
  updateOrder(orderId: string, update: { status?: string, quantity?: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${orderId}`, update);
  }

  // Delete an order
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${orderId}`, { responseType: 'text' });
  }

  // Get all orders
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}`);
  }

  // Get a single order by ID
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
  }

  // Get orders by user ID
  getOrdersByUserId(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/user/${userId}`);
  }
}
