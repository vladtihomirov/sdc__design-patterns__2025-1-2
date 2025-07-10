# Geometric Shapes Application

Приложение для работы с геометрическими фигурами (треугольники и сферы) на TypeScript с использованием паттернов проектирования.

### Установка зависимостей
```bash
npm install
```

### Запуск приложения
```bash
npm start
```

### Запуск тестов
```bash
npm run test
npm run test:bdd
```

### Проверка кода линтером
```bash
npm run lint
```

## Примеры использования

### Создание треугольника
```typescript
import { TriangleFactory } from './factories/TriangleFactory';
import { Point } from './entities/Point';

const factory = new TriangleFactory();
const pointA = new Point(0, 0, 0);
const pointB = new Point(3, 0, 0);
const pointC = new Point(0, 4, 0);

const triangle = factory.createShape('triangle1', [pointA, pointB, pointC]);
console.log(`Площадь: ${triangle.getArea()}`);
console.log(`Периметр: ${triangle.getPerimeter()}`);
```

### Создание сферы
```typescript
import { SphereFactory } from './factories/SphereFactory';
import { Point } from './entities/Point';

const factory = new SphereFactory();
const center = new Point(0, 0, 0);
const radius = 5;

const sphere = factory.createShape('sphere1', [center, radius]);
console.log(`Площадь поверхности: ${sphere.getSurfaceArea()}`);
console.log(`Объем: ${sphere.getVolume()}`);
```

## Тестирование

Проект включает полный набор тестов для всех компонентов:

### Unit тесты (Jest)
- Тесты сущностей (Point, Triangle, Sphere)
- Тесты фабрик
- Тесты валидаторов
- Тесты сервисов

Запуск unit тестов:
```bash
npm test
```

### BDD тесты (Cucumber)
Проект также включает BDD (Behavior Driven Development) тесты с использованием Cucumber:

- `features/triangles.feature` - тесты для треугольников
- `features/spheres.feature` - тесты для сфер
- `features/file-processing.feature` - тесты обработки файлов

Запуск BDD тестов:
```bash
npm run test:bdd
```

BDD тесты описывают поведение системы в терминах пользовательских сценариев и обеспечивают:
- Проверку создания различных типов треугольников
- Проверку создания сфер с разными параметрами
- Тестирование обработки файлов с валидными и невалидными данными
- Проверку обработки ошибок

## Логирование

Приложение использует библиотеку Pino для логирования:
- Информационные сообщения о создании фигур
- Предупреждения о некорректных данных
- Ошибки валидации

## Обработка ошибок

Реализованы пользовательские исключения:
- `GeometricException` - базовое исключение
- `ValidationException` - ошибки валидации
- `FileException` - ошибки работы с файлами

## Формат данных

### Треугольники (triangles.txt)
```
0 0 0 3 0 0 0 4 0
1 1 0 4 1 0 1 5 0
```

### Сферы (spheres.txt)
```
0 0 0 5
1 2 3 3
```

## Технологии

- **TypeScript** - основной язык разработки
- **Jest** - фреймворк для тестирования
- **ESLint** - линтер кода
- **Pino** - библиотека логирования
