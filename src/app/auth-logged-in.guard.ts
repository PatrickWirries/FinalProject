import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';



export const authLoggedInGuard: CanActivateFn = (route, state) => {
const router = inject(Router);
const auth = inject(AuthService);



//Redirect a logged in user away from login page and forgot password
if (auth.loggedIn()){
  router.navigate(['/dashboard']);
  return false;
}
else return true;
};
