import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})

export class TrackOrderComponent {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService  // Inject AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();  // Fetch the logged-in user's ID
    if (userId) {
      this.getOrdersByUser(userId);
    } else {
      console.error('No user ID found. User may not be logged in.');
    }
  }

  getOrdersByUser(userId: string): void {
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (orders) => {
        this.orders = orders.map(order => ({
          ...order,
          // date: new Date(order.date),
          totalPrice: parseFloat(order.price) * parseFloat(order.quantity)
        }));
      },
      error: (error) => console.error('Error fetching orders:', error)
    });
  }

  cancelOrder(orderId: string): void {
    // Implement the cancel order functionality here
    console.log(`Canceling order with ID: ${orderId}`);
  }
}