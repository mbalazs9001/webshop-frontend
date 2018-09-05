import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.css']
})
export class OrderConfirmedComponent implements OnInit {

  products: any[];
  totalPrice: number;
  paymentId: string;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    const order = this.orderService.sentOrder;
    this.totalPrice = order.productOrders
      .map(po => po.quantity * po.product.defaultPrice)
      .reduce((a, b) => a + b, 0);
    this.products = order.productOrders.map(po => {
      return {
        'name': po.product.name,
        'quantity': po.quantity,
        'price': po.product.defaultPrice,
        'currency': po.product.defaultCurrency
      }
    });
    this.paymentId = order.paymentId;
  }

  navigateBack() {
    this.router.navigate(['/']);
  }
}
