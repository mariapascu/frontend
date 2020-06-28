import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Point} from '../../geometry-library/model/point';
import {GeometryLibrary} from '../../geometry-library/geometry-library';
import {Plane} from '../../geometry-library/model/plane';
import {Line} from '../../geometry-library/model/line';
import {LineProperty} from '../../geometry-library/model/line-property';
import {FailureDialogComponent} from '../../dialog/failure-dialog/failure-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-custom-shape',
  templateUrl: './custom-shape.component.html',
  styleUrls: ['./custom-shape.component.css']
})
export class CustomShapeComponent implements OnInit, AfterViewInit {
  @ViewChild('drawingDiv')
  public drawingDiv: ElementRef;
  showAddPointMenu = false;
  showAddLineMenu = false;
  showAddPlaneMenu = false;
  showSecondPointMenu = false;
  showLengthAndPropertyMenu = false;
  showAddCoordinatesMenu = false;
  showAddIntersectionMenu = false;
  addPointCoordinatesForm = new FormGroup({
    notation: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{1}')]),
    x: new FormControl('', [Validators.required]),
    y: new FormControl('', [Validators.required]),
    z: new FormControl('', [Validators.required])
  });
  addPointIntersectionForm = new FormGroup({
    notation: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{1}')]),
    line1: new FormControl('', [Validators.required]),
    line2: new FormControl('', [Validators.required])
  });
  addLineForm = new FormGroup({
    point1: new FormControl('', [Validators.required]),
    point2: new FormControl(''),
    notation: new FormControl('', Validators.pattern('[A-Z]{1}')),
    length: new FormControl('', [Validators.min(0.0001)]),
    property: new FormControl('')
  });
  addPlaneForm = new FormGroup({
    point1: new FormControl('', [Validators.required]),
    point2: new FormControl('', [Validators.required]),
    point3: new FormControl('', [Validators.required])
  });
  drawingHelper: GeometryLibrary;
  pointProperties: Array<LineProperty>;
  selectedProperty: LineProperty;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.drawingHelper = new GeometryLibrary(this.drawingDiv);
    let point1 = new Point('A', 1, 1, 1);
    this.drawingHelper.addPoint(point1);
    let point2 = new Point('B', 2, 5, 1);
    this.drawingHelper.addPoint(point2);
    this.drawingHelper.addLine(new Line(point1, point2));
    point1 = new Point('C', 2, 0, -1);
    this.drawingHelper.addPoint(point1);
  }

  addPoint() {
    console.log('add point');
    if (this.showAddCoordinatesMenu) {
      if (this.addPointCoordinatesForm.valid && this.validPoint() === '') {
        const values = this.addPointCoordinatesForm.value;
        const point = new Point(values.notation, values.x, values.y, values.z);
        this.drawingHelper.addPoint(point);
        this.addPointCoordinatesForm.reset();
      }
    } else if (this.showAddIntersectionMenu) {
      if (this.addPointIntersectionForm.valid && this.validPoint() === '') {
        const values = this.addPointIntersectionForm.value;
        console.log('intersection');
        const result = this.drawingHelper.addLineIntersection(values.notation, values.line1, values.line2);
        if (result === false) {
          const errorMessage = 'Could not add point: lines are parallel';
          const failureDialog = this.dialog.open(FailureDialogComponent, {
            data: {error: errorMessage}
          });
        }
        this.addPointIntersectionForm.reset();
      }
    }

    this.setDefault();

  }

  getPoints() {
    return this.drawingHelper.points;
  }

  arePoints() {
    return (this.drawingHelper != null && this.drawingHelper.points.length > 0);
  }

  validPoint(): string{
    if (this.showAddCoordinatesMenu) {
      const values = this.addPointCoordinatesForm.value;
      const point = new Point(values.notation, values.x, values.y, values.z);
      if (this.drawingHelper.existentPoint(point)) {
        return 'Point already exists!';
      }
      else {
        return '';
      }
    } else if (this.showAddIntersectionMenu) {
      const values = this.addPointIntersectionForm.value;
      if (values.line1 != null && values.line1 !== '' && values.line1 === values.line2) {
        return 'The lines must be distinct!';
      }
      else {
        if (this.drawingHelper.existentPointNotation(values.notation)) {
          return 'Notation already exists';
        }
      }
      return '';
    }
  }

  addLine() {
    if (this.lineError() === '' && this.addLineForm.valid) {
      const values = this.addLineForm.value;
      console.log(values);
      if (this.showSecondPointMenu) {
        if (values.point2 != null && values.point2 !== '') {
          console.log('hello');
          const line = new Line(values.point1, values.point2);
          this.drawingHelper.addLine(line);
          this.addLineForm.reset();
          this.setDefault();
        }
      } else if (this.showLengthAndPropertyMenu) {
        if (values.notation != null && values.notation !== '' && values.property != null) {
          const property = values.property;
          property.notation = values.notation;
          console.log('here');
          if (values.property !== 'intersection' && values.length > 0) {
            property.length = values.length;
          }
          this.drawingHelper.addLineWithProperties(values.point1, property);
          console.log('hello1');
          this.addLineForm.reset();
          this.setDefault();
        }
      }
    }
  }

  getLines() {
    return this.drawingHelper.lines;
  }

  areLines() {
    return (this.drawingHelper != null && this.drawingHelper.lines.length > 0);
  }

  lineError() {
    const values = this.addLineForm.value;
    if (this.showSecondPointMenu) {
      if (this.drawingHelper.existentLine(values.point1, values.point2)) {
        return 'Line already exist!';
      }
      return '';
    } else if (this.showLengthAndPropertyMenu) {
      if (this.drawingHelper.existentPointNotation(values.notation)) {
        return 'Point already exists!';
      }
      return '';
    }
  }

  addPlane() {
    if (this.validPlane()) {
      const values = this.addPlaneForm.value;
      const plane = new Plane(values.point1, values.point2, values.point3);
      this.drawingHelper.addPlane(plane);
      this.addPlaneForm.reset();
      this.setDefault();
    }
  }

  getPlanes() {
    return this.drawingHelper.planes;
  }

  arePlanes() {
    return (this.drawingHelper != null && this.drawingHelper.planes.length > 0);
  }

  validPlane() {
    if (this.addPlaneForm.valid) {
      const values = this.addPlaneForm.value;
      if (values.point1.notation === values.point2.notation) {
        return false;
      }
      if (values.point1.notation === values.point3.notation) {
        return false;
      }
      return values.point2.notation !== values.point3.notation;
    }
    return false;
  }

  setDefault() {
    this.showAddPointMenu = false;
    this.showAddLineMenu = false;
    this.showAddPlaneMenu = false;
    this.setDefaultForLine();
    this.setDefaultForPoint();
  }

  addPointPressed() {
    this.showAddPointMenu = true;
    this.showAddLineMenu = false;
    this.showAddPlaneMenu = false;
  }

  addLinePressed() {
    this.showAddPointMenu = false;
    this.showAddLineMenu = true;
    this.showAddPlaneMenu = false;
  }

  addPlanePressed() {
    this.showAddPointMenu = false;
    this.showAddLineMenu = false;
    this.showAddPlaneMenu = true;
  }

  setDefaultForLine() {
    this.showSecondPointMenu = false;
    this.showLengthAndPropertyMenu = false;
  }

  addSecondPointPressed() {
    this.showSecondPointMenu = true;
    this.showLengthAndPropertyMenu = false;
  }

  addLengthAndPropertyPressed() {
    this.showSecondPointMenu = false;
    this.showLengthAndPropertyMenu = true;
    this.pointProperties = this.drawingHelper.getLineProperties();
  }

  addCoordinatesPressed() {
    this.showAddCoordinatesMenu = true;
    this.showAddIntersectionMenu = false;
  }

  addIntersectionPressed() {
    this.showAddCoordinatesMenu = false;
    this.showAddIntersectionMenu = true;
  }

  setDefaultForPoint() {
    this.showAddCoordinatesMenu = false;
    this.showAddIntersectionMenu = false;
  }

  reloadPage() {
    window.location.reload();
  }

  needLength() {
    const property = this.addLineForm.value.property;
    if (property == null || property.property === 'perpendicular') {
      return false;
    } else {
      return true;
    }
  }
}
