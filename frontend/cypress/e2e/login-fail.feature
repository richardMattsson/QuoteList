Feature: Login denial

On the account page there is a login form and when I type the incorrect info and click login I am shown a error message.

Scenario: I am on the account page and type the wrong input i get a error message 
  Given I fill the incorrect information in the input fields 
  When I click on the login button
  Then I dont get logged in and being given a error message