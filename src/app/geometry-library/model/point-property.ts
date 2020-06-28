import {Line} from './line';
import {Plane} from './plane';

export class PointProperty {
  notation: string;
  length: number;
  property: string;
  line1: Line;
  line2: Line;
  plane: Plane;


  constructor(property: string, line1: Line, line2: Line, plane: Plane) {
    this.notation = '';
    this.length = 0;
    this.property = property;
    this.line1 = line1;
    this.line2 = line2;
    this.plane = plane;
  }

  getString() {
    let elementNotation;
    if (this.line1 != null) {
      elementNotation = this.line1.getNotation();
    }
    else if (this.plane != null) {
      elementNotation = this.plane.getNotation();
    }
    if (this.property === 'contained') {
      return 'on ' + elementNotation;
    }
    else if (this.property === 'intersection') {
      return 'intersection of ' + elementNotation + ' and ' + this.line2.getNotation();
    }
    else if (this.property === 'perpendicular') {
      return 'perpendicular on ' + elementNotation;
    }
  }
}
