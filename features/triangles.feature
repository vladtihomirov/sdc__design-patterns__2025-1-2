Feature: Triangle Operations
  As a geometric application user
  I want to create and analyze triangles
  So that I can understand their properties

  Background:
    Given I have a triangle factory
    And I have a triangle validator

  Scenario: Create a valid right triangle
    Given I have three points A(0, 0, 0), B(3, 0, 0), C(0, 4, 0)
    When I create a triangle using these points
    Then the triangle should be valid
    And the triangle should be right-angled
    And the triangle should not be equilateral
    And the triangle should not be isosceles
    And the triangle should not be obtuse-angled
    And the triangle area should be 6.0
    And the triangle perimeter should be 12.0

  Scenario: Create an equilateral triangle
    Given I have three points A(0, 0, 0), B(1, 0, 0), C(0.5, 0.866, 0)
    When I create a triangle using these points
    Then the triangle should be valid
    And the triangle should not be right-angled
    And the triangle should be equilateral
    And the triangle should be isosceles
    And the triangle should be acute-angled
    And the triangle should not be obtuse-angled

  Scenario: Create an isosceles triangle
    Given I have three points A(0, 0, 0), B(2, 0, 0), C(1, 2, 0)
    When I create a triangle using these points
    Then the triangle should be valid
    And the triangle should not be right-angled
    And the triangle should not be equilateral
    And the triangle should be isosceles
    And the triangle should be acute-angled
    And the triangle should not be obtuse-angled

  Scenario: Create an obtuse triangle
    Given I have three points A(0, 0, 0), B(2, 0, 0), C(0.5, 0.4, 0)
    When I create a triangle using these points
    Then the triangle should be valid
    And the triangle should not be right-angled
    And the triangle should not be equilateral
    And the triangle should not be isosceles
    And the triangle should not be acute-angled
    And the triangle should be obtuse-angled

  Scenario: Try to create invalid triangle with collinear points
    Given I have three points A(0, 0, 0), B(1, 0, 0), C(2, 0, 0)
    When I create a triangle using these points
    Then the triangle should not be valid
    And I should get an error message about collinear points

  Scenario: Try to create invalid triangle with duplicate points
    Given I have three points A(0, 0, 0), B(0, 0, 0), C(1, 1, 0)
    When I create a triangle using these points
    Then the triangle should not be valid
    And I should get an error message about invalid sides
