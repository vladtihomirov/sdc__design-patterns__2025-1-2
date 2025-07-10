import { SphereFactory, TriangleFactory } from '../ShapeFactory';
import { Triangle } from '../../entities/Triangle';
import { Sphere } from '../../entities/Sphere';

describe('TriangleFactory', () => {
  let factory: TriangleFactory;

  beforeEach(() => {
    factory = new TriangleFactory();
  });

  describe('createShape', () => {
    it('should create a valid triangle from correct data', () => {
      const data = '0 0 0 3 0 0 0 4 0';
      const triangle = factory.createShape(data);
      expect(triangle)
        .toBeInstanceOf(Triangle);
      expect(typeof triangle?.id)
        .toBe('string');
      expect(triangle?.id.length)
        .toBeGreaterThan(0);
      expect(triangle?.pointA.x)
        .toBe(0);
      expect(triangle?.pointA.y)
        .toBe(0);
      expect(triangle?.pointA.z)
        .toBe(0);
      expect(triangle?.pointB.x)
        .toBe(3);
      expect(triangle?.pointB.y)
        .toBe(0);
      expect(triangle?.pointB.z)
        .toBe(0);
      expect(triangle?.pointC.x)
        .toBe(0);
      expect(triangle?.pointC.y)
        .toBe(4);
      expect(triangle?.pointC.z)
        .toBe(0);
    });

    it('should create a triangle in the XY plane for 6 numbers', () => {
      const data = '0 0 3 0 0 3';
      const triangle = factory.createShape(data);
      expect(triangle)
        .toBeInstanceOf(Triangle);
      expect(triangle?.pointA.x)
        .toBe(0);
      expect(triangle?.pointA.y)
        .toBe(0);
      expect(triangle?.pointA.z)
        .toBe(0);
      expect(triangle?.pointB.x)
        .toBe(3);
      expect(triangle?.pointB.y)
        .toBe(0);
      expect(triangle?.pointB.z)
        .toBe(0);
      expect(triangle?.pointC.x)
        .toBe(0);
      expect(triangle?.pointC.y)
        .toBe(3);
      expect(triangle?.pointC.z)
        .toBe(0);
    });

    it('should return null for invalid numeric data', () => {
      const data = '2a.0 3.0 4.1 5.0 6.0 7.0 8.0 9.0 10.0';
      const triangle = factory.createShape(data);
      expect(triangle)
        .toBeNull();
    });

    it('should handle data with default z coordinate', () => {
      const data = '0 0 0 3 0 0 0 4 0';
      const triangle = factory.createShape(data);
      expect(triangle)
        .toBeInstanceOf(Triangle);
      expect(triangle?.pointC.z)
        .toBe(0);
    });
  });
});

describe('SphereFactory', () => {
  let factory: SphereFactory;

  beforeEach(() => {
    factory = new SphereFactory();
  });

  describe('createShape', () => {
    it('should create a valid sphere from correct data', () => {
      const data = '0 0 0 5';
      const sphere = factory.createShape(data);
      expect(sphere)
        .toBeInstanceOf(Sphere);
      expect(typeof sphere?.id)
        .toBe('string');
      expect(sphere?.id.length)
        .toBeGreaterThan(0);
      expect(sphere?.center.x)
        .toBe(0);
      expect(sphere?.center.y)
        .toBe(0);
      expect(sphere?.center.z)
        .toBe(0);
      expect(sphere?.radius)
        .toBe(5);
    });

    it('should return null for insufficient data', () => {
      const data = '0 0 0';
      const sphere = factory.createShape(data);
      expect(sphere)
        .toBeNull();
    });

    it('should return null for invalid numeric data', () => {
      const data = '2a.0 3.0 4.1 5.0';
      const sphere = factory.createShape(data);
      expect(sphere)
        .toBeNull();
    });

    it('should return null for negative radius', () => {
      const data = '0 0 0 -2';
      const sphere = factory.createShape(data);
      expect(sphere)
        .toBeNull();
    });

    it('should return null for zero radius', () => {
      const data = '0 0 0 0';
      const sphere = factory.createShape(data);
      expect(sphere)
        .toBeNull();
    });

    it('should handle data with custom radius', () => {
      const data = '1 2 3 4';
      const sphere = factory.createShape(data);
      expect(sphere)
        .toBeInstanceOf(Sphere);
      expect(sphere?.center.x)
        .toBe(1);
      expect(sphere?.center.y)
        .toBe(2);
      expect(sphere?.center.z)
        .toBe(3);
      expect(sphere?.radius)
        .toBe(4);
    });
  });
});
