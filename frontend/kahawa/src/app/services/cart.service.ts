import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart';

  constructor(private http: HttpClient) {}

  addItemToCart(userId: string, productId: string, quantity: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { userId, productId, quantity });
  }

  updateCartItem(cartId: string, userId: string, productId: string, quantity: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, { cartId, userId, productId, quantity });
  }

  removeItemFromCart(cartId: string, userId: string, productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove`, { body: { cartId, userId, productId } });
  }

  getCartItems(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/items/${userId}`);
  }

  clearCart(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear/${userId}`);
  }
}
