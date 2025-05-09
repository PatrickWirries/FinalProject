import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

logout(){
  this.auth.logout();
}

//Returns True if the current page is not '/' (Root) or 'forgotPass
isLoginRoute(){
    const url = this.router.url;
    return url === '/' || url === '/forgotPass';
}

loggedIn(){
  return this.auth.loggedIn()
}

isManager(){
  return this.auth.isManager()
}

}
