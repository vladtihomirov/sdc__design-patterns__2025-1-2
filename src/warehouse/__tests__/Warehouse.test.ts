import { Warehouse } from '../Warehouse';
import { Triangle } from '../../entities/Triangle';
import { Sphere } from '../../entities/Sphere';
import { Point } from '../../entities/Point';

describe('Warehouse', () => {
  let warehouse: Warehouse;
  let triangle: Triangle;
  let sphere: Sphere;

  beforeEach(() => {
    warehouse = Warehouse.getInstance();
    triangle = new Triangle(new Point(0, 0, 0), new Point(3, 0, 0), new Point(0, 4, 0));
    sphere = new Sphere(new Point(0, 0, 0), 5);
    triangle.addObserver(warehouse);
    sphere.addObserver(warehouse);
    triangle.notifyObservers();
    sphere.notifyObservers();
  });

  it('should store and return area, perimeter for triangle', () => {
    expect(warehouse.getArea(triangle.id))
      .toBeCloseTo(triangle.getArea(), 2);
    expect(warehouse.getPerimeter(triangle.id))
      .toBeCloseTo(triangle.getPerimeter(), 2);
  });

  it('should store and return area, volume, perimeter for sphere', () => {
    expect(warehouse.getArea(sphere.id))
      .toBeCloseTo(sphere.getArea(), 2);
    expect(warehouse.getVolume(sphere.id))
      .toBeCloseTo(sphere.getVolume(), 2);
    expect(warehouse.getPerimeter(sphere.id))
      .toBeCloseTo(sphere.getPerimeter(), 2);
  });

  it('should update values when triangle changes', () => {
    triangle.setPoints(new Point(0, 0, 0), new Point(6, 0, 0), new Point(0, 8, 0));
    expect(warehouse.getArea(triangle.id))
      .toBeCloseTo(triangle.getArea(), 2);
    expect(warehouse.getPerimeter(triangle.id))
      .toBeCloseTo(triangle.getPerimeter(), 2);
  });

  it('should update values when sphere changes', () => {
    sphere.setRadius(10);
    expect(warehouse.getArea(sphere.id))
      .toBeCloseTo(sphere.getArea(), 2);
    expect(warehouse.getVolume(sphere.id))
      .toBeCloseTo(sphere.getVolume(), 2);
  });
});
