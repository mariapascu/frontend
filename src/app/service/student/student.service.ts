import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentUrl = 'http://localhost:8080/student/';
  constructor(private httpClient: HttpClient) { }

  createStudent(firstName: string, lastName: string, email: string, password: string): Observable<Response>{
    const student = new User(0, firstName, lastName, email, password, 'student');
    const answer = this.httpClient.post<Response>(this.studentUrl + 'add', student);
    console.log(answer);
    return answer;
  }

}
