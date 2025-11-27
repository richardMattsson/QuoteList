Feature: Account-icon

There is an account-icon on the page and when I click on it I go to the account page. 

Scenario: I visit the page and I see a account-icon and click it to go to the account page.
  Given The homesceen shows a account-icon
  When I click on the account-icon
  Then I go to the account page  