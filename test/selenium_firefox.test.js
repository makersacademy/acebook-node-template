jest.setTimeout(30000);

const mongoose = require('mongoose');
let connection

//const fs = require('fs').promises;
//    //takes screenshot
//    let screenshot = await driver.takeScreenshot();
//    await fs.writeFile('gif_screenshot.png', screenshot, 'base64');

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


test('Sign up stays on same page when fields left empty', async () => {
    //navigates to signup page
    await driver.get('http://localhost:3030/users/new');

    await driver.findElement(By.css('#submit')).click();

    //waits until signup page loads again
    await driver.wait(until.elementLocated(By.css('body > div.new-content.white-box > h1')), 10000);

    //checks current url
    let currentUrl = await driver.getCurrentUrl();

    //expects the current url to be the signup page
    expect(currentUrl).toBe('http://localhost:3030/users/new');
});


test('Sign up fails with invalid password and stays on same page with error message', async () => {
    //navigates to homepage
    await driver.get('http://localhost:3030');

    //clicks on the Sign-Up button and goes to the sign-up page
    let linkByText = await driver.findElement(By.linkText('Sign Up'))
    await linkByText.click();

    //once on the sign up page, inputs inappropriate data
    await driver.findElement(By.name('firstName')).sendKeys('Jo');
    await driver.findElement(By.name('lastName')).sendKeys('Do');
    await driver.findElement(By.name('email')).sendKeys('test@test.com');
    await driver.findElement(By.name('password')).sendKeys('pass');
    await driver.findElement(By.name('confirmPassword')).sendKeys('pass');
    const pickAvatar = await driver.findElement(By.css('#new-user-form > fieldset > div:nth-child(2) > input:nth-child(5)'));
    await pickAvatar.click();
    await pickAvatar.sendKeys(Key.RETURN);

    //waits until an error message appears
    await driver.wait(until.elementLocated(By.css('#new-user-form > div.error-message')), 10000);

    //checks if the error message is there
    let errorMessage = await driver.findElement(By.css('#new-user-form > div.error-message'));
    let errorText = await errorMessage.getText();

    //expects the error message to be Password is not valid'
    expect(errorText).toBe("Password is not valid. Passwords must contain at least 8 characters, a number, and a special character");

    //checks current url
    let currentUrl = await driver.getCurrentUrl();

    //expects the current url to be the signup page
    expect(currentUrl).toBe('http://localhost:3030/users');
});


test('Click sign up and register then check if successful', async () => {
    //navigates to homepage
    await driver.get('http://localhost:3030');

    //clicks on the Sign-Up button and goes to the sign-up page
    let linkByText = await driver.findElement(By.linkText('Sign Up'))
    await linkByText.click();

    //once on the sign up page, inputs first name, last name, email, password, confirm password fields, picks an avatar and submits
    await driver.findElement(By.name('firstName')).sendKeys('John');
    await driver.findElement(By.name('lastName')).sendKeys('Doe');
    await driver.findElement(By.name('email')).sendKeys('test@test.com');
    await driver.findElement(By.name('password')).sendKeys('pass!1234');
    await driver.findElement(By.name('confirmPassword')).sendKeys('pass!1234');
    const pickAvatar = await driver.findElement(By.css('#new-user-form > fieldset > div:nth-child(2) > input:nth-child(5)'));
    await pickAvatar.click();
    await pickAvatar.sendKeys(Key.RETURN);

    //waits until the navigation to posts page
    await driver.wait(until.urlIs('http://localhost:3030/posts'), 10000);

    //checks if the Create Post button is there
    let createPostButton = await driver.findElement(By.css('body > div > div.bottombar > a.global-button.new-post-link'));
    let buttonText = await createPostButton.getText();

    //expects the text of the button to be "Create Post"
    expect(buttonText).toBe("Create Post");

    //checks if the :D avatar is there
    let checkAvatar = await driver.findElement(By.css('body > div.timeline-navbar.fixed-content > div.topbar > div'));
    let avatarText = await checkAvatar.getText();

    //expects the text of the button to be ":D"
    expect(avatarText).toBe(":D");
});

