import {TSMap} from 'typescript-map';

export class Problem {
  problemId: number;
  userId: number;
  shapeName: string;
  unknownProperty: string;
  propertyMap: TSMap<string, number>;

  constructor(problemId: number, userId: number, shapeName: string, unknownProperty: string, propertyMap: TSMap<string, number>) {
    this.userId = userId;
    this.shapeName = shapeName;
    this.unknownProperty = unknownProperty;
    this.propertyMap = propertyMap;
  }
}
