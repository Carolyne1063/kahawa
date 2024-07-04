import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
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
  selectedItem: CartItem | null = null;
  name: string = '';
  address: string = '';
  telNo: string = '';
  productName: string = '';
  quantity: string = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.getCartItems(userId).subscribe(
        (items) => {
          this.cartItems = items;
        },
        (error) => {
          console.error('Error fetching cart items:', error);
        }
      );
    }
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + parseFloat(item.price) * parseInt(item.quantity), 0).toFixed(2);
  }

  formatPrice(price: string) {
    return parseFloat(price).toFixed(2);
  }

  isFormValid() {
    return this.name && this.address && this.telNo && this.productName && this.quantity;
  }

  selectItem(item: CartItem) {
    this.selectedItem = item;
    this.productName = item.name;
    this.quantity = item.quantity;

    const userId = this.authService.getUserId();
    if (userId) {
      this.userService.getUser(userId).subscribe(user => {
        this.name = user.firstname + ' ' + user.lastname;
        this.address = user.address;
        this.telNo = user.phoneNumber;
      });
    }
  }

  placeOrder() {
    if (this.isFormValid() && this.selectedItem) {
      const userId = this.authService.getUserId();
      if (userId) {
        this.orderService.createOrder(userId, this.selectedItem.productId, this.quantity).subscribe(
          (response) => {
            alert(response.message || 'Order placed successfully!');
            this.loadCartItems(); // Refresh cart items
            this.resetForm();
          },
          (error) => {
            console.error('Error placing order:', error);
            alert('Failed to place order.');
          }
        );
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }

  resetForm() {
    this.name = '';
    this.address = '';
    this.telNo = '';
    this.productName = '';
    this.quantity = '';
    this.selectedItem = null;
  }

  removeItem(cartId: string, productId: string) {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.removeItemFromCart(cartId, userId, productId).subscribe(
        () => {
          this.loadCartItems(); // Refresh cart items
        },
        (error) => {
          console.error('Error removing item from cart:', error);
          alert('Failed to remove item from cart.');
        }
      );
    }
  }

  clearCart() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.cartService.clearCart(userId).subscribe(
        () => {
          this.loadCartItems(); // Refresh cart items
        },
        (error) => {
          console.error('Error clearing cart:', error);
          alert('Failed to clear cart.');
        }
      );
    }
  }
}
