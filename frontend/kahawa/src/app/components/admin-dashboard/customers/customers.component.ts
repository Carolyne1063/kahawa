import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { OrdersComponent } from '../orders/orders.component';
import { CustomerService } from '../../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuAdminComponent } from '../menu-admin/menu-admin.component';
import { MenuComponent } from '../../menu/menu.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [RouterLink, AdminComponent, OrdersComponent, MenuAdminComponent, FormsModule, CommonModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.customers = data;
    });
  }

  shortenId(id: string): string {
    return id.substring(0, 8);
  }

  deleteCustomer(userId: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully');
          this.loadCustomers();  
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
