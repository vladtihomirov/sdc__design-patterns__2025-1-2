export interface Comparator<T> {
  compare(a: T, b: T): number;
}

export class IdComparator<T extends { id: string }> implements Comparator<T> {
  compare(a: T, b: T): number {
    return a.id.localeCompare(b.id);
  }
}

export class NameComparator<T extends { name: string }> implements Comparator<T> {
  compare(a: T, b: T): number {
    return a.name.localeCompare(b.name);
  }
}

export class FirstPointXComparator<T extends { pointA: { x: number } }> implements Comparator<T> {
  compare(a: T, b: T): number {
    return a.pointA.x - b.pointA.x;
  }
}

export class FirstPointYComparator<T extends { pointA: { y: number } }> implements Comparator<T> {
  compare(a: T, b: T): number {
    return a.pointA.y - b.pointA.y;
  }
}

export class FirstPointZComparator<T extends { pointA: { z: number } }> implements Comparator<T> {
  compare(a: T, b: T): number {
    return a.pointA.z - b.pointA.z;
  }
} 