import {
  Before,
  Given,
  Then,
  When,
} from '@cucumber/cucumber';
import { expect } from 'chai';
import { TriangleFactory } from '../../src/factories/ShapeFactory';
import { TriangleValidator } from '../../src/validators/TriangleValidator';
import { Triangle } from '../../src/entities/Triangle';
import { Point } from '../../src/entities/Point';

let triangleFactory: TriangleFactory;
let triangleValidator: TriangleValidator;
let currentTriangle: Triangle | null;
let currentPoints: Point[];
let validationResult: boolean;
let errorMessages: string[];

Before(() => {
  triangleFactory = new TriangleFactory();
  triangleValidator = new TriangleValidator();
  currentTriangle = null;
  currentPoints = [];
  validationResult = false;
  errorMessages = [];
});

Given('I have a triangle factory', () => {
  expect(triangleFactory)
    .to
    .be
    .instanceOf(TriangleFactory);
});

Given('I have a triangle validator', () => {
  expect(triangleValidator)
    .to
    .be
    .instanceOf(TriangleValidator);
});

Given(
  'I have three points A\\({float}, {float}, {float}\\), B\\({float}, {float}, {float}\\), C\\({float}, {float}, {float}\\)',
  (x1, y1, z1, x2, y2, z2, x3, y3, z3) => {
    const pointA = new Point(x1, y1, z1);
    const pointB = new Point(x2, y2, z2);
    const pointC = new Point(x3, y3, z3);
    currentPoints = [pointA, pointB, pointC];
  },
);

When('I create a triangle with id {string} using these points', () => {
  try {
    const [pointA, pointB, pointC] = currentPoints;
    currentTriangle = new Triangle(pointA, pointB, pointC);
    validationResult = triangleValidator.validate(currentTriangle);
    errorMessages = triangleValidator.getErrors();
  } catch (error) {
    currentTriangle = null;
    validationResult = false;
    errorMessages = [error instanceof Error ? error.message : 'Unknown error'];
  }
});

Then('the triangle should be valid', () => {
  expect(validationResult).to.be.true;
  expect(currentTriangle).to.not.be.null;
});

Then('the triangle should not be valid', () => {
  expect(validationResult).to.be.false;
});

Then('the triangle should be right-angled', () => {
  expect(currentTriangle?.isRightAngled()).to.be.true;
});

Then('the triangle should not be right-angled', () => {
  expect(currentTriangle?.isRightAngled()).to.be.false;
});

Then('the triangle should be equilateral', () => {
  expect(currentTriangle?.isEquilateral()).to.be.true;
});

Then('the triangle should not be equilateral', () => {
  expect(currentTriangle?.isEquilateral()).to.be.false;
});

Then('the triangle should be isosceles', () => {
  expect(currentTriangle?.isIsosceles()).to.be.true;
});

Then('the triangle should not be isosceles', () => {
  expect(currentTriangle?.isIsosceles()).to.be.false;
});

Then('the triangle should be acute-angled', () => {
  expect(currentTriangle?.isAcute()).to.be.true;
});

Then('the triangle should not be acute-angled', () => {
  expect(currentTriangle?.isAcute()).to.be.false;
});

Then('the triangle should be obtuse-angled', () => {
  expect(currentTriangle?.isObtuse()).to.be.true;
});

Then('the triangle should not be obtuse-angled', () => {
  expect(currentTriangle?.isObtuse()).to.be.false;
});

Then('the triangle area should be {float}', (expectedArea: number) => {
  expect(currentTriangle?.getArea())
    .to
    .be
    .closeTo(expectedArea, 0.01);
});

Then('the triangle perimeter should be {float}', (expectedPerimeter: number) => {
  expect(currentTriangle?.getPerimeter())
    .to
    .be
    .closeTo(expectedPerimeter, 0.01);
});

Then('I should get an error message about collinear points', () => {
  expect(errorMessages.some((msg) => msg.includes('лежат на одной прямой')))
    .to
    .be
    .true;
});

Then('I should get an error message about invalid sides', () => {
  expect(errorMessages.some((msg) => msg.includes('положительными')))
    .to
    .be
    .true;
});
