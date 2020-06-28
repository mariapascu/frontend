import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {SignupService} from '../../service/signup/signup.service';
import {MatDialog} from '@angular/material/dialog';
import {SignupSuccessDialogComponent} from '../../dialog/signup-success-dialog/signup-success-dialog.component';
import {FailureDialogComponent} from '../../dialog/failure-dialog/failure-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;
  signupForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z -]*')
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z -]*')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*\\d)(?=.*[a-zA-Z]).{6,}$'),
    ]),
  });

  constructor(private signupService: SignupService, private dialog: MatDialog) {
  }


  ngOnInit(): void {
  }

  signup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      const user = this.signupForm.value;
      this.signupService.signup(user.firstName, user.lastName, user.email, user.password, 'student').subscribe(
        result => {
          console.log(result);
          const successDialog = this.dialog.open(SignupSuccessDialogComponent);
        },
        error => {
          console.log(error['error']['message']);
          let errorMessage = error['error']['message'];
          if (errorMessage == null) {
            errorMessage = 'Unexpected error!';
          }
          const failureDialog = this.dialog.open(FailureDialogComponent, {
            data: {error: errorMessage}
          });
        }
      );
    } else {
      console.log(this.signupForm.valid);
      console.log(this.signupForm.value);
    }
  }
}
