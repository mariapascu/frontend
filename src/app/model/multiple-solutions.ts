import {TSMap} from 'typescript-map';

export class MultipleSolutions {
  propertyMap: TSMap<string, number>;

  constructor(propertyMap: TSMap<string, number>) {
    this.propertyMap = propertyMap;
  }
}
