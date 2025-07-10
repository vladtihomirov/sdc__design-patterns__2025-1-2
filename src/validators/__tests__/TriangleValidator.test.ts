import { Point } from '../../entities/Point';
import { Triangle } from '../../entities/Triangle';
import { TriangleValidator } from '../TriangleValidator';

describe('TriangleValidator', () => {
  let validator: TriangleValidator;
  let validTriangle: Triangle;
  let degenerateTriangle: Triangle;
  let invalidTriangle: Triangle;

  beforeEach(() => {
    validator = new TriangleValidator();

    const pointA = new Point(0, 0);
    const pointB = new Point(3, 0);
    const pointC = new Point(0, 4);
    validTriangle = new Triangle(pointA, pointB, pointC);

    const degPointA = new Point(0, 0);
    const degPointB = new Point(1, 0);
    const degPointC = new Point(2, 0);
    degenerateTriangle = new Triangle(degPointA, degPointB, degPointC);

    const invPointA = new Point(0, 0);
    const invPointB = new Point(1, 0);
    const invPointC = new Point(0, 0);
    invalidTriangle = new Triangle(invPointA, invPointB, invPointC);
  });

  describe('validate', () => {
    it('should return true for valid triangle', () => {
      const isValid = validator.validate(validTriangle);

      expect(isValid)
        .toBe(true);
      expect(validator.getErrors())
        .toHaveLength(0);
    });

    it('should return false for degenerate triangle', () => {
      const isValid = validator.validate(degenerateTriangle);

      expect(isValid)
        .toBe(false);
      expect(validator.getErrors())
        .toContain('Точки не образуют треугольник (лежат на одной прямой)');
    });

    it('should return false for triangle with zero area', () => {
      const isValid = validator.validate(invalidTriangle);

      expect(isValid)
        .toBe(false);
      expect(validator.getErrors())
        .toContain('Стороны треугольника должны быть положительными');
    });


  });

  describe('getErrors', () => {
    it('should return empty array for valid triangle', () => {
      validator.validate(validTriangle);

      const errors = validator.getErrors();

      expect(errors)
        .toHaveLength(0);
    });

    it('should return error messages for invalid triangle', () => {
      validator.validate(degenerateTriangle);

      const errors = validator.getErrors();

      expect(errors)
        .toHaveLength(1);
      expect(errors[0])
        .toContain('Точки не образуют треугольник (лежат на одной прямой)');
    });

    it('should return copy of errors array', () => {
      validator.validate(degenerateTriangle);
      const originalErrors = validator.getErrors();

      originalErrors.push('test error');
      const newErrors = validator.getErrors();

      expect(newErrors)
        .not
        .toContain('test error');
    });
  });
});
