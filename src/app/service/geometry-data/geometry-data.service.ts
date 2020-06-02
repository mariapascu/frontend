import {Injectable} from '@angular/core';

interface GeometricFigureProperty {
  geometricFigure: string;
  geometricFigureProperties: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class GeometryDataService {
  geometricFigures: Array<string>;
  geometricFiguresProperties = new Map<string, Array<string>>();

  constructor() {
    this.geometricFigures = ['rectangular parallelepiped', 'sphere'];
    this.geometricFiguresProperties.set('rectangular parallelepiped', ['length', 'width', 'height', 'total surface', 'base surface', 'lateral surface', 'volume', 'base perimeter']);
  }
}
