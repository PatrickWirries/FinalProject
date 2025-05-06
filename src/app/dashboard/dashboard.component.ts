import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
private auth = inject(AuthService);
private router = inject(Router);

//For dynamic display manager's views away from employees
isManager(){
return this.auth.isManager();
}

}
