import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryComponent } from './inventory/inventory.component';
export const routes: Routes = [
    {
    path: "",
    component: LoginComponent,
    title: "Login"
    },
    {   
        path: 'forgotPass',
        component: ForgotPassComponent,
        title: 'Forgot Password'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard'
    },
    {
        path: 'inventory',
        component: InventoryComponent,
        title: 'Inventory'
    }




];
