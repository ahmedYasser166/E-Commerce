import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Iproduct } from '../../interfaces/iproduct';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product! :Iproduct 
  @Output() addToCart = new EventEmitter<string>()
  @Output() AddToWishList = new EventEmitter<string>()
  
  
  onAddToCart(){
  this.addToCart.emit(this.product._id)
  }
  
  onAddToWishList(){
  this.AddToWishList.emit(this.product._id)
  }
}
