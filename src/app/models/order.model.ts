import {ProductOrder} from './productOrder.model';

export class Order {
  constructor(
    public id: number,
    public userId: number,
    public paymentId: string,
    public status: string,
    public date: string,
    public productOrders: ProductOrder[] = []
  ) {
  }
}
