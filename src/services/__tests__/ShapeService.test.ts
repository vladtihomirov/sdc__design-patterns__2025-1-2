import { ShapeService } from '../ShapeService';
import { Triangle } from '../../entities/Triangle';
import { Sphere } from '../../entities/Sphere';
import { Point } from '../../entities/Point';

jest.mock('../FileService');

describe('ShapeService', () => {
  let shapeService: ShapeService;
  let mockFileService: any;

  beforeEach(() => {
    mockFileService = {
      readLines: jest.fn(),
      getLogger: jest.fn(() => ({
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
      })),
    };

    const { FileService } = require('../FileService');
    FileService.mockImplementation(() => mockFileService);

    shapeService = new ShapeService();
  });

  describe('processTriangleFile', () => {
    it('should process valid triangle data', () => {
      const validData = ['0 0 0 3 0 0 0 4 0'];
      mockFileService.readLines.mockReturnValue(validData);
      const triangles = shapeService.processTriangleFile('test.txt');
      expect(triangles).toHaveLength(1);
      expect(triangles[0]).toBeInstanceOf(Triangle);
      expect(typeof triangles[0].id).toBe('string');
      expect(triangles[0].id.length).toBeGreaterThan(0);
    });

    it('should skip invalid triangle data', () => {
      const invalidData = ['2a.0 3.0 4.1 5.0 6.0 7.0 8.0 9.0 10.0'];
      mockFileService.readLines.mockReturnValue(invalidData);
      const triangles = shapeService.processTriangleFile('test.txt');
      expect(triangles).toHaveLength(0);
    });

    it('should skip insufficient triangle data', () => {
      const insufficientData = ['0 0 0 3 0 0'];
      mockFileService.readLines.mockReturnValue(insufficientData);
      const triangles = shapeService.processTriangleFile('test.txt');
      expect(triangles).toHaveLength(0);
    });

    it('should process mixed valid and invalid data', () => {
      const mixedData = [
        '0 0 0 3 0 0 0 4 0',
        '2a.0 3.0 4.1 5.0 6.0 7.0 8.0 9.0 10.0',
        '1 1 0 4 1 0 1 5 0',
      ];
      mockFileService.readLines.mockReturnValue(mixedData);
      const triangles = shapeService.processTriangleFile('test.txt');
      expect(triangles).toHaveLength(2);
      expect(typeof triangles[0].id).toBe('string');
      expect(triangles[0].id.length).toBeGreaterThan(0);
      expect(typeof triangles[1].id).toBe('string');
      expect(triangles[1].id.length).toBeGreaterThan(0);
    });
  });

  describe('processSphereFile', () => {
    it('should process valid sphere data', () => {
      const validData = ['0 0 0 5'];
      mockFileService.readLines.mockReturnValue(validData);
      const spheres = shapeService.processSphereFile('test.txt');
      expect(spheres).toHaveLength(1);
      expect(spheres[0]).toBeInstanceOf(Sphere);
      expect(typeof spheres[0].id).toBe('string');
      expect(spheres[0].id.length).toBeGreaterThan(0);
    });

    it('should skip invalid sphere data', () => {
      const invalidData = ['2a.0 3.0 4.1 5.0'];
      mockFileService.readLines.mockReturnValue(invalidData);
      const spheres = shapeService.processSphereFile('test.txt');
      expect(spheres).toHaveLength(0);
    });

    it('should skip sphere with negative radius', () => {
      const negativeRadiusData = ['0 0 0 -2'];
      mockFileService.readLines.mockReturnValue(negativeRadiusData);
      const spheres = shapeService.processSphereFile('test.txt');
      expect(spheres).toHaveLength(0);
    });

    it('should process mixed valid and invalid sphere data', () => {
      const mixedData = [
        '0 0 0 5',
        '0 0 0 -2',
        '1 2 3 3',
      ];
      mockFileService.readLines.mockReturnValue(mixedData);
      const spheres = shapeService.processSphereFile('test.txt');
      expect(spheres).toHaveLength(2);
      expect(typeof spheres[0].id).toBe('string');
      expect(spheres[0].id.length).toBeGreaterThan(0);
      expect(typeof spheres[1].id).toBe('string');
      expect(spheres[1].id.length).toBeGreaterThan(0);
    });
  });

  describe('analyzeTriangles', () => {
    it('should analyze triangle properties', () => {
      const pointA = new Point(0, 0);
      const pointB = new Point(3, 0);
      const pointC = new Point(0, 4);
      const triangle = new Triangle(pointA, pointB, pointC);
      const triangles = [triangle];

      const mockLogger = {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
      };
      mockFileService.getLogger.mockReturnValue(mockLogger);

      shapeService.analyzeTriangles(triangles);

      expect(mockLogger.info).toHaveBeenCalledWith('=== Анализ треугольников ===');
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Треугольник'));
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Площадь:'));
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Периметр:'));
    });
  });

  describe('analyzeSpheres', () => {
    it('should analyze sphere properties', () => {
      const center = new Point(0, 0, 0);
      const sphere = new Sphere(center, 5);
      const spheres = [sphere];

      const mockLogger = {
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
      };
      mockFileService.getLogger.mockReturnValue(mockLogger);

      shapeService.analyzeSpheres(spheres);

      expect(mockLogger.info).toHaveBeenCalledWith('=== Анализ шаров ===');
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Шар'));
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Площадь поверхности:'));
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Объем:'));
    });
  });
});
