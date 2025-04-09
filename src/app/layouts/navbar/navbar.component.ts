import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../features/pages/cart/services/cart.service';
import { AuthAuthService } from '../../shared/services/auth/auth.auth.service';
import { isPlatformBrowser } from '@angular/common';
import { WishlistService } from '../../features/pages/wishlist/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  navbarCounter: number = 0;
  navbarwishCounter: number = 0;
  private readonly cartService = inject(CartService);
  private readonly platformI = inject(PLATFORM_ID);
  private readonly authService = inject(AuthAuthService);
  private readonly wishlistService = inject(WishlistService);
  logout() {
    this.authService.logout();
  }
  isAuthPage: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isAuthPage = this.router.url.includes('/auth');
    });
  }

  ngOnInit(): void {
    this.cartService.cartcounter.subscribe({
      next: (value) => {
        this.navbarCounter = value;
      },
    });

    this.wishlistService.wishcounter.subscribe({
      next:(value)=>{
        this.navbarwishCounter=value
      }
    })

    if (isPlatformBrowser(this.platformI)) {
      this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          console.log(res);
          this.cartService.cartcounter.next(res.numOfCartItems);
        },
      });
      //////////
      this.wishlistService.getLoggedUserWishlist().subscribe({
        next: (res) => {
          console.log(res);
          this.wishlistService.wishcounter.next(res.count)
        },
      }
      )
    }
  }
}
