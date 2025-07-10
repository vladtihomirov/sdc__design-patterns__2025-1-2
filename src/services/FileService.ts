import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import pino from 'pino';
import { FileReadException } from '../exceptions/GeometricException';

export class FileService {
  private readonly logger: pino.Logger;

  constructor() {
    this.logger = pino({
      level: 'info',
    });
  }

  public readLines(filePath: string): string[] {
    try {
      const absolutePath = resolve(filePath);
      this.logger.info(`Чтение файла: ${absolutePath}`);

      if (!existsSync(absolutePath)) {
        throw new FileReadException(`Файл не найден: ${absolutePath}`);
      }

      const content = readFileSync(absolutePath, 'utf-8');
      const lines = content.split('\n').filter((line: string) => line.trim() !== '');

      this.logger.info(`Прочитано ${lines.length} строк из файла`);
      return lines;
    } catch (error) {
      this.logger.error(`Ошибка при чтении файла: ${error}`);
      throw new FileReadException(`Не удалось прочитать файл: ${error}`);
    }
  }

  public getLogger(): pino.Logger {
    return this.logger;
  }
} 