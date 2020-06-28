import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Problem} from '../../model/problem';
import {TSMap} from 'typescript-map';
import {Observable} from 'rxjs';
import {LoginService} from '../login/login.service';
import {Solution} from '../../model/solution';
import {MultipleProblems} from '../../model/multiple-problems';
import {MultipleSolutions} from '../../model/multiple-solutions';

@Injectable({
  providedIn: 'root'
})
export class ProblemSolverService {
  private solverUrl = 'http://localhost:8080/solver/';
  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  // solveProblem(figureName: string, unknownProperty: string, propertyMap: TSMap<string, number>): Observable<Solution> {
  //
  //   console.log(problem);
  //   return this.httpClient.post<Solution>(this.solverUrl, problem);
  // }

  solveForGivenProblem(problem: Problem): Observable<Solution>{
    console.log(problem);
    return this.httpClient.post<Solution>(this.solverUrl, problem);
  }

  solveMultipleProblems(problem: MultipleProblems): Observable<MultipleSolutions> {
    return this.httpClient.post<MultipleSolutions>(this.solverUrl + 'multiple-problems', problem);
  }
}
