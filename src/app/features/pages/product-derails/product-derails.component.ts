import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { Product } from '../../../shared/interfaces/iproduct';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../wishlist/services/wishlist.service';

@Component({
  selector: 'app-product-derails',
  imports: [CommonModule,CarouselModule],
  templateUrl: './product-derails.component.html',
  styleUrl: './product-derails.component.css'
})
export class ProductDerailsComponent {
  productId!: string | null;
  productDetails: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly producService = inject(ProductService);
  private readonly toastr = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService)

  ngOnInit(): void {
    this.getProductId();
  }

  getProductId() {
    this.activatedRoute.paramMap.subscribe({
      next: (urlData) => {
        this.productId = urlData.get('id');
        if (this.productId) {
          this.getProductDetails(this.productId); 
        }
      },
    });
  }

  getProductDetails(id: string) {
    this.producService.getSpecificProduct(id).subscribe({
      next: (response) => {
        this.productDetails = response.data; 
        console.log(" Product Details Loaded:", this.productDetails);
      },
    });
  }

  onAddToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.showToaster('Product Added Successfully');
        this.cartService.cartcounter.next(res.numOfCartItems);
      },
 
    });
  }

  AddProductToWishList(id: string) {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(' Product Added:', res);
        this.showToaster('Product Added Successfully');
  
        this.wishlistService.getLoggedUserWishlist().subscribe({
          next: (wishlist) => {
            this.wishlistService.wishcounter.next(wishlist.count); 
          }
        });
      },
  
    });
  }


  showToaster(msg: string) {
    this.toastr.success(msg, '', {
      progressBar: true,
      timeOut: 1500,
    });
  }

  carouselOptions: OwlOptions = {
    loop: true, 
    autoplay: true, 
    autoplayTimeout: 2000, 
    autoplayHoverPause: true, 
    nav: false, 
    dots: true, 
    items: 1, 
    navText: ['<span class="text-2xl">←</span>', '<span class="text-2xl">→</span>']
  };
}
