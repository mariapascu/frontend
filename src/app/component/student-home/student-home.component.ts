import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/model/user';
import {GeometryDataService} from '../../service/geometry-data/geometry-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProblemSolverService} from '../../service/problem-solver/problem-solver.service';
import {TSMap} from 'typescript-map';
import {Solution} from '../../model/solution';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  student: User;
  selectedFigure: string;
  propertyForm = new FormGroup({
    property: new FormControl(''),
    value: new FormControl(0, [Validators.min(0.0001)])
  });
  geometricFigureProperties;
  unknownProperties;
  propertyMap = new TSMap<string, number>();
  unknownPropertyForm = new FormGroup({
    unknownProperty: new FormControl('', Validators.required)
  });
  unknownProperty;
  solutionSteps;
  existentSolution = false;

  constructor(public geometryDataService: GeometryDataService, private problemSolverService: ProblemSolverService) {
  }

  ngOnInit(): void {
    this.student = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.student);
  }

  changeFigure() {
    console.log(this.selectedFigure);
    for (const key of this.propertyMap.keys()) {
      this.propertyMap.delete(key);
    }
    this.unknownProperty = null;
    this.geometricFigureProperties = this.geometryDataService.geometricFiguresProperties.get(this.selectedFigure);
    this.unknownProperties = this.geometryDataService.geometricFiguresProperties.get(this.selectedFigure);
    console.log(this.geometricFigureProperties);
  }

  geometryFigureSelected() {
    return this.selectedFigure != null;
  }

  addProperty() {
    console.log(this.propertyForm.value);
    if (this.propertyForm.valid && this.propertyForm.value.property !== '' && this.propertyForm.value.value > 0) {
      this.propertyMap.set(this.propertyForm.value.property, this.propertyForm.value.value);
      console.log(this.propertyMap);
      const index = this.unknownProperties.indexOf(this.propertyForm.value.property);
      console.log(index);
      if (index >= 0) {
        this.unknownProperties.splice(index, 1);
        console.log(this.unknownProperties);
      }
      this.propertyForm.reset();
    }
  }

  canSolveProblem() {
    return this.selectedFigure != null && this.propertyMap.size() > 0 && this.unknownProperty != null;
  }

  solveProblem() {
    this.problemSolverService.solveProblem(this.selectedFigure, this.unknownProperty, this.propertyMap).subscribe(
      result => {
        console.log(result);
        this.existentSolution = true;
        this.solutionSteps = result.solutionSteps;
      },
      error => console.log(error)
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
    this.problemSolverService.saveProblem(this.selectedFigure, this.unknownProperty, this.propertyMap).subscribe(
      result => {
        console.log(result);
      },
      error => console.log(error)
    );
  }
}
