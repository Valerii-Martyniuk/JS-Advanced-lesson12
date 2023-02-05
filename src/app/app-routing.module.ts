import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActionComponent } from './pages/action/action.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PaymentAndDeliveryComponent } from './pages/payment-and-delivery/payment-and-delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { BasketComponent } from './pages/basket/basket.component';

import { ActionsComponent } from './admin/actions/actions.component';
import { ActionInfoComponent } from './pages/action-info/action-info.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductsComponent } from './admin/products/products.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { ProductInfoResolver } from './shared/services/products/product-info.resolver';
import { ActionInfoResolver } from './shared/services/action/action-info.resolver';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { UserAuthGuard } from './shared/guards/userAuth/user-auth.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'action', component: ActionComponent },
  {
    path: 'action/:id',
    component: ActionInfoComponent,
    resolve: {
      actionInfo: ActionInfoResolver,
    },
  },
  { path: 'product/:category', component: ProductComponent },
  {
    path: 'product/:category/:id',
    component: ProductInfoComponent,
    resolve: {
      productInfo: ProductInfoResolver,
    },
  },
  { path: 'paiment.delivery', component: PaymentAndDeliveryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'basket', component: BasketComponent },
  {
    path: 'user',
    component: UserProfileComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'actions', component: ActionsComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'actions' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
