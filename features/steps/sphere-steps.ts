import {
  Given,
  When,
  Then,
  Before,
} from '@cucumber/cucumber';
import { expect } from 'chai';
import { SphereFactory } from '../../src/factories/ShapeFactory';
import { SphereValidator } from '../../src/validators/SphereValidator';
import { Sphere } from '../../src/entities/Sphere';
import { Point } from '../../src/entities/Point';

let sphereFactory: SphereFactory;
let sphereValidator: SphereValidator;
let currentSphere: Sphere | null;
let currentCenter: Point;
let currentRadius: number;
let validationResult: boolean;
let errorMessages: string[];

Before(() => {
  sphereFactory = new SphereFactory();
  sphereValidator = new SphereValidator();
  currentSphere = null;
  currentCenter = new Point(0, 0, 0);
  currentRadius = 1;
  validationResult = false;
  errorMessages = [];
});

Given('I have a sphere factory', () => {
  expect(sphereFactory).to.be.instanceOf(SphereFactory);
});

Given('I have a sphere validator', () => {
  expect(sphereValidator).to.be.instanceOf(SphereValidator);
});

Given('I have a center point at \\({float}, {float}, {float}\\)', (x: number, y: number, z: number) => {
  currentCenter = new Point(x, y, z);
});

Given('I have a radius of {float}', (radius: number) => {
  currentRadius = radius;
});

When('I create a sphere using center and radius', () => {
  try {
    currentSphere = new Sphere(currentCenter, currentRadius);
    validationResult = sphereValidator.validate(currentSphere);
    errorMessages = sphereValidator.getErrors();
  } catch (error) {
    currentSphere = null;
    validationResult = false;
    errorMessages = [error instanceof Error ? error.message : 'Unknown error'];
  }
});

Then('the sphere should be valid', () => {
  expect(validationResult).to.be.true;
  expect(currentSphere).to.not.be.null;
});

Then('the sphere should not be valid', () => {
  expect(validationResult).to.be.false;
});

Then('the sphere surface area should be approximately {float}', (expectedArea: number) => {
  expect(currentSphere?.getArea()).to.be.closeTo(expectedArea, 0.01);
});

Then('the sphere volume should be approximately {float}', (expectedVolume: number) => {
  expect(currentSphere?.getVolume()).to.be.closeTo(expectedVolume, 0.01);
});

Then('the sphere should not touch any coordinate planes', () => {
  expect(currentSphere?.touchesCoordinatePlane()).to.be.false;
});

Then('the sphere should touch coordinate planes', () => {
  expect(currentSphere?.touchesCoordinatePlane()).to.be.true;
});

Then('the sphere volume ratio when cut should be {float}', (expectedRatio: number) => {
  expect(currentSphere?.getVolumeRatioAfterPlaneCut()).to.be.closeTo(expectedRatio, 0.01);
});

Then('I should get an error message about invalid radius', () => {
  expect(errorMessages.some((msg) => msg.includes('радиус') || msg.includes('положительным'))).to.be.true;
});
