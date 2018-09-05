import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {OrderService} from './order.service';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {

  user: User;

  constructor(private http: HttpClient, private orderService: OrderService) {}

  login(email: string, password: string) {
    const header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);
    this.http.post<User>(environment.baseUrl + 'login', body.toString(), {headers: header}).subscribe(
      user => {
        this.user = user;
        this.orderService.initOrder();
      }
    );
  }

  logout() {
    this.user = null;
  }

  register(user: User): Observable<void> {
    return this.http.post<void>(environment.baseUrl + 'register', user);
  }

  isLoggedIn(): boolean {
    return this.user != null;
  }

  isEmailTaken(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}register?email=${email}`);
  }
}
