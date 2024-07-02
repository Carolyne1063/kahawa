import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})

export class ShoppingCartComponent {
  cartItems: CartItem[] = [
    { name: 'Espresso', price: 3.50, quantity: 2 },
    { name: 'Cappuccino', price: 4.00, quantity: 1 },
    { name: 'Latte', price: 4.50, quantity: 1 }
  ];

  name: string = '';
  address: string = '';
  telNo: string = '';

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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
