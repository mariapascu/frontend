import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import { LogoutComponent } from './component/logout/logout.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { SignupComponent } from './component/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { SignupSuccessDialogComponent } from './dialog/signup-success-dialog/signup-success-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FailureDialogComponent } from './dialog/failure-dialog/failure-dialog.component';
import { StudentHomeComponent } from './component/student-home/student-home.component';
import { TeacherHomeComponent } from './component/teacher-home/teacher-home.component';
import {MatTabsModule} from '@angular/material/tabs';
import { StudentNavbarComponent } from './component/student-navbar/student-navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { ProblemHistoryComponent } from './component/problem-history/problem-history.component';
import {MatCardModule} from '@angular/material/card';
import { ProblemDisplayComponent } from './component/problem-display/problem-display.component';
import { DrawingComponent } from './component/drawing/drawing.component';
import { CustomShapeComponent } from './component/custom-shape/custom-shape.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    SignupSuccessDialogComponent,
    FailureDialogComponent,
    StudentHomeComponent,
    TeacherHomeComponent,
    StudentNavbarComponent,
    ProblemHistoryComponent,
    ProblemDisplayComponent,
    DrawingComponent,
    CustomShapeComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        MatDialogModule,
        MatTabsModule,
        MatToolbarModule,
        MatSelectModule,
        MatListModule,
        MatCardModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
