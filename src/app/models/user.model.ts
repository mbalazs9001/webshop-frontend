import {Address} from './address.model';

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public token: string,
    public billingAddress?: Address,
    public shippingAddress?: Address
  ) {}
}
