import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { AdminComponent } from '../admin/admin.component';
import { CustomersComponent } from '../customers/customers.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink,MenuComponent,AdminComponent,CustomersComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

}
