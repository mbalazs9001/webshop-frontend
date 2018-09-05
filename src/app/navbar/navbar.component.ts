import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {ProductOrderService} from '../services/product-order.service';
import {ProductOrder} from '../models/productOrder.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  orders: ProductOrder[] = [];

  constructor(public authService: AuthService, private router: Router, private productOrderService: ProductOrderService) { }

  ngOnInit() {
    this.productOrderService.productOrdersChanged.subscribe(
      productOrders => this.orders = productOrders
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getNumberInCart() {
    return this.orders.map(productOrder => productOrder.quantity).reduce((a, b) => a + b, 0);
  }

  showDiv() {
    const cart = document.getElementById('cart');
    cart.style.display = 'block';
  }

  hideDiv() {
    const cart = document.getElementById('cart');
    cart.style.display = 'none';
  }
}
