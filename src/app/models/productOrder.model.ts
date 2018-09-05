import {Product} from './product.model';

export class ProductOrder {
  constructor(
    public id: number,
    public quantity: number,
    public orderId: number,
    public productId: number,
    public product: Product
  ) {
  }

}
