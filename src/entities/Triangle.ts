import { Point } from './Point';
import { Shape } from './Shape';

export class Triangle extends Shape {
  public pointA: Point;
  public pointB: Point;
  public pointC: Point;

  constructor(pointA: Point, pointB: Point, pointC: Point) {
    super('Triangle');
    this.pointA = pointA;
    this.pointB = pointB;
    this.pointC = pointC;
  }

  setPoints(a: Point, b: Point, c: Point): void {
    this.pointA = a;
    this.pointB = b;
    this.pointC = c;
    this.notifyObservers();
  }

  public getArea(): number {
    const {
      pointA,
      pointB,
      pointC,
    } = this;
    return 0.5 * Math.abs(
      (pointA.x * (pointB.y - pointC.y)) +
      (pointB.x * (pointC.y - pointA.y)) +
      (pointC.x * (pointA.y - pointB.y)),
    );
  }

  public getPerimeter(): number {
    const {
      pointA,
      pointB,
      pointC,
    } = this;
    const ab = Math.sqrt(
      (pointA.x - pointB.x) ** 2 +
      (pointA.y - pointB.y) ** 2 +
      (pointA.z - pointB.z) ** 2,
    );
    const bc = Math.sqrt(
      (pointB.x - pointC.x) ** 2 +
      (pointB.y - pointC.y) ** 2 +
      (pointB.z - pointC.z) ** 2,
    );
    const ca = Math.sqrt(
      (pointC.x - pointA.x) ** 2 +
      (pointC.y - pointA.y) ** 2 +
      (pointC.z - pointA.z) ** 2,
    );
    return ab + bc + ca;
  }

  public isValid(): boolean {
    const area = this.getArea();
    const {
      pointA,
      pointB,
      pointC,
    } = this;
    const ab = Math.sqrt(
      (pointA.x - pointB.x) ** 2 +
      (pointA.y - pointB.y) ** 2 +
      (pointA.z - pointB.z) ** 2,
    );
    const bc = Math.sqrt(
      (pointB.x - pointC.x) ** 2 +
      (pointB.y - pointC.y) ** 2 +
      (pointB.z - pointC.z) ** 2,
    );
    const ca = Math.sqrt(
      (pointC.x - pointA.x) ** 2 +
      (pointC.y - pointA.y) ** 2 +
      (pointC.z - pointA.z) ** 2,
    );
    return area > 0 && ab > 0 && bc > 0 && ca > 0;
  }

  public isRightAngled(): boolean {
    const sides = this.getSortedSides();
    const [a, b, c] = sides;
    // Теорема Пифагора
    return Math.abs(a * a + b * b - c * c) < 1e-10;
  }

  public isIsosceles(): boolean {
    const sides = this.getSortedSides();
    return Math.abs(sides[0] - sides[1]) < 1e-10 || Math.abs(sides[1] - sides[2]) < 1e-10;
  }

  public isEquilateral(): boolean {
    const sides = this.getSortedSides();
    const EPS = 1e-3;
    return Math.abs(sides[0] - sides[1]) < EPS && Math.abs(sides[1] - sides[2]) < EPS;
  }

  public isAcute(): boolean {
    const sides = this.getSortedSides();
    const [a, b, c] = sides;
    return a * a + b * b > c * c;
  }

  public isObtuse(): boolean {
    const sides = this.getSortedSides();
    const [a, b, c] = sides;
    return a * a + b * b < c * c;
  }

  private getSideLength(point1: Point, point2: Point): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    const dz = (point2.z ?? 0) - (point1.z ?? 0);
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  private getSortedSides(): number[] {
    const sideA = this.getSideLength(this.pointB, this.pointC);
    const sideB = this.getSideLength(this.pointA, this.pointC);
    const sideC = this.getSideLength(this.pointA, this.pointB);

    return [sideA, sideB, sideC].sort((a, b) => a - b);
  }

  public toString(): string {
    return `Triangle(id=${this.id}, A=${this.pointA}, B=${this.pointB}, C=${this.pointC})`;
  }
}
