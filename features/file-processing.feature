Feature: File Processing
  As a user
  I want to process files with geometric data
  So that I can create and analyze shapes in bulk

  Background:
    Given I have a file service
    And I have a shape service

  Scenario: Handle invalid triangle data in file
    Given I have a file with invalid triangle data
    When I process the triangle file
    Then I should skip invalid triangles
    And I should log error messages for invalid data
    And I should continue processing valid triangles

  Scenario: Handle invalid sphere data in file
    Given I have a file with invalid sphere data
    When I process the sphere file
    Then I should skip invalid spheres
    And I should log error messages for invalid data
    And I should continue processing valid spheres

  Scenario: Handle missing file
    Given I have a non-existent file path
    When I try to process the file
    Then I should get a file error
    And I should log the file error

  Scenario: Process mixed valid and invalid data
    Given I have a file with mixed valid and invalid data
    When I process the file
    Then I should create valid shapes
    And I should skip invalid shapes
    And I should log both successes and errors
    And I should provide a summary of results 