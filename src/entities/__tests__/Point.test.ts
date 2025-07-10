import { Point } from '../Point';

describe('Point', () => {
  describe('constructor', () => {
    it('should create a point with correct coordinates', () => {
      const x = 1;
      const y = 2;
      const z = 3;
      const point = new Point(x, y, z);
      expect(point.x)
        .toBe(x);
      expect(point.y)
        .toBe(y);
      expect(point.z)
        .toBe(z);
      expect(typeof point.id)
        .toBe('string');
      expect(point.id.length)
        .toBeGreaterThan(0);
    });

    it('should create a point with default z=0', () => {
      const x = 5;
      const y = 6;
      const point = new Point(x, y);
      expect(point.x)
        .toBe(x);
      expect(point.y)
        .toBe(y);
      expect(point.z)
        .toBe(0);
      expect(typeof point.id)
        .toBe('string');
      expect(point.id.length)
        .toBeGreaterThan(0);
    });
  });
});
