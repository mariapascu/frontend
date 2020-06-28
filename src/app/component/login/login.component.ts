import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../service/login/login.service';
import {User} from '../../model/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {FailureDialogComponent} from '../../dialog/failure-dialog/failure-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }
  );
  hide = true;

  constructor(private router: Router, private loginService: LoginService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('user') != null)  {
      console.log('hello');
      this.router.navigate(['/home']);
    }
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        result => {
          console.log(result);
          sessionStorage.setItem('user', JSON.stringify(result));
          console.log(sessionStorage.getItem('user'));
          if (result['role'] === 'student') {
            this.router.navigate(['/home']);
          }
          else {
            this.router.navigate(['/teacher-home']);
          }
        },
        error => {
          console.log(error);
          let errorMessage = error['error']['message'];
          if (errorMessage == null) {
            errorMessage = 'Unexpected Error';
          }
          const failureDialog = this.dialog.open(FailureDialogComponent, {
            data: {error: errorMessage}
          });
        }
      );
    }
    // this.loginService.authenticate(this.email, this.password).subscribe(u => {
    //     console.log(u);
    //     console.log(u.body);
    //     const result = u;
    //     this.user = new User(result['id'], result['firstName'], result['lastName'], result['email'], result['password'], result['type']);
    //     console.log(this.user);
    //   },
    //   err => {
    //     console.log(err['error']['message']);
    //   });
    // // if (this.loginService.authenticate(this.email, this.password)) {
    // //   this.router.navigate(['']);
    // //   this.invalidLogin = false;
    // // }
    // // else {
    // //   this.invalidLogin = true;
    // // }
  }

}
