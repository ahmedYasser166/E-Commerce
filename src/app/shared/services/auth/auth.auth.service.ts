import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { LoginUser } from '../../interfaces/iauth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthAuthService {

  constructor(private http:HttpClient ,private router :Router ,
    @Inject(PLATFORM_ID) private platformId:object

  ) {}
  _httpClient = inject(HttpClient);
  registerUser(userInfo: AuthAuthService): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userInfo
    );
  }
  loginUser(userInfo: LoginUser): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userInfo
    );
  }

  decodeToken() {
    try {
      if(typeof localStorage!='undefined'){
        const decoded = jwtDecode(localStorage.getItem('authToken')!);
        console.log(decoded);
      }
    } catch {
      this.logout();
    }
  }

  // =============> token
  saveToken(token: string): void {
    if(typeof localStorage!='undefined'){
      localStorage.setItem('authToken', token)

    }
  }

  getToken(): string | null {
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem('authToken');

    }return null

  }




  isAuthenticated(): boolean {
    if(typeof localStorage!='undefined'){
      return !!localStorage.getItem('authToken');
    }

   return false
  }




  logout() {
    this.router.navigate(['/auth/login']);
    localStorage.clear();
  }





//////////

  getUserId(): string {
    try {
      if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('authToken');
        if (token) {
          const decoded: any = jwtDecode(token);
          return decoded.id || '';
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return '';
  }
}
