import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interfaces/cart';


@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})

export class ShoppingCartComponent {
  cartItems: CartItem[] = [];
  name: string = '';
  address: string = '';
  telNo: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const userId = 'exampleUserId'; // Replace with actual user ID
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
      // Handle order placement logic here
      alert('Order placed successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}