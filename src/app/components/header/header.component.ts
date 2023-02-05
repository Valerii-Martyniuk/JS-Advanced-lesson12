import {
  Component,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  reflectComponentType,
} from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import {
  CategoryRequest,
  CategoryResponse,
} from 'src/app/shared/interfaces/category.interface';
import { ProductResponse } from 'src/app/shared/interfaces/product.interface';
import { Subject, Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { Router } from '@angular/router';

///////LOGIN AND CREATE/////
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthUserComponent } from '../auth-user/auth-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public userData = {
    name: null,
    isLogin: false,
    path: null,
  };
  public isBordItem: boolean = false;
  public isNavItems: boolean = false;
  public isBasket: boolean = false;
  public adminCategory: Array<CategoryResponse> = [];
  public basket: Array<ProductResponse> = [];
  public basketInfo = {
    total: 0,
    count: 0,
  };
  public margTop = '';

  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategorys();
    this.loadBasket();
    this.updateBasket();
    this.initUser();
  }

  loadCategorys(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.adminCategory = data;
    });
  }
  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.getBasketInfo();
    }
  }
  getBasketInfo(): void {
    this.basketInfo.total = this.basket.reduce(
      (total: number, prod: ProductResponse) =>
        total + prod.count * Number(prod.price),
      0
    );
    this.basketInfo.count = this.basket.length;
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }
  ////////////BASKET WINDOW /////////////////////////

  countProduct(product: ProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    }
    if (!value && product.count > 1) {
      --product.count;
    }
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.orderService.changeBasket.next(true);
  }

  deletBasketProduct(product: ProductResponse): void {
    let index = this.basket.findIndex((item) => item.id === product.id);
    this.basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.orderService.changeBasket.next(true);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 110) {
      this.margTop = String(window.scrollY - 110 + 'px');
    } else if (window.scrollY <= 110) {
      this.margTop = '0px';
    }
  }

  // /////////////////// LOGIN DATA //////////////
  initUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') as string
      );
      this.userData.isLogin = true;
      this.userData.name = currentUser.name;
      this.userData.path = currentUser.path;
    } else {
      this.userData.isLogin = false;
    }
  }

  // ////////LOGIN////////
  openLogin(): void {
    this.dialog.open(AuthUserComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false,
    });
  }
  // login(): void {
  //   const { email, password } = this.loginForm.value;
  //   this.loginUser(email, password)
  //     .then(() => {
  //       console.log('good');
  //       this.loginForm.reset();
  //       this.isLoginTable = false;
  //       this.userData.isLogin = true;
  //     })
  //     .catch((e) => {
  //       console.log(e.message);
  //     });

  //   // this.userData.name = data[0].name;
  //   // this.userData.path = data[0].path;
  // }
  // async loginUser(email: string, password: string): Promise<void> {
  //   const credential = await signInWithEmailAndPassword(
  //     this.auth,
  //     email,
  //     password
  //   );
  //   this.loginSubscription = docData(
  //     doc(this.afs, 'users', credential.user.uid)
  //   ).subscribe((user) => {
  //     const currentUser = { ...user, uid: credential.user.uid };
  //     localStorage.setItem('currentUser', JSON.stringify(currentUser));
  //     if (user && user['role'] === ROLE.USER) {
  //       this.router.navigate(['/user']);
  //     }
  //   });
  // }

  logOut(): void {
    localStorage.removeItem('currentUser');
    this.userData.isLogin = false;
  }
}
