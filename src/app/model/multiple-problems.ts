import {TSMap} from 'typescript-map';

export class MultipleProblems {
  shapeName: string;
  unknownProperties: Array<string>;
  propertyMap: TSMap<string, number>;

  constructor(shapeName: string, unknownProperties: Array<string>, propertyMap: TSMap<string, number>) {
    this.shapeName = shapeName;
    this.unknownProperties = unknownProperties;
    this.propertyMap = propertyMap;
  }
}
