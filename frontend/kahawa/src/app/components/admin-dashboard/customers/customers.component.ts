import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { OrdersComponent } from '../orders/orders.component';
import {  OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';



@Component({
  selector: 'app-customers',
  standalone: true,
  imports:[RouterLink,AdminComponent,OrdersComponent,MenuAdminComponent,FormsModule,CommonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})

export class CustomersComponent implements OnInit {
  customers: any[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }
}
