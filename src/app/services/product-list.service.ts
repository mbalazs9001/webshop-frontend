import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../models/product.model';
import {Observable} from 'rxjs';

@Injectable()
export class ProductListService {

  url = environment.baseUrl + 'product-list';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
}
