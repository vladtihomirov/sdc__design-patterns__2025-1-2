export class GeometricException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeometricException';
  }
}

export class InvalidShapeException extends GeometricException {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidShapeException';
  }
}

export class ValidationException extends GeometricException {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationException';
  }
}

export class FileReadException extends GeometricException {
  constructor(message: string) {
    super(message);
    this.name = 'FileReadException';
  }
}
