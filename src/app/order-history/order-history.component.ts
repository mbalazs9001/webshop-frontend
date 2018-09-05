import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  completedOrders: any;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getAllCompleted().subscribe(
      orders => this.completedOrders = orders.map(
        order => {
          return {
            'date': order.date,
            'total': order.productOrders
              .map(product => product.quantity * product.product.defaultPrice)
              .reduce((a, b) => a + b, 0),
            'products': order.productOrders.map(
              productOrder => {
                const product = productOrder.product;
                return {
                  'quantity': productOrder.quantity,
                  'name': product.name,
                  'price': product.defaultPrice,
                  'currency': product.defaultCurrency
                };
              }
            )
          };
        }
      )
    );
  }

}
