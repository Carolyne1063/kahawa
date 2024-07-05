import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';  

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/api/orders';  

  constructor(private http: HttpClient) {}

  
createOrder(userId: string, productId: string, quantity: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/create-order`, { userId, productId, quantity });
}


  updateOrder(orderId: string, update: { status?: string, quantity?: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${orderId}`, update);
  }

 
  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${orderId}`, { responseType: 'text' });
  }

 
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}`);
  }

  
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${orderId}`);
  }

 
  getOrdersByUserId(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/user/${userId}`);
  }
}
