import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupUrl = 'http://localhost:8080/user/signup/';
  constructor(private httpClient: HttpClient) {}

  signup(firstName: string, lastName: string, email: string, password: string, role: string): Observable<Response> {
    const user = new User(0, firstName, lastName, email, password, role);
    return this.httpClient.post<Response>(this.signupUrl, user);
  }
}
