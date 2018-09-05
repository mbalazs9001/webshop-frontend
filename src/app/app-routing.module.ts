import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {ProductListComponent} from './product-list/product-list.component';
import {AddressComponent} from './address/address.component';
import {PaymentComponent} from './payment/payment.component';
import {PaypalComponent} from './payment/paypal/paypal.component';
import {CreditCardComponent} from './payment/credit-card/credit-card.component';
import {OrderHistoryComponent} from './order-history/order-history.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './services/auth-guard.service';
import {OrderConfirmedComponent} from './order-confirmed/order-confirmed.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'address', component: AddressComponent, canActivate: [AuthGuardService]},
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [AuthGuardService]},
  {path: 'address/:checkout', component: AddressComponent, canActivate: [AuthGuardService]},
  {path: 'payment', component: PaymentComponent, canActivate: [AuthGuardService], children: [
      {path: 'paypal', component: PaypalComponent},
      {path: 'credit-card', component: CreditCardComponent}
    ]},
  {path: 'confirm-page', component: OrderConfirmedComponent, canActivate: [AuthGuardService]},
  {path: '', redirectTo: 'product-list', pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
