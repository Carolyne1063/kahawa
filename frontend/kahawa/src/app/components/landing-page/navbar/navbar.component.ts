import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logo= 'https://i.pinimg.com/474x/39/3b/b1/393bb1bb15940aea508dd07c5da23917.jpg'
  Home:string = 'Home'
  Menu:string = 'Menu'
  AboutUs:string = 'About Us'
  Review:string = 'Reviews'
  ContactUs:string = 'Contact Us'
}
