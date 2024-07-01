import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menuItems = [
    {
      name: 'Espresso',
      description: 'Strong and bold espresso coffee.',
      image: 'espresso.jpeg',
      stock: 10,
      price: 3.0
    },
    {
      name: 'Cappuccino',
      description: 'Creamy cappuccino with frothed milk.',
      image: 'cappuccino.jpeg',
      stock: 8,
      price: 4.5
    },
    {
      name: 'Latte',
      description: 'Smooth latte with steamed milk.',
      image: 'latte.jpeg',
      stock: 15,
      price: 4.0
    },
    {
      name: 'Mocha',
      description: 'Chocolate flavored coffee with whipped cream.',
      image: 'mocha.jpeg',
      stock: 12,
      price: 4.5
    },
    {
      name: 'Americano',
      description: 'Espresso with hot water.',
      image: 'assets/americano.jpg',
      stock: 20,
      price: 2.5
    },
    {
      name: 'Macchiato',
      description: 'Espresso with a small amount of foamed milk.',
      image: 'assets/macchiato.jpg',
      stock: 5,
      price: 3.5
    }
  ];

  addToCart(item: any) {
    console.log('Adding to cart:', item);
    // Implement add to cart functionality here
  }
}
