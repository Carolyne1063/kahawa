import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { OrdersComponent } from '../orders/orders.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports:[RouterLink,AdminComponent,OrdersComponent,MenuComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

}
