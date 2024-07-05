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

export class TrackOrderComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService  
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();  
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
          date: order.date ? new Date(order.date) : new Date(),  
          totalPrice: parseFloat(order.price) * parseFloat(order.quantity)
        }));
      },
      error: (error) => console.error('Error fetching orders:', error)
    });
  }

  deleteOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId).subscribe({
      next: () => {
        this.getOrdersByUser(this.authService.getUserId()!);  
        console.log(`Order with ID ${orderId} has been deleted.`);
      },
      error: (error) => console.error('Error deleting order:', error)
    });
  }
}
