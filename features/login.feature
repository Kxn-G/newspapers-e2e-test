

   
Feature: Newspaper Reader Login

  Scenario: Successful login starting from the homepage
    Given the user is on the homepage of the newspaper website
    When the user navigates to the login page
    And the user enters valid credentials
    And the user clicks the "Login" button
    Then the user should be redirected to the homepage
   

  Scenario: Login attempt with invalid credentials starting from the homepage
    Given the user is on the homepage of the newspaper website
    When the user navigates to the login page
    And the user enters invalid credentials
    And the user clicks the "Login" button
    Then the user should see an error message saying There is a problem with your account

 
