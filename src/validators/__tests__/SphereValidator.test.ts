import { Point } from '../../entities/Point';
import { Sphere } from '../../entities/Sphere';
import { SphereValidator } from '../SphereValidator';

describe('SphereValidator', () => {
  let validator: SphereValidator;
  let validSphere: Sphere;
  let negativeRadiusSphere: Sphere;
  let zeroRadiusSphere: Sphere;

  beforeEach(() => {
    validator = new SphereValidator();

    // given
    const center = new Point(0, 0, 0);
    validSphere = new Sphere(center, 5);
    negativeRadiusSphere = new Sphere(center, -1);
    zeroRadiusSphere = new Sphere(center, 0);
  });

  describe('validate', () => {
    it('should return true for valid sphere', () => {
      const isValid = validator.validate(validSphere);

      expect(isValid)
        .toBe(true);
      expect(validator.getErrors())
        .toHaveLength(0);
    });

    it('should return false for sphere with negative radius', () => {
      const isValid = validator.validate(negativeRadiusSphere);

      expect(isValid)
        .toBe(false);
      expect(validator.getErrors())
        .toContain('Радиус шара должен быть положительным');
    });

    it('should return false for sphere with zero radius', () => {
      const isValid = validator.validate(zeroRadiusSphere);

      expect(isValid)
        .toBe(false);
      expect(validator.getErrors())
        .toContain('Радиус шара должен быть положительным');
    });

    it('should return false for sphere with invalid center coordinates', () => {
      const invalidCenter = new Point(NaN, 0, 0);
      const invalidSphere = new Sphere(invalidCenter, 5);

      const isValid = validator.validate(invalidSphere);

      expect(isValid)
        .toBe(false);
      expect(validator.getErrors())
        .toContain('Координаты центра шара должны быть числами');
    });

    it('should return false for sphere with multiple invalid coordinates', () => {
      const invalidCenter = new Point(NaN, Infinity, 0);
      const invalidSphere = new Sphere(invalidCenter, 5);

      const isValid = validator.validate(invalidSphere);

      expect(isValid)
        .toBe(false);
      expect(validator.getErrors())
        .toContain('Координаты центра шара должны быть числами');
    });
  });

  describe('getErrors', () => {
    it('should return empty array for valid sphere', () => {
      validator.validate(validSphere);

      const errors = validator.getErrors();

      expect(errors)
        .toHaveLength(0);
    });

    it('should return error messages for invalid sphere', () => {
      validator.validate(negativeRadiusSphere);

      const errors = validator.getErrors();

      expect(errors)
        .toHaveLength(1);
      expect(errors[0])
        .toContain('Радиус шара должен быть положительным');
    });

    it('should return copy of errors array', () => {
      validator.validate(negativeRadiusSphere);
      const originalErrors = validator.getErrors();

      originalErrors.push('test error');
      const newErrors = validator.getErrors();

      expect(newErrors)
        .not
        .toContain('test error');
    });

    it('should clear errors on new validation', () => {
      validator.validate(negativeRadiusSphere);
      expect(validator.getErrors())
        .toHaveLength(1);

      validator.validate(validSphere);

      expect(validator.getErrors())
        .toHaveLength(0);
    });
  });
});
