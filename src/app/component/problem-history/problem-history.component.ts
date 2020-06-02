import { Component, OnInit } from '@angular/core';
import {ProblemService} from '../../service/problem/problem.service';
import {Problem} from '../../model/problem';
import {User} from '../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-problem-history',
  templateUrl: './problem-history.component.html',
  styleUrls: ['./problem-history.component.css']
})
export class ProblemHistoryComponent implements OnInit {
  problemList: Array<Problem>;
  knownProperties = new Array<Array<string>>();
  student: User;
  constructor(private router: Router, private problemService: ProblemService) {}

  ngOnInit(): void {
    this.student = JSON.parse(sessionStorage.getItem('user'));
    this.problemService.getProblemsByUserId(this.student.id).subscribe(
      result => {
        console.log(result);
        this.problemList = result;
        for (let i = 0; i < this.problemList.length; i++) {
          this.knownProperties.push(new Array<string>());
          for (const key in this.problemList[i].propertyMap) {
            this.knownProperties[i].push(key);
          }
        }
        console.log(this.knownProperties);
      },
      error => {
        console.log(error);
      }
    );
  }

  viewProblem(i: number) {
    console.log(i);
    this.router.navigate(['problem-display'], {
      state: {problem: this.problemList[i]}
    });
  }
}
