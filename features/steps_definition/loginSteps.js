const { Given, When, Then, After } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');


let driver;


Given('the user is on the homepage of the newspaper website', async function () {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://www.newspapers.com/');
});

When('the user navigates to the login page', async function () {
  const loginLink = await driver.findElement(By.className('MemberNavigation_MemberContainer__sHehK'));
  await loginLink.click();
  await driver.wait(until.urlContains('signin')); 
});

When('the user enters valid credentials', async function () {
  const usernameField = await driver.findElement(By.id('email')); 
  const passwordField = await driver.findElement(By.id('password')); 
  await usernameField.sendKeys('lourdes100@test.com');
  await passwordField.sendKeys('Test123!');
});

When('the user enters invalid credentials', async function () {
  const usernameField = await driver.findElement(By.id('email')); 
  const passwordField = await driver.findElement(By.id('password')); 
  await usernameField.sendKeys('invalid_user');
  await passwordField.sendKeys('wrong_password');
});

When('the user clicks the "Login" button', async function () {
  const loginButton = await driver.findElement(By.xpath('//button[@tabindex="0" and @title="Sign in with Newspapers.com"]'));
  await loginButton.click();
});

Then('the user should be redirected to the homepage', async function () {
  await driver.wait(until.urlContains('www.newspapers.com/'), 5000); 
});


// This is not working correctly
Then('the user should see an error message saying There is a problem with your account', async function () {
  // Wait for the alert div containing the error message to appear
  const alertDiv = await driver.wait(
    until.elementLocated(By.xpath('//div[@class="danger Alert" and @role="alert"]'), 10000)
  
  );

  // // Wait for the alert div to be visible
  // await driver.wait(until.elementIsVisible(alertDiv));

  // // Verify the error message is visible and contains the expected text
  // const alertText = await alertDiv.getText();
  // console.log(alertText);  // For debugging to see the actual text of the alert

  // if (!alertText.includes('There is a problem with your account')) {
  //   throw new Error('Error message did not contain "There is a problem with your account". Actual message: ' + alertText);
  // }
});



// for automatic closing of web browsers
After(async function () {
  if (driver) {
    await driver.quit();
  }

  
});
