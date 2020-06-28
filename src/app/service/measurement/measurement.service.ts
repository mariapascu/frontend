import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor() {
  }

  getMeasurement(property: string): string {
    if (property === 'length' || property === 'width' || property === 'height' || property === 'edge' ||
      property === 'base perimeter' || property === 'face diagonal' || property === 'cube diagonal' ||
      property === 'radius' || property === 'diameter') {
      return 'cm';
    } else if (property === 'base surface' || property === 'lateral surface' || property === 'total surface' ||
      property === 'surface area' || property === 'face surface') {
      return 'cm^2';
    } else if (property === 'volume') {
      return 'cm^3';
    }
    return '';
  }
}
