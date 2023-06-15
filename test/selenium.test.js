const mongoose = require('mongoose');
let connection

const { Builder, By, Key, until } = require('selenium-webdriver');
let driver;

beforeAll(async () => {
    const url = 'mongodb://0.0.0.0/acebook_test';
    connection = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    driver = await new Builder().forBrowser('firefox').build();
});

afterAll(async () => {
    //cleans up test data
    await connection.connection.db.dropDatabase();

    //closes down selenium
    await driver.quit();

    //closes down database connection
    await connection.disconnect();
});

test('Click sign up and register then check if successful', async () => {
    //navigates to homepage
    await driver.get('http://localhost:3030');

    //clicks on the Sign-Up button to goes to the sign-up page
    let linkByText = await driver.findElement(By.linkText('Sign Up'))
    await linkByText.click();

    //once on the sign up page, inputs first name, last name, email, password and confirm password fields
    await driver.findElement(By.name('firstName')).sendKeys('John');
    await driver.findElement(By.name('lastName')).sendKeys('Doe');
    await driver.findElement(By.name('email')).sendKeys('test@test.com');
    await driver.findElement(By.name('password')).sendKeys('pass!1234');
    await driver.findElement(By.name('confirmPassword')).sendKeys('pass!1234', Key.RETURN);


    //waits until the navigation to posts page
    await driver.wait(until.urlIs('http://localhost:3030/posts'), 10000);

    //checks if the Create Post button is there
    let createPostButton = await driver.findElement(By.css('body > div > div.bottombar > a.global-button.new-post-link'));
    let buttonText = await createPostButton.getText();

    //expects the text of the button to be "Create Post"
    expect(buttonText).toBe("Create Post");
});

test('Sign in and check Create Post button visible', async () => {
    //navigates to homepage
    await driver.get('http://localhost:3030');

    //clicks on the sign-in button to goes to the sign-in page
    await driver.findElement(By.css('.global-button')).click();

    //once on the sign-in page, inputs the email and password and submit the form
    await driver.findElement(By.name('email')).sendKeys('test@test.com');
    await driver.findElement(By.name('password')).sendKeys('pass!1234', Key.RETURN);

    //waits until the navigation to posts page
    await driver.wait(until.urlIs('http://localhost:3030/posts'), 10000);

    //checks if the Create Post button is there
    let createPostButton = await driver.findElement(By.css('body > div > div.bottombar > a.global-button.new-post-link'));
    let buttonText = await createPostButton.getText();

    //expects the text of the button to be "Create Post"
    expect(buttonText).toBe("Create Post");
});