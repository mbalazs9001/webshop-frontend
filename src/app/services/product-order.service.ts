import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderService} from './order.service';
import {Product} from '../models/product.model';
import {ProductOrder} from '../models/productOrder.model';
import {environment} from '../../environments/environment';
import {Order} from '../models/order.model';

@Injectable()
export class ProductOrderService {

  productOrders: ProductOrder[];
  orderId: number;
  private url = environment.baseUrl + 'product-order';
  productOrdersChanged = new EventEmitter<ProductOrder[]>();

  constructor(private http: HttpClient, private orderService: OrderService) {
    this.orderService.orderChanged.subscribe(
      (order: Order) => {
        this.orderId = order.id;
        this.productOrders = order.productOrders;
        this.productOrdersChanged.emit(order.productOrders);
        console.log(order.productOrders);
      }
    );
  }

  itemToCart(product: Product) {
    const productOrder = this.productOrders.find(po => po.productId === product.id);
    if (productOrder === undefined) {
      this.addProductOrder(new ProductOrder(0, 1, this.orderId, product.id, product));
    } else {
      this.changeQuantity(product.id, 1);
    }
  }

  addProductOrder(productOrder: ProductOrder) {
    this.http.post<number>(this.url, productOrder).subscribe(
      id => {
        productOrder.id = id;
        this.productOrders.push(productOrder);
        this.productOrdersChanged.emit(this.productOrders);
      }
    );
  }

  changeQuantity(productId: number, amount: number) {
    if (!(amount === 1 || amount === -1)) {
      return;
    }
    for (let i = 0; i < this.productOrders.length; i++) {
      if (this.productOrders[i].productId === productId) {
        if (amount === -1 && this.productOrders[i].quantity === 1) {
          return;
        }
        this.productOrders[i].quantity += amount;
        this.http.put(this.url, this.productOrders[i]).subscribe();
        this.productOrdersChanged.emit(this.productOrders);
      }
    }
  }

  removeProductOrder(poId: number) {
    this.productOrders = this.productOrders.filter(po => po.id !== poId);
    this.http.delete(`${this.url}?id=${poId}`).subscribe();
    this.productOrdersChanged.emit(this.productOrders);
  }
}
