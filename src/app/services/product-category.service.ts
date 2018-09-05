import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductCategory} from '../models/productCategory.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class ProductCategoryService {

  url = environment.baseUrl + 'product-category';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(this.url);
  }
}
