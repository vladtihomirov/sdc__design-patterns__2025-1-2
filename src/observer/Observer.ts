export interface Observer<T> {
  update(subject: T): void;
}

export interface Observable<T> {
  addObserver(observer: Observer<T>): void;
  removeObserver(observer: Observer<T>): void;
  notifyObservers(): void;
}
