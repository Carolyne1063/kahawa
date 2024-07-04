import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/cart';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  name: string = '';
  address: string = '';
  telNo: string = '';

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userId$.subscribe(userId => {
      if (userId) {
        this.loadCartItems(userId);
      } else {
        console.error('User ID is null');
      }
    });
  }

  loadCartItems(userId: string) {
    this.cartService.getCartItems(userId).subscribe(
      (items) => {
        this.cartItems = items;
      },
      (error) => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  getTotal() {
    return this.cartItems
      .reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)
      .toFixed(2);
  }

  formatPrice(price: number) {
    return price.toFixed(2);
  }

  isFormValid() {
    return this.name && this.address && this.telNo;
  }

  completeOrder() {
    if (this.isFormValid()) {
      alert('Order completed successfully! Go to track.');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
