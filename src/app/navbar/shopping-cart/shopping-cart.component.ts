import { Component, OnInit } from '@angular/core';
import {ProductOrderService} from '../../services/product-order.service';
import {ProductOrder} from '../../models/productOrder.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  orders: ProductOrder[] = [];

  constructor(private productOrderService: ProductOrderService, private router: Router) { }

  ngOnInit() {
    this.productOrderService.productOrdersChanged.subscribe(
      productOrders => this.orders = productOrders
    );
  }

  decrementQuantity(order) {
    this.productOrderService.changeQuantity(order.product.id, -1);
  }

 incrementQuantity(order) {
    this.productOrderService.changeQuantity(order.product.id, 1);
  }

  removeOrder(order) {
    this.productOrderService.removeProductOrder(order.id);
  }

  getSumPrice() {
    return this.orders.map(productOrder => productOrder.quantity * productOrder.product.defaultPrice).reduce((a, b) => a + b, 0);
  }

  checkout() {
    this.router.navigate(['/address', 'checkout']);
    const cart = document.getElementById('cart');
    cart.style.display = 'none';
  }
}
