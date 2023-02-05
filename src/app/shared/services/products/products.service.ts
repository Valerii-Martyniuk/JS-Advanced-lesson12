import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import {
  ProductRequest,
  ProductResponse,
} from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = environment.BACKEND_URL;
  private api = { products: `${this.url}/products` };

  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.api.products);
  }
  getOne(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.api.products}/${id}`);
  }

  getAllByCategory(name: string): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${this.api.products}?category=${name}`
    );
  }
  create(action: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(this.api.products, action);
  }
  update(action: ProductRequest, id: number): Observable<ProductResponse> {
    return this.http.patch<ProductResponse>(
      `${this.api.products}/${id}`,
      action
    );
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`);
  }
}
