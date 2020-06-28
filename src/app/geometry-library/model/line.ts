import {Point} from './point';

export class Line {
  point1: Point;
  point2: Point;

  constructor(point1: Point, point2: Point) {
    this.point1 = point1;
    this.point2 = point2;
  }

  getNotation(): string {
    return this.point1.notation + this.point2.notation;
  }

  getLineEquation() {
    const origin = [this.point1.x, this.point1.y, this.point1.z];
    const vector = [];
    vector.push(this.point2.x - origin[0]);
    vector.push(this.point2.y - origin[1]);
    vector.push(this.point2.z - origin[2]);
    return [origin, vector];
  }
}
