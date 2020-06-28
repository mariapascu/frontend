import {Point} from './point';
import {Line} from './line';

export class Plane {
  point1: Point;
  point2: Point;
  point3: Point;

  constructor(point1: Point, point2: Point, point3: Point) {
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
  }

  getNotation(): string {
    return this.point1.notation + this.point2.notation + this.point3.notation;
  }

  getPlaneEquation() {
    const lineEq1 = (new Line(this.point1, this.point2)).getLineEquation();
    const lineEq2 = (new Line(this.point1, this.point3)).getLineEquation();
    const a = lineEq1[1][1] * lineEq2[1][2] - lineEq1[1][2] * lineEq2[1][1];
    const b = lineEq1[1][2] * lineEq2[1][0] - lineEq1[1][0] * lineEq2[1][2];
    const c = lineEq1[1][0] * lineEq2[1][1] - lineEq1[1][1] * lineEq2[1][0];
    const d = (-1) * (a * lineEq1[0][0] + b * lineEq1[0][1] + c * lineEq1[0][2]);
    return [a, b, c, d];
  }
}
