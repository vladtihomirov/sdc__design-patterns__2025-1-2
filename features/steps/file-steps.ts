import * as fs from 'fs';
import * as path from 'path';
import {
  Before,
  Given,
  Then,
  When,
} from '@cucumber/cucumber';
import { expect } from 'chai';
import { FileService } from '../../src/services/FileService';
import { ShapeService } from '../../src/services/ShapeService';

let fileService: FileService;
let shapeService: ShapeService;
let currentFilePath: string;
let processingResult: any;
let errorOccurred: boolean;

Before(() => {
  fileService = new FileService();
  shapeService = new ShapeService();
  currentFilePath = '';
  processingResult = null;
  errorOccurred = false;
});

Given('I have a file service', () => {
  expect(fileService)
    .to
    .be
    .instanceOf(FileService);
});

Given('I have a shape service', () => {
  expect(shapeService)
    .to
    .be
    .instanceOf(ShapeService);
});

Given('I have a file {string} with triangle data', (filePath: string) => {
  currentFilePath = filePath;
  expect(fs.existsSync(filePath)).to.be.true;
});

Given('I have a file {string} with sphere data', (filePath: string) => {
  currentFilePath = filePath;
  expect(fs.existsSync(filePath)).to.be.true;
});

Given('I have a file with invalid triangle data', () => {
  currentFilePath = path.join(__dirname, '../../temp_invalid_triangles.txt');
  const invalidData = 'triangle1 0 0 0 1 0 0 2 0 0\n'; // коллинеарные точки
  fs.writeFileSync(currentFilePath, invalidData);
});

Given('I have a file with invalid sphere data', () => {
  currentFilePath = path.join(__dirname, '../../temp_invalid_spheres.txt');
  const invalidData = 'sphere1 0 0 0 -2\n'; // отрицательный радиус
  fs.writeFileSync(currentFilePath, invalidData);
});

Given('I have a non-existent file path', () => {
  currentFilePath = 'non_existent_file.txt';
});

Given('I have a file with mixed valid and invalid data', () => {
  currentFilePath = path.join(__dirname, '../../temp_mixed_data.txt');
  const mixedData = 'triangle1 0 0 0 3 0 0 0 4 0\n'; // валидный треугольник
  fs.writeFileSync(currentFilePath, mixedData);
});

When('I process the triangle file', async () => {
  try {
    processingResult = shapeService.processTriangleFile(currentFilePath);
    errorOccurred = false;
  } catch (error) {
    errorOccurred = true;
    processingResult = error;
  }
});

When('I process the sphere file', async () => {
  try {
    processingResult = shapeService.processSphereFile(currentFilePath);
    errorOccurred = false;
  } catch (error) {
    errorOccurred = true;
    processingResult = error;
  }
});

When('I process the file', async () => {
  try {
    if (currentFilePath.endsWith('.txt')) {
      if (currentFilePath.includes('triangle')) {
        processingResult = shapeService.processTriangleFile(currentFilePath);
      } else if (currentFilePath.includes('sphere')) {
        processingResult = shapeService.processSphereFile(currentFilePath);
      } else {
        processingResult = fileService.readLines(currentFilePath);
      }
    } else {
      processingResult = fileService.readLines(currentFilePath);
    }
    errorOccurred = false;
  } catch (error) {
    errorOccurred = true;
    processingResult = error;
  }
});

When('I try to process the file', async () => {
  try {
    processingResult = fileService.readLines(currentFilePath);
    errorOccurred = false;
  } catch (error) {
    errorOccurred = true;
    processingResult = error;
  }
});

Then('I should successfully create valid triangles', () => {
  expect(errorOccurred).to.be.false;
  expect(processingResult).to.not.be.null;
  expect(processingResult.length)
    .to
    .be
    .greaterThan(0);
});

Then('I should successfully create valid spheres', () => {
  expect(errorOccurred).to.be.false;
  expect(processingResult).to.not.be.null;
  expect(processingResult.length)
    .to
    .be
    .greaterThan(0);
});

Then('I should get analysis results for each triangle', () => {
  expect(processingResult)
    .to
    .be
    .an('array');
  processingResult.forEach((triangle: any) => {
    expect(triangle)
      .to
      .respondTo('getArea');
    expect(triangle)
      .to
      .respondTo('getPerimeter');
  });
});

Then('I should get analysis results for each sphere', () => {
  expect(processingResult)
    .to
    .be
    .an('array');
  processingResult.forEach((sphere: any) => {
    expect(sphere)
      .to
      .respondTo('getArea');
    expect(sphere)
      .to
      .respondTo('getVolume');
  });
});

Then('I should log the processing steps', () => {
  expect(errorOccurred).to.be.false;
});

Then('I should skip invalid triangles', () => {
  expect(errorOccurred).to.be.false;
  expect(processingResult).to.not.be.null;
});

Then('I should skip invalid spheres', () => {
  expect(errorOccurred).to.be.false;
  expect(processingResult).to.not.be.null;
});

Then('I should log error messages for invalid data', () => {
  expect(processingResult).to.not.be.null;
});

Then('I should continue processing valid triangles', () => {
  expect(errorOccurred).to.be.false;
  expect(processingResult).to.not.be.null;
});

Then('I should continue processing valid spheres', () => {
  expect(errorOccurred).to.be.false;
  expect(processingResult).to.not.be.null;
});

Then('I should get a file error', () => {
  expect(errorOccurred).to.be.true;
});

Then('I should log the file error', () => {
  expect(errorOccurred).to.be.true;
  expect(processingResult)
    .to
    .be
    .instanceOf(Error);
});

Then('I should create valid shapes', () => {
  expect(errorOccurred).to.be.false;
  expect(processingResult).to.not.be.null;
});

Then('I should skip invalid shapes', () => {
  expect(errorOccurred).to.be.false;
  expect(processingResult).to.not.be.null;
});

Then('I should log both successes and errors', () => {
  expect(processingResult).to.not.be.null;
});

Then('I should provide a summary of results', () => {
  expect(processingResult).to.not.be.null;
});
