import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { TrackOrderComponent } from './components/track-order/track-order.component';
import { AdminComponent } from './components/admin-dashboard/admin/admin.component';
import { OrdersComponent } from './components/admin-dashboard/orders/orders.component';
import { CustomersComponent } from './components/admin-dashboard/customers/customers.component';
import { FormsComponent } from './components/forms/forms.component';
import { MenuAdminComponent } from './components/admin-dashboard/menu-admin/menu-admin.component';



const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'forms', component: FormsComponent },
  // { path: 'admin', component:AdminComponent, children:[
  //   {path: 'menu-admin', component: MenuAdminComponent},
  //   {path: 'orders', component: OrdersComponent},
  //   {path: 'customers', component: CustomersComponent},
  // ] },
//   { path: 'register', component: RegisterComponent },

//ADMIN
  { path: 'admin', component:AdminComponent},
    {path:'menu-admin',component:MenuAdminComponent},
    {path:'orders',component:OrdersComponent},
    {path:'customers',component:CustomersComponent},
//ADMIN
  
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

