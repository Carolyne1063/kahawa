
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { OrdersComponent } from '../orders/orders.component';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink,AdminComponent,MenuComponent,OrdersComponent,FormsModule,CommonModule,RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.menuService.getMenuItems().subscribe(data => {
      this.menuItems = data;
    });
  }
}
