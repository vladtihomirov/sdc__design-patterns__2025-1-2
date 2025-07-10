Feature: Sphere Operations
  As a geometric application user
  I want to create and analyze spheres
  So that I can understand their properties

  Background:
    Given I have a sphere factory
    And I have a sphere validator

  Scenario: Create a valid sphere at origin
    Given I have a center point at (0, 0, 0)
    And I have a radius of 5
    When I create a sphere using center and radius
    Then the sphere should be valid
    And the sphere surface area should be approximately 314.16
    And the sphere volume should be approximately 523.60
    And the sphere should not touch any coordinate planes
    And the sphere volume ratio when cut should be 1.0

  Scenario: Create a sphere touching coordinate planes
    Given I have a center point at (3, 3, 3)
    And I have a radius of 3
    When I create a sphere using center and radius
    Then the sphere should be valid
    And the sphere should touch coordinate planes
    And the sphere volume ratio when cut should be 1.0

  Scenario: Create a sphere with decimal coordinates
    Given I have a center point at (2.5, 3.1, 4.2)
    And I have a radius of 1.5
    When I create a sphere using center and radius
    Then the sphere should be valid
    And the sphere surface area should be approximately 28.27
    And the sphere volume should be approximately 14.14

  Scenario: Try to create sphere with negative radius
    Given I have a center point at (0, 0, 0)
    And I have a radius of -2
    When I create a sphere using center and radius
    Then the sphere should not be valid
    And I should get an error message about invalid radius

  Scenario: Try to create sphere with zero radius
    Given I have a center point at (0, 0, 0)
    And I have a radius of 0
    When I create a sphere using center and radius
    Then the sphere should not be valid
    And I should get an error message about invalid radius

  Scenario: Create sphere touching XY plane
    Given I have a center point at (0, 0, 5)
    And I have a radius of 5
    When I create a sphere using center and radius
    Then the sphere should be valid
    And the sphere should touch coordinate planes
    And the sphere volume ratio when cut should be 1.0

  Scenario: Create sphere touching YZ plane
    Given I have a center point at (5, 0, 0)
    And I have a radius of 5
    When I create a sphere using center and radius
    Then the sphere should be valid
    And the sphere should touch coordinate planes
    And the sphere volume ratio when cut should be 1.0

  Scenario: Create sphere touching XZ plane
    Given I have a center point at (0, 5, 0)
    And I have a radius of 5
    When I create a sphere using center and radius
    Then the sphere should be valid
    And the sphere should touch coordinate planes
    And the sphere volume ratio when cut should be 1.0
