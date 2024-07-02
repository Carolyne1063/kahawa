import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { TrackOrderComponent } from './components/track-order/track-order.component';
import { AdminComponent } from './components/admin-dashboard/admin/admin.component';
import { OrdersComponent } from './components/admin-dashboard/orders/orders.component';
import { CustomersComponent } from './components/admin-dashboard/customers/customers.component';
import { FormsComponent } from './components/forms/forms.component';



const routes: Routes = [
  { path: '', component: LandingPageComponent },
//   { path: 'login', component: LoginComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'admin', component:AdminComponent, children:[
    {path: 'menu', component: MenuComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'customers', component: CustomersComponent},
  ] },
//   { path: 'register', component: RegisterComponent },
  { path: 'admin', component:AdminComponent},
    {path:'menu',component:MenuComponent},
    {path:'orders',component:OrdersComponent},
    {path:'customers',component:CustomersComponent}

  ,
   {path:'user',component:UserDashboardComponent,children:[
    {path:'menu',component:MenuComponent},
    {path:'cart',component:ShoppingCartComponent},
    {path:'track-order',component:TrackOrderComponent}
  ]},
  {path:'forms',component:FormsComponent},

  { path: '**', redirectTo: '' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
  
  export { routes };

