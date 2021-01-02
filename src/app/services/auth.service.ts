import { Injectable } from '@angular/core';
import {AuthenticationService} from '../../openapi';
import * as moment from 'moment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public authApi: AuthenticationService) { }

  private static setSession(token): void {
    localStorage.setItem('jwt_token', token);
  }

  login(email: string, password: string ): Observable<any> {
    return new Observable(subscriber => {
      this.authApi.login({
        username: email,
        password,
      }).subscribe(data => {
        AuthService.setSession(data.token);
        subscriber.next();
      }, error => {
        subscriber.error(error);
      });
    });
  }

  getToken(): string {
    return localStorage.getItem('jwt_token');
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): moment.Moment {
    const token = this.getToken();

    const helper = new JwtHelperService();
    const expiration = helper.getTokenExpirationDate(token);

    return moment(expiration);
  }
}
