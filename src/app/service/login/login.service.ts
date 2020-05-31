import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:8080/login/';
  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.get<User>(this.loginUrl + email + '/' + password);
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  getUser(): User {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  logout() {
    sessionStorage.removeItem('username');
  }
}
