export abstract class Validator<T> {
  public abstract validate(data: T): boolean;

  public abstract getErrors(): string[];
}