test('Sign in and check Create Post button visible', async () => {
    //navigates to homepage
    await driver.get('http://localhost:3030');

    //clicks on the sign-in button and goes to the sign-in page
    let loginByText = await driver.findElement(By.linkText('Login'))
    await loginByText.click();

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

test('Signed in user can create a post and it is displayed on timeline', async () => {
    //navigates to posts page
    await driver.get('http://localhost:3030/posts');

    //clicks on the Create Post button to go to posts/new page
    await driver.findElement(By.css('body > div.timeline-navbar.fixed-content > div.bottombar > a.global-button.new-post-link')).click();

    //once on the posts page, enters My first post and submits
    await driver.findElement(By.name('message')).sendKeys('My first post');
    await driver.findElement(By.css('#new-post-form > input')).click();

    //waits until the navigation to posts page
    await driver.wait(until.urlIs('http://localhost:3030/posts'), 10000);

    //checks if the post is created
    let myFirstPost = await driver.findElement(By.css('body > div.timeline > div > div.post-sec > div.post-details > p.message'));
    let postText = await myFirstPost.getText();

    //expects the text of post to be My first post
    expect(postText).toBe("My first post");
});

test('Signed in user can create a post with GIF and it is displayed on timeline', async () => {
    //navigates to posts page
    await driver.get('http://localhost:3030/posts');

    //clicks on the Create Post button to go to posts/new page
    await driver.findElement(By.css('body > div.timeline-navbar.fixed-content > div.bottombar > a.global-button.new-post-link')).click();

    //once on the posts page, searches for a GIF, picks one
    await driver.findElement(By.name('searchQuery')).sendKeys('Happy');
    await driver.findElement(By.css('body > div.new-content > div > form.gif-finder > div > input.global-button')).click();
    await driver.findElement(By.css('#gif-4')).click();

    //and enters My post with GIF
    await driver.findElement(By.name('message')).sendKeys('My post with GIF');
    await driver.findElement(By.css('#new-post-form > input')).click();

    //waits until the navigation to posts page
    await driver.wait(until.urlIs('http://localhost:3030/posts'), 10000);

    //checks if the post has GIF image
    let myGifImg = await driver.findElement(By.className('post-gif'));
    let postImg = await myGifImg.getAttribute('src');

    // expects the post to contain a part of the GIF image URL
    let expectedPartialUrl = "https://media1.giphy.com/media/";
    expect(postImg.includes(expectedPartialUrl)).toBeTruthy();

    //checks if the post is created
    let myGifPost = await driver.findElement(By.css('body > div.timeline > div > div.post-sec > div.post-details > p.message'));
    let postText = await myGifPost.getText();

    //expects the text of post to be My post with GIF
    expect(postText).toBe("My post with GIF");

//  //takes screenshot
//  let screenshot = await driver.takeScreenshot();
//  await fs.writeFile('a_happy_screenshot.png', screenshot, 'base64');
});

test('Signed in user can like a post', async () => {
    //navigates to posts page
    await driver.get('http://localhost:3030/posts');

    //clicks on like button for My first post
    await driver.findElement(By.css('#like-post')).click();

    //checks if the like is registered
    let likeCount = await driver.findElement(By.css('#like-post > p'));
    let likeNumber = await likeCount.getText();

    //expects like number to be 1
    expect(likeNumber).toBe("1");
});

test('Signed in user can comment on existing post', async () => {
    //navigates to posts page
    await driver.get('http://localhost:3030/posts');

    //once on the posts page, enters My first comment and submits
    await driver.findElement(By.name('comment')).sendKeys('My first comment');
    await driver.findElement(By.css('#new-comment-form > button')).click();

    //checks if the comment is created
    let myFirstComment = await driver.findElement(By.css('body > div.timeline > div > div.comments-sec > div > p'));
    let commentText = await myFirstComment.getText();

    //expects the text of comment to be My first comment
    expect(commentText).toBe("My first comment");
});

test('Signed in user logs out', async () => {
    //navigates to posts page
    await driver.get('http://localhost:3030/posts');

    //clicks on log out button
    await driver.findElement(By.css('body > div.timeline-navbar.fixed-content > div.topbar > form > input')).click();

    //waits until the navigation to sessions new
    await driver.wait(until.urlIs('http://localhost:3030/sessions/new'), 10000);

    //checks if the signup is there
    let signUp = await driver.findElement(By.css('body > div.new-content > p > a'));
    let footerText = await signUp.getText();

    //expects the text of footer to contain signup
    expect(footerText).toBe("signup");
});

test('Logged out user cannot navigate to posts page', async () => {
    //navigates to posts page
    await driver.get('http://localhost:3030/posts');

    //checks if the log in form is there
    let loginForm = await driver.findElement(By.css('body > div.new-content.white-box > h1'));
    let formExists = await loginForm.isDisplayed();

    //expects the form to exist
    expect(formExists).toBe(true);
});

test('Logged out user cannot see the new post form', async () => {
    //navigates to create new post page
    await driver.get('http://localhost:3030/posts/new');

    //checks if the log in form is there
    let loginForm = await driver.findElement(By.css('body > div.new-content.white-box > h1'));
    let formExists = await loginForm.isDisplayed();

    //expects the form to exist
    expect(formExists).toBe(true);
});