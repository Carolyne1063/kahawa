import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink,AdminComponent,MenuComponent,OrdersComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
