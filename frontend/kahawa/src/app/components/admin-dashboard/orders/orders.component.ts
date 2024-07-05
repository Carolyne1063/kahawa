import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { CustomersComponent } from '../customers/customers.component';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { Order } from '../../../interfaces/order'; 

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, MenuAdminComponent, AdminComponent, CustomersComponent, FormsModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data: Order[]) => {
        console.log(data);
        this.orders = data;
        this.orders.forEach(order => order.editingStatus = false); 
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  shortenId(id: string): string {
    return id.substring(0, 8);
  }

  editOrderStatus(order: Order): void {
    order.editingStatus = true;
  }

  cancelUpdate(order: Order): void {
    order.editingStatus = false;
  }

  updateOrderStatus(order: Order): void {
    this.orderService.updateOrder(order.orderId, { status: order.status }).subscribe(
      (response) => {
        console.log('Order status updated successfully:', response);
        order.editingStatus = false;
        this.loadOrders(); 
      },
      (error) => {
        console.error('Error updating order status:', error);
        
      }
    );
  }

  deleteOrder(orderId: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        (response) => {
          console.log('Order deleted successfully:', response);
          this.loadOrders(); 
        },
        (error) => {
          console.error('Error deleting order:', error);
        }
      );
    }
  }
}  