import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './core/pages/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Authentication Routes (Lazy Loading Components)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./core/pages/login/login.component').then(m => m.LoginComponent), title: 'Login' },
      { path: 'register', loadComponent: () => import('./core/pages/register/register.component').then(m => m.RegisterComponent), title: 'Register' }
    ]
  },

  // Main Routes (Lazy Loading Components)
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: 'home', loadComponent: () => import('./features/pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
      { path: 'products', loadComponent: () => import('./features/pages/product/product.component').then(m => m.ProductComponent), title: 'Products' },
      { path: 'categories', loadComponent: () => import('./features/pages/categories/categories.component').then(m => m.CategoriesComponent), title: 'Categories' },
      { path: 'brands', loadComponent: () => import('./features/pages/brands/brands.component').then(m => m.BrandsComponent), title: 'Brands' },
      { path: 'cart', loadComponent: () => import('./features/pages/cart/cart.component').then(m => m.CartComponent), title: 'Cart' },
      { path: 'allorders', loadComponent: () => import('./features/pages/orders/orders.component').then(m => m.OrdersComponent), title: 'All Orders' },
      { path: 'checkout', loadComponent: () => import('./features/pages/checkout/checkout.component').then(m => m.CheckoutComponent), title: 'Checkout' },
      
      // Not Found Route
      { path: '**', component: NotfoundComponent, title: 'NotFound' }
    ]
  }
];
