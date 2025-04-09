import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../../shared/interfaces/iproduct';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() product: any;
  @Output() removeProduct = new EventEmitter<string>();
  @Output() updateProductQty = new EventEmitter<{
    id: string;
    newCount: number;
  }>();

  onRemove() {
    this.removeProduct.emit(this.product.product._id);
  }

  onUpdateQyt(newCount: number) {
    this.updateProductQty.emit({ id: this.product.product._id, newCount });
  }
}
