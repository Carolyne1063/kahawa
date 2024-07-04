import { RouterLink, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../../services/product.service';  // Import the ProductService
import { Product } from '../../../interfaces/product';  // Import the Product interface
import { v4 as uuidv4 } from 'uuid'; 

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, RouterOutlet],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent implements OnInit {
  menuItems: Product[] = [];
  showAddForm: boolean = false;
  isEditing: boolean = false; // To track if we are in edit mode
  newItem: Product = {
    productId: '',
    name: '',
    short_description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    flavor: ''
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchMenuItems();
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.newItem = {
        productId: '',
        name: '',
        short_description: '',
        price: '',
        image: '',
        category: '',
        stock: '',
        flavor: ''
      };
      this.isEditing = false; 
    }
  }

  addItem(): void {
    this.productService.createProduct(this.newItem).subscribe(
      response => {
        console.log(response);
        this.fetchMenuItems();
        this.toggleAddForm();
      },
      error => {
        console.error('Error adding item:', error);
      }
    );
  }

  fetchMenuItems(): void {
    this.productService.getAllProducts().subscribe(
      items => {
        this.menuItems = items;
      },
      error => {
        console.error('Error fetching menu items:', error);
      }
    );
  }

  editItem(item: Product): void {
    // Open the form and set the item to be edited
    this.newItem = { ...item };
    this.showAddForm = true;
    this.isEditing = true; // Set editing mode
  }

  updateItem(): void {
    this.productService.updateProduct(this.newItem.productId, this.newItem).subscribe(
      response => {
        console.log(response);
        this.fetchMenuItems();
        this.toggleAddForm();
      },
      error => {
        console.error('Error updating item:', error);
      }
    );
  }

  deleteItem(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(
      response => {
        console.log(response);
        this.fetchMenuItems();
      },
      error => {
        console.error('Error deleting item:', error);
      }
    );
  }
}