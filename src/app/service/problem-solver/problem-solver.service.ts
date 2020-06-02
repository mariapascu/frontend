import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Problem} from '../../model/problem';
import {TSMap} from 'typescript-map';
import {Observable} from 'rxjs';
import {LoginService} from '../login/login.service';
import {Solution} from '../../model/solution';

@Injectable({
  providedIn: 'root'
})
export class ProblemSolverService {
  private solverUrl = 'http://localhost:8080/solver/';
  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  solveProblem(figureName: string, unknownProperty: string, propertyMap: TSMap<string, number>): Observable<Solution> {
    const user = this.loginService.getUser();
    const problem = new Problem(user.id, figureName, unknownProperty, propertyMap);
    console.log(problem);
    return this.httpClient.post<Solution>(this.solverUrl, problem);
  }

  solveForGivenProblem(problem: Problem): Observable<Solution>{
    console.log(problem);
    return this.httpClient.post<Solution>(this.solverUrl, problem);
  }

  saveProblem(figureName: string, unknownProperty: string, propertyMap: TSMap<string, number>) {
    const user = this.loginService.getUser();
    const problem = new Problem(user.id, figureName, unknownProperty, propertyMap);
    return this.httpClient.post(this.solverUrl + 'problem', problem);
  }
}
