import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Order} from '../models/order.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class OrderService {

  order: Order;
  sentOrder: Order;
  url = environment.baseUrl + 'order';
  orderChanged = new EventEmitter<Order>();

  constructor(private http: HttpClient, private router: Router) {}

  initOrder() {
    this.http.get<Order>(this.url).subscribe(
      order => {
        this.order = order;
        this.orderChanged.emit(order);
        console.log(this.order);
      }
    );
  }

  sendOrder() {
    const header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const paymentId = Math.random() *90000000 + 10000000+ '';
    const id = this.order.id;
    const body = new HttpParams()
      .set('id', id + '')
      .set('paymentId', paymentId);
    this.sentOrder = this.order;
    this.sentOrder.paymentId = paymentId;
    this.http.post<void>(this.url, body.toString(), {headers: header}).subscribe(
      () => {
        this.initOrder();
        this.router.navigate(['/confirm-page']);
      }
    );
  }

  getAllCompleted(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}?get-all=true`)
  }
}
