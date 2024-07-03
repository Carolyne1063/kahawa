import { RouterLink } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { CustomersComponent } from '../customers/customers.component';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/orders.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink,MenuAdminComponent,AdminComponent,CustomersComponent,FormsModule,CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})


export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }


}
