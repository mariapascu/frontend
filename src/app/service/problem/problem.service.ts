import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Problem} from '../../model/problem';
import {Observable} from 'rxjs';
import {TSMap} from 'typescript-map';
import {LoginService} from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private problemUrl = 'http://localhost:8080/problem/';
  constructor(private httpClient: HttpClient, private loginService: LoginService) { }

  getProblemsByUserId(userId: number): Observable<Array<Problem>> {
    return this.httpClient.get<Array<Problem>>(this.problemUrl + 'user/' + userId);
  }

  saveProblem(shapeName: string, unknownProperty: string, propertyMap: TSMap<string, number>) {
    const user = this.loginService.getUser();
    const problem = new Problem(1, user.id, shapeName, unknownProperty, propertyMap);
    return this.httpClient.post(this.problemUrl, problem);
  }

  deleteProblem(problemId: number) {
    return this.httpClient.delete(this.problemUrl + problemId);
  }
}
