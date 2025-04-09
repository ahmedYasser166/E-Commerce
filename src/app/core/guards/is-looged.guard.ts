import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthAuthService } from '../../shared/services/auth/auth.auth.service';

export const isLoogedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthAuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate(['/home']);
    return false; 
  }


  return true; 
};
