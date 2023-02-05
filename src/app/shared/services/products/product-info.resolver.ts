import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductResponse } from '../../interfaces/product.interface';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductInfoResolver implements Resolve<ProductResponse> {
  constructor(private productsService: ProductsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductResponse> {
    return this.productsService.getOne(Number(route.paramMap.get('id')));
  }
}
