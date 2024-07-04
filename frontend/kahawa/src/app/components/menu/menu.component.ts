import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuProducts: Product[] = [];
  successMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

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
    const userId = this.authService.getUserId();
    if (userId) {
      const quantity = '1';
      this.cartService.addItemToCart(userId, product.productId, quantity).subscribe(
        (response: any) => {
          this.successMessage = 'Added to cart!';
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
          console.log('Added to cart:', response);
        },
        (error: any) => {
          console.error('Error adding to cart:', error);
        }
      );
    } else {
      console.error('User ID not found. User may not be logged in.');
    }
  }
}