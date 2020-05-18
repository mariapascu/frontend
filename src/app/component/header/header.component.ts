import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../service/login/login.service';
import {StudentService} from '../../service/student/student.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public loginService: LoginService, public studentService: StudentService) {
  }

  ngOnInit(): void {
  }

  signup() {
    this.studentService.createStudent('maria', 'florrina', 'aura', 'pascu').subscribe(u => {
      console.log(u);
    }, err => {
      console.log(err);
    });
  }
}
