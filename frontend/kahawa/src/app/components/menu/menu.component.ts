import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menuProducts: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.menuProducts = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(product: Product) {
    const quantity: string = "1"; // Replace with actual quantity
    this.cartService.addItemToCart(product.productId, quantity).subscribe(
      (response: any) => {
        console.log('Added to cart:', response);
      },
      (error: any) => {
        console.error('Error adding to cart:', error);
      }
    );
  }
  userId(userId: any, productId: string, quantity: string) {
    throw new Error('Method not implemented.');
  }
}