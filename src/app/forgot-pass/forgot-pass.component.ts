import { Component, inject } from '@angular/core';
import { collection, query, where } from '@angular/fire/firestore';
import { Firestore, getDocs } from '@angular/fire/firestore/lite';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink, } from '@angular/router';



@Component({
  selector: 'app-forgot-pass',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent {
private auth = inject(AuthService);
private router = inject(Router);
email = '';
password1 = '';
password2 = '';

async onSubmit(){
  console.log('Forgot Pass'); //Developer Tool
   
  const exists = await this.auth.doesEmailExist(this.email);

if (exists){
  this.auth.resetPassword(this.email);
}
else{
  alert('Email does not match any known/valid email');
}
}


resetPassword(){
  if (this.password1 == this.password2){
    /*
    Normally would have the following function call, but since this project uses fictional emails, we have no way of resetting the password on Angulars side of things without
    already being logged in as the user or "knowing" what the old password is 
    */
  
    //this.auth.resetPassword(this.password1);
    alert('Password Reset sent to your email!');
  }
  else{
    alert('Passwords do not match!');
  }
  }


}
