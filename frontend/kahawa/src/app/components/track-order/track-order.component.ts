import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})

export class TrackOrderComponent {
  orders: Order[] = [];  // Add this property to hold orders

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // Load all orders
  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders.map(order => ({
          ...order,
          item: order.name,  // Set item as the product name
          totalPrice: parseFloat(order.price),  // Convert price string to number for display
          date: new Date().toLocaleDateString(),  // Placeholder for order date, adjust as needed
        }));
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // Cancel order method
  cancelOrder(orderId: string): void {
    this.orderService.deleteOrder(orderId).subscribe(
      () => {
        this.loadOrders();  // Refresh the list of orders
        console.log('Order canceled successfully');
      },
      error => {
        console.error('Error canceling order:', error);
      }
    );
  }
}