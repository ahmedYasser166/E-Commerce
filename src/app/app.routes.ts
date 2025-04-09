import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotfoundComponent } from './core/pages/notfound/notfound.component';
import { isLoogedGuard } from './core/guards/is-looged.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // Authentication Routes (Lazy Loading Components)
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate:[isLoogedGuard],
    children: [
      { path: 'login', loadComponent: () => import('./core/pages/login/login.component').then(m => m.LoginComponent), title: 'Login' },
      { path: 'register', loadComponent: () => import('./core/pages/register/register.component').then(m => m.RegisterComponent), title: 'Register' }
    ]
  },

    
  { path: "", loadComponent:()=>import('./core/pages/login/login.component').then(c => c.LoginComponent) },
  { path: 'register', loadComponent: () => import('./core/pages/register/register.component').then(m => m.RegisterComponent), title: 'Register' },


  // Main Routes (Lazy Loading Components)
  {
    path: '',
    canActivate:[authGuard],
    children: [
      { path: 'home', loadComponent: () => import('./features/pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
      { path: 'products', loadComponent: () => import('./features/pages/product/product.component').then(m => m.ProductComponent), title: 'Products' },
      { path: 'products-details/:id', loadComponent: () => import('./features/pages/product-derails/product-derails.component').then(m => m.ProductDerailsComponent), title: 'products-details' },
      { path: 'categories', loadComponent: () => import('./features/pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'Categories' },
      { path: 'brands', loadComponent: () => import('./features/pages/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },
      { path: 'cart', loadComponent: () => import('./features/pages/cart/components/cart-list/cart-list.component').then(m => m.CartListComponent), title: 'Cart' },
      { path: 'wishlist', loadComponent: () => import('./features/pages/wishlist/components/wishlist/wishlist.component').then(m => m.WishlistComponent), title: 'wishlist' },
      { path: 'allorders', loadComponent: () => import('./features/pages/orders/component/orders/orders.component').then(m => m.OrdersComponent), title: 'All Orders' },
      { path: "checkout/:id", loadComponent:()=>import('./features/pages/checkout/checkout.component').then(c => c.CheckoutComponent) },
      
      // Not Found Route
      { path: '**', component: NotfoundComponent, title: 'NotFound' }
    ]
  }
];
