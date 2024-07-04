import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';  // Import the OrderService
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
  successMessage: string = '';  // Add success message variable
  errorMessage: string = '';  // Add error message variable

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const userId = this.authService.getUserId();  // Get the current user's ID
    if (userId) {
      this.cartService.getCartItems(userId).subscribe(
        (items) => {
          this.cartItems = items;
        },
        (error) => {
          console.error('Error fetching cart items:', error);
        }
      );
    } else {
      console.error('User ID not found. User may not be logged in.');
    }
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + parseFloat(item.price) * parseInt(item.quantity), 0).toFixed(2);
  }

  formatPrice(price: string) {
    return parseFloat(price).toFixed(2);
  }

  isFormValid() {
    return this.name && this.address && this.telNo;
  }

  placeOrder() {
    if (this.isFormValid()) {
      const userId = this.authService.getUserId();  // Get the current user's ID
      if (userId) {
        // Iterate over cart items and create an order for each
        this.cartItems.forEach((item) => {
          this.orderService.createOrder(userId, item.productId, item.quantity).subscribe(
            () => {
              // Clear the cart on successful order
              this.cartService.clearCart(userId).subscribe(() => {
                this.successMessage = 'Order placed successfully!';
                this.cartItems = [];
              });
            },
            (error) => {
              console.error('Error placing order:', error);
              this.errorMessage = 'Failed to place order. Please try again.';
            }
          );
        });
      } else {
        this.errorMessage = 'User ID not found. User may not be logged in.';
      }
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}
