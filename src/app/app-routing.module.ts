import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/login/login.component';
import {LogoutComponent} from './component/logout/logout.component';
import {HomeComponent} from './component/home/home.component';
import {SignupComponent} from './component/signup/signup.component';
import {StudentHomeComponent} from './component/student-home/student-home.component';
import {TeacherHomeComponent} from './component/teacher-home/teacher-home.component';
import {ProblemHistoryComponent} from './component/problem-history/problem-history.component';
import {ProblemDisplayComponent} from './component/problem-display/problem-display.component';
import {CustomShapeComponent} from './component/custom-shape/custom-shape.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'home',
    component: StudentHomeComponent
  },
  {
    path: 'teacher-home',
    component: TeacherHomeComponent
  },
  {
    path: 'problem-history',
    component: ProblemHistoryComponent
  },
  {
    path: 'problem-display',
    component: ProblemDisplayComponent
  },
  {
    path: 'custom-shape',
    component: CustomShapeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
