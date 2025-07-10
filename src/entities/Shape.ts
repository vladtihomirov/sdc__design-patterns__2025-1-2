import { v4 as uuidv4 } from 'uuid';
import { Observable, Observer } from '../observer/Observer';

export abstract class Shape implements Observable<Shape> {
  public readonly id: string;
  public readonly name: string;
  private observers: Observer<Shape>[] = [];

  protected constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }

  addObserver(observer: Observer<Shape>): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer<Shape>): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  public abstract getArea(): number;

  public abstract getPerimeter(): number;

  public abstract isValid(): boolean;

  public toString(): string {
    return `${this.name}(id=${this.id})`;
  }
}
