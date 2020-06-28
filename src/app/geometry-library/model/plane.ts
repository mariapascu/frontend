import {Point} from './point';

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
}
