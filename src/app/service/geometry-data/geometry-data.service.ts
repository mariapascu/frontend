import {Injectable} from '@angular/core';

interface GeometricFigureProperty {
  geometricFigure: string;
  geometricFigureProperties: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class GeometryDataService {
  geometricShapes: Array<string>;
  geometricShapesProperties = new Map<string, Array<string>>();

  constructor() {
    this.geometricShapes = ['rectangular parallelepiped', 'sphere', 'cube', 'cylinder', 'regular tetrahedron'];
    this.geometricShapesProperties.set('rectangular parallelepiped', ['length', 'width', 'height', 'total surface', 'base surface', 'lateral surface', 'volume', 'base perimeter']);
    this.geometricShapesProperties.set('cube', ['edge', 'lateral surface', 'total surface', 'volume', 'face diagonal', 'cube diagonal', 'base perimeter', 'base surface']);
    this.geometricShapesProperties.set('sphere', ['radius', 'diameter', 'surface area', 'volume']);
    this.geometricShapesProperties.set('cylinder', ['radius', 'height', 'base surface', 'total surface', 'volume', 'lateral surface']);
    this.geometricShapesProperties.set('regular tetrahedron', ['edge', 'height', 'total surface', 'face surface', 'volume']);
  }
}
