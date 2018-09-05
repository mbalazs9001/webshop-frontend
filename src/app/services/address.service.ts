import {Injectable} from '@angular/core';
import {Address} from '../models/address.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class AddressService {
  url = environment.baseUrl + 'address';

  constructor(private http: HttpClient) {}

  modify(address: Address) {
    this.http.put(this.url, address).subscribe();
  }

  add(address: Address) {
    this.http.post(this.url, address).subscribe();
  }

  get(): Observable<Address> {
    return this.http.get<Address>(this.url);
  }

}
