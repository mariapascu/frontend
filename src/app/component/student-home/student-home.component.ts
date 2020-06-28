import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/model/user';
import {GeometryDataService} from '../../service/geometry-data/geometry-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProblemSolverService} from '../../service/problem-solver/problem-solver.service';
import {TSMap} from 'typescript-map';
import {Solution} from '../../model/solution';
import {Problem} from '../../model/problem';
import {LoginService} from '../../service/login/login.service';
import {ProblemService} from '../../service/problem/problem.service';
import {Router} from '@angular/router';
import {MeasurementService} from '../../service/measurement/measurement.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  student: User;
  selectedShape: string;
  propertyForm = new FormGroup({
    property: new FormControl(''),
    value: new FormControl('', [Validators.min(0.0001)])
  });
  geometricShapeProperties;
  unknownProperties;
  propertyMap = new TSMap<string, number>();
  unknownPropertyForm = new FormGroup({
    unknownProperty: new FormControl('', Validators.required)
  });
  unknownProperty;
  solutionSteps;
  existentSolution = false;
  solutionError = false;
  problem: Problem;
  errorMessage = '';
  solutionValue = 0;

  constructor(public geometryDataService: GeometryDataService, private problemSolverService: ProblemSolverService,
              private problemService: ProblemService, private loginService: LoginService, private router: Router,
              private measurementService: MeasurementService) {
  }

  ngOnInit(): void {
    if (this.loginService.isUserLoggedIn() === false) {
      this.router.navigate(['/login']);
    }
    this.student = this.loginService.getUser();
  }

  changeShape() {
    console.log(this.selectedShape);
    for (const key of this.propertyMap.keys()) {
      this.propertyMap.delete(key);
    }
    this.unknownProperty = null;
    console.log(this.geometryDataService.geometricShapesProperties.get(this.selectedShape));
    this.geometricShapeProperties = JSON.parse(JSON.stringify(this.geometryDataService.geometricShapesProperties.get(this.selectedShape)));
    this.unknownProperties = this.geometryDataService.geometricShapesProperties.get(this.selectedShape);
    console.log(this.geometricShapeProperties);
  }

  geometryShapeSelected() {
    return this.selectedShape != null;
  }

  addProperty() {
    console.log(this.propertyForm.value);
    if (this.propertyForm.valid && this.propertyForm.value.property !== '' && this.propertyForm.value.value > 0) {
      this.propertyMap.set(this.propertyForm.value.property, this.propertyForm.value.value);
      console.log(this.propertyMap);
      this.propertyForm.reset();
    }
  }

  canSolveProblem() {
    return this.selectedShape != null && this.propertyMap.size() > 0 && this.unknownProperty != null;
  }

  solveProblem() {
    const user = this.loginService.getUser();
    this.problem = new Problem(1, user.id, this.selectedShape, this.unknownProperty, this.propertyMap);
    this.problemSolverService.solveForGivenProblem(this.problem).subscribe(
      result => {
        console.log(result);
        this.existentSolution = true;
        this.solutionError = false;
        this.solutionSteps = result.solutionSteps;
        this.solutionValue = result.solution;
      },
      error => {
        console.log(error);
        this.solutionError = true;
        if (error['error']['message'] !== '') {
          this.errorMessage = error['error']['message'];
        }
        else {
          this.errorMessage = 'Unexpected Error';
        }
      }
    );
  }

  addUnknownProperty() {
    if (this.unknownPropertyForm.valid) {
      this.unknownProperty = this.unknownPropertyForm.value.unknownProperty;
    }
  }

  unknownPropertySelected() {
    return this.unknownProperty != null;
  }

  reloadPage() {
    window.location.reload();
  }

  saveProblem() {
    this.problemService.saveProblem(this.selectedShape, this.unknownProperty, this.propertyMap).subscribe(
      result => {
        console.log(result);
      },
      error => console.log(error)
    );
  }

  getMeasurement(recipient: string) {
    return this.measurementService.getMeasurement(recipient);
  }
}
