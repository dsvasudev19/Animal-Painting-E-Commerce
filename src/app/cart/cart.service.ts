import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = environment.apiUrl + '/cart';

  private checkoutUrl = environment.apiUrl + '/checkout';

  constructor(private http: HttpClient) {}

  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.baseUrl);
  }

  checkOut(products: Product[]): Observable<any> {
    console.log(products);
    let totalAmount = products.reduce((acc, prod) => (acc += prod.price), 0);
    this.http.post<void>(this.checkoutUrl, products); 
    return this.http.post<any>('http://localhost:9000/payment/create-order', {
      amount: totalAmount * 100,
      userId: 1,
    });
    // return this.http.post<void>(this.checkoutUrl, products);
  }

  removeItemFromCart(id: number): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl + '/' + id);
  }
}
