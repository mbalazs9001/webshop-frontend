import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { AddressComponent } from './address/address.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PaymentComponent } from './payment/payment.component';
import { PaypalComponent } from './payment/paypal/paypal.component';
import { CreditCardComponent } from './payment/credit-card/credit-card.component';
import { MenuComponent } from './navbar/menu/menu.component';
import { ShoppingCartComponent } from './navbar/shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {OrderService} from './services/order.service';
import {ProductOrderService} from './services/product-order.service';
import { FilterPipe } from './shared/filter.pipe';
import {SupplierService} from './services/supplier.service';
import {ProductCategoryService} from './services/product-category.service';
import {ProductListService} from './services/product-list.service';
import {AddressService} from './services/address.service';
import { OrderHistoryComponent } from './order-history/order-history.component';
import {ClickStopPropagation} from './shared/stop-propagation.directive';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    AddressComponent,
    ProductListComponent,
    PaymentComponent,
    PaypalComponent,
    CreditCardComponent,
    MenuComponent,
    ShoppingCartComponent,
    LoginComponent,
    FilterPipe,
    OrderHistoryComponent,
    ClickStopPropagation,
    OrderConfirmedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    OrderService,
    ProductListService,
    ProductOrderService,
    SupplierService,
    ProductCategoryService,
    AuthService,
    AuthGuardService,
    AddressService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
