import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Problem} from '../../model/problem';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private problemUrl = 'http://localhost:8080/problem/';
  constructor(private httpClient: HttpClient) { }

  getProblemsByUserId(userId: number): Observable<Array<Problem>> {
    return this.httpClient.get<Array<Problem>>(this.problemUrl + 'user/' + userId);
  }
}
