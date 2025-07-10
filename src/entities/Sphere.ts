import { Shape } from './Shape';
import { Point } from './Point';

export class Sphere extends Shape {
  public center: Point;
  public radius: number;

  constructor(center: Point, radius: number) {
    super('Sphere');
    this.center = center;
    this.radius = radius;
  }

  setCenter(center: Point): void {
    this.center = center;
    this.notifyObservers();
  }

  setRadius(radius: number): void {
    this.radius = radius;
    this.notifyObservers();
  }

  getArea(): number {
    return 4 * Math.PI * this.radius * this.radius;
  }

  getVolume(): number {
    return (4 / 3) * Math.PI * this.radius ** 3;
  }

  getPerimeter(): number {
    return 0;
  }

  isValid(): boolean {
    return this.radius > 0;
  }

  touchesCoordinatePlane(): boolean {
    const { x, y, z } = this.center;
    return Math.abs(x) === this.radius
      || Math.abs(y) === this.radius
      || Math.abs(z) === this.radius;
  }

  getVolumeRatioAfterPlaneCut(): number {
    if (Math.abs(this.center.z) >= this.radius) {
      return 1;
    }
    const h = this.radius - Math.abs(this.center.z);
    const volumeOfCap = (Math.PI * h * h * (3 * this.radius - h)) / 3;
    const totalVolume = this.getVolume();
    return volumeOfCap / (totalVolume - volumeOfCap);
  }

  toString(): string {
    return `Sphere(id=${this.id}, center=${this.center}, radius=${this.radius})`;
  }
}
