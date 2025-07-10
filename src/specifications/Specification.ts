export interface Specification<T> {
  isSatisfiedBy(obj: T): boolean;
}

export class ByIdSpecification<T extends { id: string }> implements Specification<T> {
  constructor(private id: string) {
  }

  isSatisfiedBy(obj: T): boolean {
    return obj.id === this.id;
  }
}

export class ByNameSpecification<T extends { name: string }> implements Specification<T> {
  constructor(private name: string) {
  }

  isSatisfiedBy(obj: T): boolean {
    return obj.name === this.name;
  }
}

export class ByCoordinateSpecification<T> implements Specification<T> {
  constructor(private predicate: (obj: T) => boolean) {
  }

  isSatisfiedBy(obj: T): boolean {
    return this.predicate(obj);
  }
}

export class ByAreaRangeSpecification<T extends {
  getArea: () => number
}> implements Specification<T> {
  constructor(private min: number, private max: number) {
  }

  isSatisfiedBy(obj: T): boolean {
    const area = obj.getArea();
    return area >= this.min && area <= this.max;
  }
}

export class ByVolumeRangeSpecification<T extends {
  getVolume: () => number
}> implements Specification<T> {
  constructor(private min: number, private max: number) {
  }

  isSatisfiedBy(obj: T): boolean {
    const volume = obj.getVolume();
    return volume >= this.min && volume <= this.max;
  }
}

export class ByPerimeterRangeSpecification<T extends {
  getPerimeter: () => number
}> implements Specification<T> {
  constructor(private min: number, private max: number) {
  }

  isSatisfiedBy(obj: T): boolean {
    const perimeter = obj.getPerimeter();
    return perimeter >= this.min && perimeter <= this.max;
  }
}

export class ByDistanceRangeSpecification<T extends {
  getDistanceFromOrigin: () => number
}> implements Specification<T> {
  constructor(private min: number, private max: number) {
  }

  isSatisfiedBy(obj: T): boolean {
    const dist = obj.getDistanceFromOrigin();
    return dist >= this.min && dist <= this.max;
  }
}
