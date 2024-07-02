import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { AdminComponent } from './components/admin-dashboard/admin/admin.component';
import { MenuComponent } from './components/admin-dashboard/menu/menu.component';
import { CustomersComponent } from './components/admin-dashboard/customers/customers.component';
import { OrdersComponent } from './components/admin-dashboard/orders/orders.component';
import { FormsComponent } from './components/forms/forms.component';

export const routes: Routes = [
    { path: '', component: AdminComponent }, 
    { path: 'menu', component: MenuComponent } ,
    { path: 'orders', component: OrdersComponent } ,
    { path: 'customers', component: CustomersComponent } ,
    { path: 'forms', component: FormsComponent }

];

