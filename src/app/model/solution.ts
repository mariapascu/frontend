export class Solution {
  unknownProperty: string;
  solution: number;
  solutionSteps: Array<Array<string>>;

  constructor(unknownProperty: string, solution: number, solutionSteps: Array<Array<string>>) {
    this.unknownProperty = unknownProperty;
    this.solution = solution;
    this.solutionSteps = solutionSteps;
  }
}
