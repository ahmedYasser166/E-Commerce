import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../interfaces/orders';
import { AuthAuthService } from '../../../../shared/services/auth/auth.auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient, private auth: AuthAuthService) {}
  createCheckout(
    cartId: string | null,
    shippingAddress: {
      details: string;
      phone: string;
      city: string;
    }

  ): Observable<any> {
    
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/orders/checkout-session/' +
        cartId+'?url=http://localhost:4200',
      {
        shippingAddress,
      }
    );
  }

  getAllOrders(id: string): Observable<Orders[]> {
    return this.httpClient.get<Orders[]>(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  }
}
