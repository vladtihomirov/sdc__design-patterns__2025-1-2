import { Shape } from '../entities/Shape';
import { Observer } from '../observer/Observer';

export class Warehouse implements Observer<Shape> {
  private static instance: Warehouse;
  private areaMap: Map<string, number> = new Map();
  private volumeMap: Map<string, number> = new Map();
  private perimeterMap: Map<string, number> = new Map();

  private constructor() {
  }

  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  public update(shape: Shape): void {
    this.areaMap.set(shape.id, shape.getArea?.() ?? 0);
    if (typeof (shape as any).getVolume === 'function') {
      this.volumeMap.set(shape.id, (shape as any).getVolume());
    }
    if (typeof shape.getPerimeter === 'function') {
      this.perimeterMap.set(shape.id, (shape as any).getPerimeter());
    }
  }

  public getArea(id: string): number | undefined {
    return this.areaMap.get(id);
  }

  public getVolume(id: string): number | undefined {
    return this.volumeMap.get(id);
  }

  public getPerimeter(id: string): number | undefined {
    return this.perimeterMap.get(id);
  }
}
