import { Component, OnInit } from '@angular/core';




import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from '../orders/orders.component';
import { CustomersComponent } from '../customers/customers.component';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,OrdersComponent,CustomersComponent,MenuAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})


export class AdminComponent implements OnInit {
  coffeeTypesCount: number = 0;
  ordersCount: number = 0;
  customersCount: number = 0;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getCoffeeTypes().subscribe(data => {
      this.coffeeTypesCount = data.count;
    });

    this.adminService.getOrders().subscribe(data => {
      this.ordersCount = data.length;
    });

    this.adminService.getCustomers().subscribe(data => {
      this.customersCount = data.length;
    });

  }}
