import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Problem} from '../../model/problem';
import {TSMap} from 'typescript-map';
import {ProblemSolverService} from '../../service/problem-solver/problem-solver.service';
import {ProblemService} from '../../service/problem/problem.service';
import {LoginService} from '../../service/login/login.service';
import {MeasurementService} from '../../service/measurement/measurement.service';

@Component({
  selector: 'app-problem-display',
  templateUrl: './problem-display.component.html',
  styleUrls: ['./problem-display.component.css']
})
export class ProblemDisplayComponent implements OnInit {
  problem: Problem;
  newProblem: Problem;
  propertyMap = new TSMap<string, number>();
  solutionSteps: Array<Array<string>>;
  solutionError = false;
  errorMessage = '';
  solutionValue = 0;

  constructor(private router: Router, private problemSolverService: ProblemSolverService,
              private problemService: ProblemService, private loginService: LoginService,
              private measurementService: MeasurementService) {
    if (window.history.state.problem == null) {
      router.navigate(['/problem-history']);
    }
    console.log(window.history.state.problem);
    this.problem = window.history.state.problem;
    for (const p in this.problem.propertyMap) {
      this.propertyMap.set(p, this.problem.propertyMap[p]);
    }
    console.log(this.propertyMap);
    this.newProblem = new Problem(this.problem.problemId, this.problem.userId, this.problem.shapeName,
      this.problem.unknownProperty, this.propertyMap);
  }

  ngOnInit(): void {
    if (this.loginService.isUserLoggedIn() === false) {
      this.router.navigate(['/login']);
    }
    this.problemSolverService.solveForGivenProblem(this.problem).subscribe(
      result => {
        console.log(result);
        this.solutionError = false;
        this.solutionSteps = result.solutionSteps;
        this.solutionValue = result.solution;
      },
      error => {
        console.log(error);
        this.solutionError = true;
        if (error['error']['message'] !== '') {
          this.errorMessage = error['error']['message'];
        } else {
          this.errorMessage = 'Unexpected error';
        }
      }
    )
    ;

  }

  deleteProblem() {
    console.log(this.problem.problemId);
    this.problemService.deleteProblem(this.problem.problemId).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/problem-history']);
      },
      error => console.log(error)
    )
    ;
  }

  getMeasurement(recipient: string) {
    return this.measurementService.getMeasurement(recipient);
  }
}
