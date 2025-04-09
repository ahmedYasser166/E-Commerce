import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthAuthService } from '../../shared/services/auth/auth.auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthAuthService);

  if (req.url.includes('cart') || req.url.includes('orders')|| req.url.includes('wishlist')  ) {
    req = req.clone({
      setHeaders: {
        token: auth.getToken() || '',
      },
    });
  }

  return next(req);
};
