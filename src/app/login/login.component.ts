import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router';





@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private auth = inject(AuthService);
  email = '';
  password = '';


onSubmit(){
console.log('Login'); //Possibly remove this line -> Dev tool
this.auth.login(this.email, this.password); //Needs email and password from form
}

forgotPassword(){
  console.log('Forgot Pass');
}

}
