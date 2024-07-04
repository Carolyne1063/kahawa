import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-product`, product, { responseType: 'text' });
  }

  updateProduct(productId: string, product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, product, { responseType: 'text' });
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`, { responseType: 'text' });
  }
}
