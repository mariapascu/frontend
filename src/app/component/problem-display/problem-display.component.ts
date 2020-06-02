import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Problem} from '../../model/problem';
import {TSMap} from 'typescript-map';
import {ProblemSolverService} from '../../service/problem-solver/problem-solver.service';

@Component({
  selector: 'app-problem-display',
  templateUrl: './problem-display.component.html',
  styleUrls: ['./problem-display.component.css']
})
export class ProblemDisplayComponent implements OnInit {
  problem: Problem;
  propertyMap = new TSMap<string, number>();
  solutionSteps: Array<Array<string>>;

  constructor(private router: Router, private problemSolverService: ProblemSolverService) {
    console.log(window.history.state.problem);
    this.problem = window.history.state.problem;
    for (const p in this.problem.propertyMap) {
      this.propertyMap.set(p, this.problem.propertyMap[p]);
    }
  }

  ngOnInit(): void {
    this.problemSolverService.solveForGivenProblem(this.problem).subscribe(
      result => {
        console.log(result);
        this.solutionSteps = result.solutionSteps;
      },
    error => console.log(error)
  )
    ;

  }

}
