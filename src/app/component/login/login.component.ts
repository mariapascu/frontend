import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'maria';
  password = '';
  invalidLogin = false;
  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  checkLogin() {
    if (this.loginService.authenticate(this.username, this.password)) {
      this.router.navigate(['']);
      this.invalidLogin = false;
    }
    else {
      this.invalidLogin = true;
    }
  }

}
