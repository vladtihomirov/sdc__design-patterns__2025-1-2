import { Point } from '../entities/Point';
import { Triangle } from '../entities/Triangle';
import { Sphere } from '../entities/Sphere';

export abstract class ShapeFactory {
  public abstract createShape(data: string): Triangle | Sphere | null;
}

export class TriangleFactory extends ShapeFactory {
  public createShape(data: string): Triangle | null {
    try {
      const parts = data.trim().split(/\s+/).map(p => p.trim());
      if (parts.length === 9) {
        const nums = parts.map(Number);
        if (nums.some((n) => isNaN(n))) return null;
        const [x1, y1, z1, x2, y2, z2, x3, y3, z3] = nums;
        return new Triangle(
          new Point(x1, y1, z1),
          new Point(x2, y2, z2),
          new Point(x3, y3, z3),
        );
      } if (parts.length === 6) {
        const nums = parts.map(Number);
        if (nums.some((n) => isNaN(n))) return null;
        const [x1, y1, x2, y2, x3, y3] = nums;
        return new Triangle(
          new Point(x1, y1, 0),
          new Point(x2, y2, 0),
          new Point(x3, y3, 0),
        );
      } else {
        return null;
      }
    } catch {
      return null;
    }
  }
}

export class SphereFactory extends ShapeFactory {
  public createShape(data: string): Sphere | null {
    try {
      const parts = data.trim().split(/\s+/).map((p) => p.trim());
      if (parts.length !== 4) {
        return null;
      }
      const nums = parts.map(Number);
      if (nums.some((n) => isNaN(n))) return null;
      const [x, y, z, radius] = nums;
      if (radius <= 0) return null;
      const center = new Point(x, y, z);
      return new Sphere(center, radius);
    } catch {
      return null;
    }
  }
}
