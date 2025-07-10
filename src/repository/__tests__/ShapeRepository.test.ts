import { InMemoryShapeRepository } from '../ShapeRepository';
import { Triangle } from '../../entities/Triangle';
import { Point } from '../../entities/Point';
import { ByIdSpecification, ByAreaRangeSpecification } from '../../specifications/Specification';
import { IdComparator, NameComparator, FirstPointXComparator } from '../../comparators/Comparator';

describe('InMemoryShapeRepository', () => {
  let repo: InMemoryShapeRepository<Triangle>;
  let triangle1: Triangle;
  let triangle2: Triangle;

  beforeEach(() => {
    repo = new InMemoryShapeRepository<Triangle>();
    triangle1 = new Triangle(new Point(0, 0, 0), new Point(3, 0, 0), new Point(0, 4, 0));
    triangle2 = new Triangle(new Point(1, 1, 0), new Point(4, 1, 0), new Point(1, 5, 0));
    repo.add(triangle1);
    repo.add(triangle2);
  });

  it('should add and find by id', () => {
    expect(repo.findById(triangle1.id)).toBe(triangle1);
    expect(repo.findById(triangle2.id)).toBe(triangle2);
  });

  it('should remove by id', () => {
    repo.remove(triangle1.id);
    expect(repo.findById(triangle1.id)).toBeUndefined();
  });

  it('should find by name', () => {
    expect(repo.findByName('Triangle').length).toBe(2);
  });

  it('should find by specification', () => {
    const spec = new ByIdSpecification<Triangle>(triangle1.id);
    expect(repo.findBySpecification(spec)).toEqual([triangle1]);
    const areaSpec = new ByAreaRangeSpecification<Triangle>(5, 7);
    expect(repo.findBySpecification(areaSpec).length).toBeGreaterThan(0);
  });

  it('should sort by id', () => {
    const sorted = repo.sortBy(new IdComparator<Triangle>());
    expect(sorted[0].id <= sorted[1].id).toBe(true);
  });

  it('should sort by name', () => {
    const sorted = repo.sortBy(new NameComparator<Triangle>());
    expect(sorted.length).toBe(2);
  });

  it('should sort by first point x', () => {
    const sorted = repo.sortBy(new FirstPointXComparator<Triangle>());
    expect(sorted[0].pointA.x <= sorted[1].pointA.x).toBe(true);
  });
});
