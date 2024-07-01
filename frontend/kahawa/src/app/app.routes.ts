import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'admin',component:AdminDashboardComponent},
  {path:'user',component:UserDashboardComponent,children:[
    {path:'menu',component:MenuComponent}
  ]},

];
  