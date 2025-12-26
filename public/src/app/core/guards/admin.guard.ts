import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser();
  
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Check if user has admin or hr role
  if (user && (user.role === 'admin' || user.role === 'hr')) {
    return true;
  }

  // Not authorized, redirect to home
  router.navigate(['/tabs/home']);
  return false;
};
