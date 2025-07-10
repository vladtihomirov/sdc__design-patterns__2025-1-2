import { Triangle } from '../entities/Triangle';
import { Validator } from './Validator';

export class TriangleValidator extends Validator<Triangle> {
  private errors: string[] = [];

  public validate(triangle: Triangle): boolean {
    this.errors = [];

    if (
      triangle.pointA.x === triangle.pointB.x && triangle.pointA.y === triangle.pointB.y &&
      triangle.pointA.x === triangle.pointC.x && triangle.pointA.y === triangle.pointC.y
    ) {
      this.errors.push('Стороны треугольника должны быть положительными');
      return false;
    }

    const sides = this.getSortedSides(triangle);
    const [a, b, c] = sides;

    if (a <= 0 || b <= 0 || c <= 0) {
      this.errors.push('Стороны треугольника должны быть положительными');
      return false;
    }

    if (a + b < c) {
      this.errors.push('Нарушено неравенство треугольника');
      return false;
    }

    if (!triangle.isValid()) {
      this.errors.push('Точки не образуют треугольник (лежат на одной прямой)');
      return false;
    }

    return true;
  }

  public getErrors(): string[] {
    return [...this.errors];
  }

  private getSortedSides(triangle: Triangle): number[] {
    const sideA = this.getSideLength(triangle.pointB, triangle.pointC);
    const sideB = this.getSideLength(triangle.pointA, triangle.pointC);
    const sideC = this.getSideLength(triangle.pointA, triangle.pointB);

    return [sideA, sideB, sideC].sort((a, b) => a - b);
  }

  private getSideLength(point1: any, point2: any): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
