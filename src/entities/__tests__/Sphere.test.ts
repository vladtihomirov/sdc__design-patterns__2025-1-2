import { Point } from '../Point';
import { Sphere } from '../Sphere';

describe('Sphere', () => {
  let validSphere: Sphere;
  let unitSphere: Sphere;
  let touchingSphere: Sphere;

  beforeEach(() => {
    const center = new Point(0, 0, 0);
    validSphere = new Sphere(center, 5);

    const unitCenter = new Point(0, 0, 0);
    unitSphere = new Sphere(unitCenter, 1);

    const touchingCenter = new Point(5, 0, 0);
    touchingSphere = new Sphere(touchingCenter, 5);
  });

  describe('constructor', () => {
    it('should create a sphere with given center and radius', () => {
      const center = new Point(1, 2, 3);
      const radius = 4;

      const sphere = new Sphere(center, radius);

      expect(typeof sphere.id)
        .toBe('string');
      expect(sphere.id.length)
        .toBeGreaterThan(0);
      expect(sphere.name)
        .toBe('Sphere');
      expect(sphere.center)
        .toBe(center);
      expect(sphere.radius)
        .toBe(radius);
    });
  });

  describe('getArea', () => {
    it('should calculate surface area of a sphere', () => {
      const area = validSphere.getArea();

      expect(area)
        .toBeCloseTo(314.16, 2);
    });

    it('should calculate surface area of unit sphere', () => {
      const area = unitSphere.getArea();

      expect(area)
        .toBeCloseTo(12.57, 2);
    });
  });

  describe('getVolume', () => {
    it('should calculate volume of a sphere', () => {
      const volume = validSphere.getVolume();

      expect(volume)
        .toBeCloseTo(523.60, 2);
    });

    it('should calculate volume of unit sphere', () => {
      const volume = unitSphere.getVolume();

      expect(volume)
        .toBeCloseTo(4.19, 2);
    });
  });

  describe('getPerimeter', () => {
    it('should return 0 for sphere perimeter', () => {
      const perimeter = validSphere.getPerimeter();

      expect(perimeter)
        .toBe(0);
    });
  });

  describe('isValid', () => {
    it('should return true for valid sphere', () => {
      const isValid = validSphere.isValid();

      expect(isValid)
        .toBe(true);
    });

    it('should return false for sphere with negative radius', () => {
      const center = new Point(0, 0, 0);
      const invalidSphere = new Sphere(center, -1);

      const isValid = invalidSphere.isValid();

      expect(isValid)
        .toBe(false);
    });

    it('should return false for sphere with zero radius', () => {
      const center = new Point(0, 0, 0);
      const zeroSphere = new Sphere(center, 0);

      const isValid = zeroSphere.isValid();

      expect(isValid)
        .toBe(false);
    });
  });

  describe('touchesCoordinatePlane', () => {
    it('should return true when sphere touches coordinate plane', () => {
      const touches = touchingSphere.touchesCoordinatePlane();

      expect(touches)
        .toBe(true);
    });

    it('should return false when sphere does not touch coordinate plane', () => {
      const touches = validSphere.touchesCoordinatePlane();

      expect(touches)
        .toBe(false);
    });

    it('should return true when sphere touches y-axis plane', () => {
      const center = new Point(0, 5, 0);
      const yTouchingSphere = new Sphere(center, 5);

      const touches = yTouchingSphere.touchesCoordinatePlane();

      expect(touches)
        .toBe(true);
    });

    it('should return true when sphere touches z-axis plane', () => {
      const center = new Point(0, 0, 5);
      const zTouchingSphere = new Sphere(center, 5);

      const touches = zTouchingSphere.touchesCoordinatePlane();

      expect(touches)
        .toBe(true);
    });
  });

  describe('getVolumeRatioAfterPlaneCut', () => {
    it('should return 1 when sphere does not intersect with plane', () => {
      const center = new Point(10, 0, 0);
      const farSphere = new Sphere(center, 5);

      const ratio = farSphere.getVolumeRatioAfterPlaneCut();

      expect(ratio)
        .toBe(1);
    });

    it('should return valid ratio when sphere intersects with plane', () => {
      const center = new Point(0, 0, 2);
      const intersectingSphere = new Sphere(center, 5);

      const ratio = intersectingSphere.getVolumeRatioAfterPlaneCut();

      expect(ratio)
        .toBeGreaterThan(0);
      expect(ratio)
        .toBeLessThan(1);
    });
  });

  describe('toString', () => {
    it('should return string representation of the sphere', () => {
      const center = new Point(1, 2, 3);
      const sphere = new Sphere(center, 4);

      const result = sphere.toString();

      expect(result)
        .toContain('Sphere(id=');
      expect(result)
        .toContain('center=');
      expect(result)
        .toContain('radius=4');
    });
  });
});
