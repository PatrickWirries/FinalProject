import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authservice = inject(AuthService);

  if (authservice.loggedIn())
  return true;
else{
  router.navigate([""]);
  return false;
}
};
