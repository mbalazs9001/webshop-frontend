import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Supplier} from '../models/supplier.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class SupplierService {

  url = environment.baseUrl + 'supplier';

  constructor(private http: HttpClient) {
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.url);
  }
}
