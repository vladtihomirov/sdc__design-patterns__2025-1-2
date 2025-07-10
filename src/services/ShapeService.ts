import { Triangle } from '../entities/Triangle';
import { Sphere } from '../entities/Sphere';
import { TriangleFactory, SphereFactory } from '../factories/ShapeFactory';
import { TriangleValidator } from '../validators/TriangleValidator';
import { SphereValidator } from '../validators/SphereValidator';
import { FileService } from './FileService';
import { ValidationException } from '../exceptions/GeometricException';

export class ShapeService {
  private readonly fileService: FileService;
  private readonly triangleFactory: TriangleFactory;
  private readonly sphereFactory: SphereFactory;
  private readonly triangleValidator: TriangleValidator;
  private readonly sphereValidator: SphereValidator;

  constructor() {
    this.fileService = new FileService();
    this.triangleFactory = new TriangleFactory();
    this.sphereFactory = new SphereFactory();
    this.triangleValidator = new TriangleValidator();
    this.sphereValidator = new SphereValidator();
  }

  public processTriangleFile(filePath: string): Triangle[] {
    const lines = this.fileService.readLines(filePath);
    const triangles: Triangle[] = [];

    for (const line of lines) {
      try {
        const triangle = this.triangleFactory.createShape(line);
        // DEBUG LOG
        this.fileService.getLogger().info(`[DEBUG] line: '${line}' => triangle:`, triangle);
        if (triangle !== null) {
          const isValid = this.triangleValidator.validate(triangle);
          this.fileService.getLogger().info(`[DEBUG] triangle valid: ${isValid}`);
          if (isValid) {
            triangles.push(triangle);
            this.fileService.getLogger().info(`Создан треугольник: ${triangle}`);
          } else {
            const errors = this.triangleValidator.getErrors();
            this.fileService.getLogger().warn(`Некорректный треугольник: ${errors.join(', ')}`);
          }
        } else {
          this.fileService.getLogger().warn(`Не удалось создать треугольник из строки: ${line}`);
        }
      } catch (error) {
        this.fileService.getLogger().error(`Ошибка при обработке строки: ${line}, ${error}`);
      }
    }

    return triangles;
  }

  public processSphereFile(filePath: string): Sphere[] {
    const lines = this.fileService.readLines(filePath);
    const spheres: Sphere[] = [];

    for (const line of lines) {
      try {
        const sphere = this.sphereFactory.createShape(line);
        if (sphere !== null) {
          const valid = this.sphereValidator.validate(sphere);
          if (valid) {
            spheres.push(sphere);
            this.fileService.getLogger().info(`Создан шар: ${sphere}`);
          } else {
            const errors = this.sphereValidator.getErrors();
            this.fileService.getLogger().warn(`Некорректный шар: ${errors.join(', ')}`);
          }
        } else {
          this.fileService.getLogger().warn(`Не удалось создать шар из строки: ${line}`);
        }
      } catch (error) {
        this.fileService.getLogger().error(`Ошибка при обработке строки: ${line}, ${error}`);
      }
    }

    return spheres;
  }

  public analyzeTriangles(triangles: Triangle[]): void {
    this.fileService.getLogger().info('=== Анализ треугольников ===');

    for (const triangle of triangles) {
      this.fileService.getLogger().info(`Треугольник ${triangle.id}:`);
      this.fileService.getLogger().info(`  Площадь: ${triangle.getArea().toFixed(2)}`);
      this.fileService.getLogger().info(`  Периметр: ${triangle.getPerimeter().toFixed(2)}`);
      this.fileService.getLogger().info(`  Прямоугольный: ${triangle.isRightAngled()}`);
      this.fileService.getLogger().info(`  Равнобедренный: ${triangle.isIsosceles()}`);
      this.fileService.getLogger().info(`  Равносторонний: ${triangle.isEquilateral()}`);
      this.fileService.getLogger().info(`  Остроугольный: ${triangle.isAcute()}`);
      this.fileService.getLogger().info(`  Тупоугольный: ${triangle.isObtuse()}`);
    }
  }

  public analyzeSpheres(spheres: Sphere[]): void {
    this.fileService.getLogger().info('=== Анализ шаров ===');

    for (const sphere of spheres) {
      this.fileService.getLogger().info(`Шар ${sphere.id}:`);
      this.fileService.getLogger().info(`  Площадь поверхности: ${sphere.getArea().toFixed(2)}`);
      this.fileService.getLogger().info(`  Объем: ${sphere.getVolume().toFixed(2)}`);
      this.fileService.getLogger().info(`  Касается координатных плоскостей: ${sphere.touchesCoordinatePlane()}`);
      this.fileService.getLogger().info(`  Соотношение объемов при рассечении: ${sphere.getVolumeRatioAfterPlaneCut().toFixed(2)}`);
    }
  }
}
