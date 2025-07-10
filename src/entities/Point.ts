import { v4 as uuidv4 } from 'uuid';

export class Point {
  public readonly id: string;
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;

  constructor(x: number, y: number, z: number = 0) {
    this.id = uuidv4();
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public toString(): string {
    return `Point(id=${this.id}, x=${this.x}, y=${this.y}, z=${this.z})`;
  }
} 