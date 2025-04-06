import { Component, inject } from '@angular/core';
import { Orders } from '../../interfaces/orders';
import { OrdersService } from '../../services/orders.service';
import { AuthAuthService } from '../../../../../shared/services/auth/auth.auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  private readonly orderService = inject(OrdersService);
  private readonly authService = inject(AuthAuthService);
  orders: Orders[] = []; 
  userId: string = ''; 

  loadOrder() {
    this.userId = this.authService.getUserId(); 

    if (!this.userId) {
      console.error('User ID not found!');
      return;
      this.userId = this.authService.getUserId();
console.log('User ID:', this.userId);

    }

    this.orderService.getAllOrders(this.userId).subscribe({
      next: (res) => {
        console.log('Full API Response:', res);
        
        if (Array.isArray(res) && res.length > 0) {
          this.orders = res; 
          console.log('Orders:', this.orders);
        } else {
          console.warn('No valid orders found in API response.');
        }
      }
      
    });
  }

  ngOnInit(): void {
    this.loadOrder();
  }
}
