import { Component, inject } from '@angular/core';
import { Product } from '../../../shared/interfaces/iproduct';
import { ProductService } from '../../../core/services/product/product.service';
import { ProductItemComponent } from "../../../shared/ui/product-item/product-item.component";
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../wishlist/services/wishlist.service';

@Component({
  selector: 'app-product',
  imports: [ProductItemComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products!: Product[];
  private readonly _productService = inject(ProductService);
  private readonly cartService = inject(CartService)
  private readonly toastr = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)

  getproducts() {
    this._productService.getAllProduct().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete() {
        console.log('complete');
      },
    });
  }
  addProductToCart(id:string){
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.showtoaster('Product Added Successfully')
        this.cartService.cartcounter.next(res.numOfCartItems);
      }
    })
  }
  

  AddProductToWishList(id: string) {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(' Product Added:', res);
        this.showtoaster('Product Added Successfully');
  
        this.wishlistService.getLoggedUserWishlist().subscribe({
          next: (wishlist) => {
            this.wishlistService.wishcounter.next(wishlist.count); 
          }
        });
      },
  
    });
  }
  
  showtoaster(msg:string) {
    this.toastr.success(msg, '',{
      progressBar : true,
      timeOut:1500
    });
  }
  ngOnInit(): void {
    this.getproducts();
  }

}
