import {Line} from './line';
import {Plane} from './plane';

export class LineProperty {
  notation: string;
  length: number;
  property: string;
  line: Line;
  plane: Plane;


  constructor(property: string, line: Line, plane: Plane) {
    this.notation = '';
    this.length = 0;
    this.property = property;
    this.line = line;
    this.plane = plane;
  }

  getString() {
    let elementNotation;
    if (this.line != null) {
      elementNotation = this.line.getNotation();
    } else if (this.plane != null) {
      elementNotation = this.plane.getNotation();
    }
    if (this.property === 'parallel') {
      return 'parallel to ' + elementNotation;
    } else if (this.property === 'perpendicular') {
      return 'perpendicular on ' + elementNotation;
    } else if (this.property === 'contained') {
      return 'on ' + elementNotation;
    }
  }
}
