import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { OrdersComponent } from '../orders/orders.component';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,RouterOutlet],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent implements OnInit {
  menuItems: any[] = [];
  showAddForm: boolean = false;
  newItem: any = {
      image: '',
      name: '',
      ingredients: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
      // Fetch existing menu items from backend on component initialization
      this.fetchMenuItems();
  }

  toggleAddForm(): void {
    console.log("clicked");
    
      this.showAddForm = !this.showAddForm;
      // Reset form fields when toggling
      if (!this.showAddForm) {
          this.newItem = {
              image: '',
              name: '',
              ingredients: ''
          };
      }
    
  }

  addItem(): void {
      // Send HTTP POST request to add new item to backend
      this.http.post<any>('http://localhost:3000/product', this.newItem)
          .subscribe(response => {
              // Assuming response contains the newly added item
              this.menuItems.push(response);
              // Reset form and hide it after successful addition
              this.newItem = {
                  image: '',
                  name: '',
                  ingredients: ''
              };
              this.showAddForm = false;
          }, error => {
              console.error('Error adding item:', error);
          });
  }
  clearForm() {
    // Implement logic to clear/reset form fields or states
    // For example, reset newItem object
    this.newItem = {
      image: '',
      name: '',
      ingredients: ''
    };
  }


  fetchMenuItems(): void {
      // Fetch menu items from a mock API endpoint (replace with your actual backend URL)
      // For demo purpose using mock data
      this.http.get<any[]>('http://localhost:3000/api/products')
          .subscribe(items => {
              this.menuItems = items;
              console.log(items)
          }, error => {
              console.error('Error fetching menu items:', error);
          });
  }
}
  

