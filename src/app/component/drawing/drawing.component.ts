import {AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild} from '@angular/core';
import {Problem} from '../../model/problem';
import {ProblemSolverService} from '../../service/problem-solver/problem-solver.service';
import {MultipleProblems} from '../../model/multiple-problems';
import {TSMap} from 'typescript-map';
import {GeometryLibrary} from '../../geometry-library/geometry-library';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.css']
})
export class DrawingComponent implements AfterViewInit, OnChanges {
  @Input('problem') problem: Problem;
  propertyMap = new TSMap<string, number>();
  @ViewChild('drawingDiv')
  public drawingDiv: ElementRef;
  drawHelper: GeometryLibrary;
  error = false;

  constructor(private problemSolverService: ProblemSolverService) {
  }

  ngAfterViewInit(): void {
    this.problem.propertyMap.forEach((value: number, key: string) => {
      this.propertyMap.set(key, value);
    });
    console.log(this.problem);
    console.log(this.drawingDiv.nativeElement.offsetWidth + ' ' + this.drawingDiv.nativeElement.offsetWidth);
    this.drawHelper = new GeometryLibrary(this.drawingDiv);
    this.addDrawing();
  }

  ngOnChanges() {
    if (this.drawHelper != null) {
      this.drawHelper.cleanCanvas();
      this.addDrawing();
    }
  }

  addDrawing() {
    if (this.problem.shapeName === 'cube' || this.problem.shapeName === 'sphere' || this.problem.shapeName === 'regular tetrahedron') {
      this.drawHelper.setShape(this.problem.shapeName, this.propertyMap);
    } else if (this.problem.shapeName === 'rectangular parallelepiped') {
      this.addParallelepiped();
    } else if (this.problem.shapeName === 'cylinder') {
      this.addCylinder();
    }
  }

  private addParallelepiped() {
    let pLength;
    let pWidth;
    let pHeight;
    const unknownProperties = new Array<string>();
    if (this.propertyMap.get('length')) {
      pLength = this.propertyMap.get('length');
    } else {
      unknownProperties.push('length');
    }
    if (this.propertyMap.get('width')) {
      pWidth = this.propertyMap.get('width');
    } else {
      unknownProperties.push('width');
    }
    if (this.propertyMap.get('height')) {
      pHeight = this.propertyMap.get('height');
    } else {
      unknownProperties.push('height');
    }
    if (unknownProperties.length === 0) {
      this.drawHelper.setShape(this.problem.shapeName, this.propertyMap);
    } else {
      const problems = new MultipleProblems(this.problem.shapeName, unknownProperties, this.propertyMap);
      this.problemSolverService.solveMultipleProblems(problems).subscribe(
        result => {
          this.error = false;
          if (pLength == null) {
            this.propertyMap.set('length', result.propertyMap['length']);
          }
          if (pWidth == null) {
            this.propertyMap.set('width', result.propertyMap['width']);
          }
          if (pHeight == null) {
            this.propertyMap.set('height', result.propertyMap['height']);
          }
          this.drawHelper.setShape(this.problem.shapeName, this.propertyMap);
        },
        error => {
          this.onError();
        }
      );
    }
  }

  private addCylinder() {
    let cRadius;
    let cHeight;
    const unknownProperties = new Array<string>();
    if (this.propertyMap.get('radius')) {
      cRadius = this.propertyMap.get('radius');
    } else {
      unknownProperties.push('radius');
    }
    if (this.propertyMap.get('height')) {
      cHeight = this.propertyMap.get('height');
    } else {
      unknownProperties.push('height');
    }
    if (unknownProperties.length === 0) {
      this.drawHelper.setShape(this.problem.shapeName, this.propertyMap);
    } else {
      const problems = new MultipleProblems(this.problem.shapeName, unknownProperties, this.propertyMap);
      this.problemSolverService.solveMultipleProblems(problems).subscribe(
        result => {
          this.error = false;
          if (cRadius == null) {
            this.propertyMap.set('radius', result.propertyMap['radius']);
          }
          if (cHeight == null) {
            this.propertyMap.set('height', result.propertyMap['height']);
          }
          this.drawHelper.setShape(this.problem.shapeName, this.propertyMap);
        },
        error => {
          this.onError();
        }
      );
    }
  }

  private onError() {
    this.error = true;
  }
}
