import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.baseUrl + '/' + id);
  }

  editProductById(id:number,product:Product):Observable<Product>{
    return this.http.put<Product>(this.baseUrl+'/'+id,product)
  }

  addNewProduct(product: Product | any): Observable<Product> {
    product.id = JSON.stringify(Math.ceil(Math.random() * 999));
    return this.http.post<Product>(this.baseUrl, product);
  }

}
