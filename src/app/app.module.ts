import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environment/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';

////// ЛОГІНУВАННЯ/СТВОРЕННЯ ЮЗЕРА - ЗБЕРІГАННЯ ДАННИХ ПРО ЮЗЕРА НА БАЗУ ДАННИХ
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

/////////MARETIAL/////

/////TOASTR//////////
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActionComponent } from './pages/action/action.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PaymentAndDeliveryComponent } from './pages/payment-and-delivery/payment-and-delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { BasketComponent } from './pages/basket/basket.component';
import { ActionsComponent } from './admin/actions/actions.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductsComponent } from './admin/products/products.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { UpperPipe } from './shared/pipes/upper.pipe';
import { ActionInfoComponent } from './pages/action-info/action-info.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthUserComponent } from './components/auth-user/auth-user.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ActionComponent,
    MainPageComponent,
    PaymentAndDeliveryComponent,
    AboutComponent,
    BasketComponent,
    ActionsComponent,
    CategoryComponent,
    ProductsComponent,
    OrdersComponent,
    AdminComponent,
    ProductComponent,
    ProductInfoComponent,
    UpperPipe,
    ActionInfoComponent,
    UserProfileComponent,
    AuthUserComponent,
  ],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
