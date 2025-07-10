import { ShapeService } from './services/ShapeService';

const main = (): void => {
  const shapeService = new ShapeService();

  try {
    const triangles = shapeService.processTriangleFile('./data/triangles.txt');
    shapeService.analyzeTriangles(triangles);

    const spheres = shapeService.processSphereFile('./data/spheres.txt');
    shapeService.analyzeSpheres(spheres);

  } catch (error) {
    console.error('Ошибка в приложении:', error);
  }
};

if (require.main === module) {
  main();
}
