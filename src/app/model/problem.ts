import {TSMap} from 'typescript-map';

export class Problem {
  userId: number;
  figureName: string;
  unknownProperty: string;
  propertyMap: TSMap<string, number>;

  constructor(userId: number, figureName: string, unknownProperty: string, propertyMap: TSMap<string, number>) {
    this.userId = userId;
    this.figureName = figureName;
    this.unknownProperty = unknownProperty;
    this.propertyMap = propertyMap;
  }
}
