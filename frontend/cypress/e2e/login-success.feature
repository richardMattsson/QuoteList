Feature: Login success

On the account page there is a login form and when I type the correct info and click login I am succefully logged in.

Scenario: I am on the account page and want to log in on my account
  Given I have a registered account and fill the correct input 
  When I click on the login button
  Then I successfully log in and return to the home page