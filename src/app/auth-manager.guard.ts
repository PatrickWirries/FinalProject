import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';


export const authManagerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authservice = inject(AuthService);

  //Prevent employees from access manager only routes
  if (authservice.isManager())
    return true;
  else
    return false;
};
