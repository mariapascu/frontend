import {Point} from '../geometry-library/model/point';
import {Line} from '../geometry-library/model/line';
import {Plane} from '../geometry-library/model/plane';

export class Shape {
  points: Array<Point>;
  lines: Array<Line>;
  planes: Array<Plane>;
}
