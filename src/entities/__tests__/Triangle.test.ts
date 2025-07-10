import { Point } from '../Point';
import { Triangle } from '../Triangle';

describe('Triangle', () => {
  let validTriangle: Triangle;
  let rightTriangle: Triangle;
  let isoscelesTriangle: Triangle;
  let equilateralTriangle: Triangle;

  beforeEach(() => {
    const pointA = new Point(0, 0);
    const pointB = new Point(3, 0);
    const pointC = new Point(0, 4);
    validTriangle = new Triangle(pointA, pointB, pointC);

    const rightPointA = new Point(0, 0);
    const rightPointB = new Point(3, 0);
    const rightPointC = new Point(0, 4);
    rightTriangle = new Triangle(rightPointA, rightPointB, rightPointC);

    const isoPointA = new Point(0, 0);
    const isoPointB = new Point(2, 0);
    const isoPointC = new Point(1, 1.732);
    isoscelesTriangle = new Triangle(isoPointA, isoPointB, isoPointC);

    const equiPointA = new Point(0, 0);
    const equiPointB = new Point(1, 0);
    const equiPointC = new Point(0.5, Math.sqrt(3) / 2);
    equilateralTriangle = new Triangle(equiPointA, equiPointB, equiPointC);
  });

  describe('constructor', () => {
    it('should create a triangle with given points', () => {
      const pointA = new Point(0, 0);
      const pointB = new Point(1, 0);
      const pointC = new Point(0, 1);

      const triangle = new Triangle(pointA, pointB, pointC);
      expect(typeof triangle.id)
        .toBe('string');
      expect(triangle.id.length)
        .toBeGreaterThan(0);
      expect(triangle.name)
        .toBe('Triangle');
      expect(triangle.pointA)
        .toBe(pointA);
      expect(triangle.pointB)
        .toBe(pointB);
      expect(triangle.pointC)
        .toBe(pointC);
    });
  });

  describe('getArea', () => {
    it('should calculate area of a right triangle', () => {
      const area = validTriangle.getArea();

      expect(area)
        .toBeCloseTo(6, 1);
    });

    it('should calculate area of an equilateral triangle', () => {
      const area = equilateralTriangle.getArea();

      expect(area)
        .toBeCloseTo(Math.sqrt(3) / 4, 3);
    });
  });

  describe('getPerimeter', () => {
    it('should calculate perimeter of a triangle', () => {
      const perimeter = validTriangle.getPerimeter();

      expect(perimeter)
        .toBeCloseTo(12, 1);
    });
  });

  describe('isValid', () => {
    it('should return true for valid triangle', () => {
      const isValid = validTriangle.isValid();

      expect(isValid)
        .toBe(true);
    });

    it('should return false for degenerate triangle', () => {
      const pointA = new Point(0, 0);
      const pointB = new Point(1, 0);
      const pointC = new Point(2, 0);
      const degenerateTriangle = new Triangle(pointA, pointB, pointC);

      const isValid = degenerateTriangle.isValid();

      expect(isValid)
        .toBe(false);
    });
  });

  describe('isRightAngled', () => {
    it('should return true for right triangle', () => {
      const isRight = rightTriangle.isRightAngled();

      expect(isRight)
        .toBe(true);
    });

    it('should return false for non-right triangle', () => {
      const isRight = equilateralTriangle.isRightAngled();

      expect(isRight)
        .toBe(false);
    });
  });

  describe('isIsosceles', () => {
    it('should return true for isosceles triangle', () => {
      const isIso = isoscelesTriangle.isIsosceles();

      expect(isIso)
        .toBe(true);
    });

    it('should return false for scalene triangle', () => {
      const isIso = validTriangle.isIsosceles();

      expect(isIso)
        .toBe(false);
    });
  });

  describe('isEquilateral', () => {
    it('should return true for equilateral triangle', () => {
      const isEqui = equilateralTriangle.isEquilateral();

      expect(isEqui)
        .toBe(true);
    });

    it('should return false for non-equilateral triangle', () => {
      const isEqui = validTriangle.isEquilateral();

      expect(isEqui)
        .toBe(false);
    });
  });

  describe('isAcute', () => {
    it('should return true for acute triangle', () => {
      const isAcute = equilateralTriangle.isAcute();

      expect(isAcute)
        .toBe(true);
    });

    it('should return false for right triangle', () => {
      const isAcute = rightTriangle.isAcute();

      expect(isAcute)
        .toBe(false);
    });
  });

  describe('isObtuse', () => {
    it('should return true for obtuse triangle', () => {
      const pointA = new Point(0, 0);
      const pointB = new Point(1, 0);
      const pointC = new Point(0, 0.5);
      const obtuseTriangle = new Triangle(pointA, pointB, pointC);

      const isObtuse = obtuseTriangle.isObtuse();

      expect(isObtuse)
        .toBe(true);
    });

    it('should return false for acute triangle', () => {
      const isObtuse = equilateralTriangle.isObtuse();

      expect(isObtuse)
        .toBe(false);
    });
  });
});
