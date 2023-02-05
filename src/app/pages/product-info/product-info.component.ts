import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  public currentProduct!: ProductResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.currentProduct = response['productInfo'];
    });
  }
  ngOnDestroy(): void {
    this.currentProduct.count = 1;
  }
  //////////////// PRODUCT COUNTER ///////////////////
  countProduct(product: ProductResponse, value: boolean) {
    if (value) {
      ++this.currentProduct.count;
    } else if (!value && this.currentProduct.count > 1) {
      --this.currentProduct.count;
    }
  }
  //////////////  AD TO BASKET ////////////////////////
  addBasket(product: ProductResponse) {
    let basket: Array<ProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some((prod) => prod.id === product.id)) {
        const index = basket.findIndex((prod) => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.currentProduct.count = 1;
    this.orderService.changeBasket.next(true);
  }
}
