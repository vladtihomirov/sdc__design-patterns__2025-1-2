import { Sphere } from '../entities/Sphere';
import { Validator } from './Validator';

export class SphereValidator extends Validator<Sphere> {
  private errors: string[] = [];

  public validate(sphere: Sphere): boolean {
    this.errors = [];

    if (sphere.radius <= 0) {
      this.errors.push('Радиус шара должен быть положительным');
      return false;
    }

    if (!sphere.isValid()) {
      this.errors.push('Некорректные параметры шара');
      return false;
    }

    if (isNaN(sphere.center.x) || isNaN(sphere.center.y) || isNaN(sphere.center.z)) {
      this.errors.push('Координаты центра шара должны быть числами');
      return false;
    }

    return true;
  }

  public getErrors(): string[] {
    return [...this.errors];
  }
}
