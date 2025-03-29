import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string;

  constructor(private http: HttpClient) {
    this.productUrl = 'http://localhost:8080/product';
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  public getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productUrl}/${id}`);
  }

  public addProduct(product: Product) {
    return this.http.post<Product>(this.productUrl, product);
  }

  public updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productUrl}/${id}`, product);
  }

  public deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productUrl}/${id}`);
  }
}
