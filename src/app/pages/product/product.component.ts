import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductResponse } from 'src/app/shared/interfaces/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public adminProducts: Array<ProductResponse> = [];
  private eventSubscription!: Subscription;
  public categoryName!: string;
  public Imgwidth!: string;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 1200) {
      this.Imgwidth = event.target.innerWidth / 5 + 'px';
    } else if (
      event.target.innerWidth < 1200 &&
      event.target.innerWidth > 990
    ) {
      this.Imgwidth = event.target.innerWidth / 4 + 'px';
    } else if (event.target.innerWidth < 990 && event.target.innerWidth > 680) {
      this.Imgwidth = event.target.innerWidth / 3 + 'px';
    } else if (event.target.innerWidth < 680) {
      this.Imgwidth = event.target.innerWidth / 1.7 + 'px';
    }
  }

  ngOnInit(): void {
    this.loadProducts();
    this.initImgwidth();
  }
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
  loadProducts(): void {
    this.categoryName = this.activatedRoute.snapshot.paramMap.get(
      'category'
    ) as string;
    this.productsService
      .getAllByCategory(this.categoryName)
      .subscribe((data) => {
        this.adminProducts = data;
      });
  }

  countProduct(product: ProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }

  addBasket(prod: ProductResponse): void {
    let basket: Array<ProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);

      if (basket.some((item) => item.id === prod.id)) {
        const index = basket.findIndex((item) => item.id === prod.id);
        basket[index].count += prod.count;
      } else {
        basket.push(prod);
      }
    } else {
      basket.push(prod);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    prod.count = 1;
    this.orderService.changeBasket.next(true);
  }

  //////////////////initImgwidth////////////////
  initImgwidth(): void {
    if (window.innerWidth > 1200) {
      this.Imgwidth = window.innerWidth / 5 + 'px';
    } else if (window.innerWidth < 1200 && window.innerWidth > 990) {
      this.Imgwidth = window.innerWidth / 4 + 'px';
    } else if (window.innerWidth < 990 && window.innerWidth > 680) {
      this.Imgwidth = window.innerWidth / 3 + 'px';
    } else if (window.innerWidth < 680) {
      this.Imgwidth = window.innerWidth / 1.7 + 'px';
    }
  }
}
