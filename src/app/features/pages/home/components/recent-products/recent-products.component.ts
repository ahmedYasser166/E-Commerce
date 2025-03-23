import { Component, OnInit, inject } from '@angular/core';
import { Iproduct } from '../../../../../shared/interfaces/iproduct';
import { ProductService } from '../../../../../core/services/product/product.service';
import { ProductItemComponent } from "../../../../../shared/ui/product-item/product-item.component";

@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.css'
})
export class RecentProductsComponent implements OnInit {
  products!: Iproduct[];
  private readonly _productService = inject(ProductService);
  // private readonly cartService = inject(CartService);
  // private readonly toastr = inject(ToastrService);
  // private readonly wishlistService =inject(WishlistService)

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

  // addProductToCart(id: string) {
  //   this.cartService.addProductToCart(id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.showtoaster('Product Added Successfully');
  //       this.cartService.cartcounter.next(res.numOfCartItems);
  //     },
  //   });
  // }
// ////////////////////// ===>wishlist

// AddProductToWishList(id: string) {
//   this.wishlistService.addProductToWishlist(id).subscribe({
//     next: (res) => {
//       // console.log(' Product Added:', res);
//       this.showtoaster('Product Added Successfully');

//       this.wishlistService.getLoggedUserWishlist().subscribe({
//         next: (wishlist) => {
//           this.wishlistService.wishcounter.next(wishlist.count); 
//         }
//       });
//     },

//   });
// }



  // showtoaster(msg: string) {
  //   this.toastr.success(msg, '', {
  //     progressBar: true,
  //     timeOut: 1500,
  //   });
  // }


  
  ngOnInit(): void {
    this.getproducts();
  }
}
