const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../pageobjects/LoginPage');
const CatalogScreen = require('../pageobjects/CatalogScreen');
const LeftSideMenuScreen = require('../pageobjects/LeftSideMenuScreen');
const chai = require('chai');
const expect = chai.expect;

Given('the user opens the application', async () => {
  await LoginPage.openApp();  // Launch the app
});

When('the user enters {string} and {string}', async (username, password) => {
  await LoginPage.enterUsername(username);
  await LoginPage.enterPassword(password);
});

When('the user clicks on the login button', async () => {
  await LoginPage.clickLogin();
});

Then('the login should be {string}', async (outcome) => {
  if (outcome === 'success') {
    const success = await LoginPage.isLoginSuccessful();
    expect(success).to.be.true;
  } else if (outcome === 'failure') {
    const error = await LoginPage.getErrorMessage();
    expect(error).to.exist;
  } else if (outcome === 'locked') {
    const error = await LoginPage.getErrorMessage();
    expect(error).to.include('locked');
  }
});


// describe("My Login Demo", () => {
//   beforeEach(async () => {
//     //Access the hamburguer/toggle button by its accessibility id
//     await $("~open menu").click();
//     //Access the login left menu option by its text
//     await $('//*[@text="Log In"]').click();
//     // await driver.pause(3000)
//   });

//   it("should not login with invalid credentials", async () => {
//     //Access the username input element by its content-desc
//     await $('//*[@content-desc="Username input field"]').setValue("test");
//     //Access the username input element by its class + content-desc
//     await $(
//       '//android.widget.EditText[@content-desc="Password input field"]'
//     ).setValue("wrongPassword");
//     //Access the login button by the default xpath
//     await $(
//       '//android.view.ViewGroup[@content-desc="Login button"]/android.widget.TextView'
//     ).click();
//     await driver.pause(3000);

//     //Validate the error message
//     await expect(
//       $(
//         '//android.view.ViewGroup[@content-desc="generic-error-message"]/android.widget.TextView'
//       )
//     ).toHaveText("Provided credentials do not match any user in this service.");
//   });

//   it("should login with valid credentials", async () => {
//     //Access the username input element by its content-desc
//     await $('//*[@content-desc="Username input field"]').setValue(
//       "bob@example.com"
//     );
//     //Access the username input element by its class + content-desc
//     await $(
//       '//android.widget.EditText[@content-desc="Password input field"]'
//     ).setValue("10203040");
//     //Access the login button by the default xpath
//     await $(
//       '//android.view.ViewGroup[@content-desc="Login button"]/android.widget.TextView'
//     ).click();
//     // await driver.pause(3000);

//     //Access the product header element using the UISelector
//     //https://webdriver.io/docs/selectors/#android-uiautomator
//     //https://developer.android.com/reference/androidx/test/uiautomator/UiSelector
//     const selector =
//       'new UiSelector().text("Products").className("android.widget.TextView")';
//     const productsUISelector = await $(`android=${selector}`);
//     await expect(productsUISelector).toHaveText("Products");
//   });
// });
