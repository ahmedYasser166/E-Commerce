import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private httpClient:HttpClient) { }
  
  getAllCategories():Observable<any>{
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
      }
}
