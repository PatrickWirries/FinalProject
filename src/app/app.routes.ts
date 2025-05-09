import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ContactsComponent } from './contacts/contacts.component';
import { authGuard } from './auth.guard'; //Return true if logged in
import { authLoggedInGuard } from './auth-logged-in.guard'; //Return true if not logged in
import { authManagerGuard } from './auth-manager.guard'; //For routes that are for managers only -> Return true if manager
import { SchedulingComponent } from './scheduling/scheduling.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
    canActivate: [authLoggedInGuard], //Logged in users can't access login page
  },
  {
    path: 'forgotPass',
    component: ForgotPassComponent,
    title: 'Forgot Password',
    canActivate: [authLoggedInGuard], //Logged in users can't access forgot password page
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    canActivate: [authGuard], //Logged out users can't access dashboard
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    title: 'Inventory',
    canActivate: [authGuard], //Logged out users can't access inventory
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    title: 'Contacts',
    canActivate: [authManagerGuard], // optional: only logged-in users can see it
  },

 {path: 'scheduling',
    component: SchedulingComponent,
    title: 'Scheduling',
    canActivate: [authManagerGuard], // optional: only logged-in users can see it
 }
];
