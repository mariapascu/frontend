import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  authenticate(username, password) {
    if (username === 'maria' && password === 'password') {
      sessionStorage.setItem('username', username);
      return true;
    }
    else {
      console.log("aaaa");
      return false;
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('username');
  }
}
