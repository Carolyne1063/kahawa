import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Order {
  id: number;
  item: string;
  quantity: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed';
  date: string;  // Additional field for order date
}

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})

export class TrackOrderComponent {
  orders: Order[] = [
    { id: 1, item: 'Espresso', quantity: 2, totalPrice: 7.00, status: 'Pending', date: '2024-06-30' },
    { id: 2, item: 'Cappuccino', quantity: 1, totalPrice: 4.00, status: 'Confirmed', date: '2024-06-29' },
    { id: 3, item: 'Latte', quantity: 3, totalPrice: 13.50, status: 'Pending', date: '2024-06-28' }
  ];
}
