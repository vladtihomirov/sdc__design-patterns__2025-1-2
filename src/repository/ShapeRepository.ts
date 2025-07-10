import { Shape } from '../entities/Shape';
import { Specification } from '../specifications/Specification';
import { Comparator } from '../comparators/Comparator';

export interface ShapeRepository<T extends Shape> {
  add(shape: T): void;
  remove(id: string): void;
  findById(id: string): T | undefined;
  findByName(name: string): T[];
  getAll(): T[];
  findBySpecification(spec: Specification<T>): T[];
  sortBy(comparator: Comparator<T>): T[];
}

export class InMemoryShapeRepository<T extends Shape> implements ShapeRepository<T> {
  private shapes: Map<string, T> = new Map();

  add(shape: T): void {
    this.shapes.set(shape.id, shape);
  }

  remove(id: string): void {
    this.shapes.delete(id);
  }

  findById(id: string): T | undefined {
    return this.shapes.get(id);
  }

  findByName(name: string): T[] {
    return Array.from(this.shapes.values()).filter(s => s.name === name);
  }

  getAll(): T[] {
    return Array.from(this.shapes.values());
  }

  findBySpecification(spec: Specification<T>): T[] {
    return Array.from(this.shapes.values()).filter(s => spec.isSatisfiedBy(s));
  }

  sortBy(comparator: Comparator<T>): T[] {
    return Array.from(this.shapes.values()).sort((a, b) => comparator.compare(a, b));
  }
}
