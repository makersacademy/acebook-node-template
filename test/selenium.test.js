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

    //clicks on the Sign-Up button and goes to the sign-up page
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
    let myFirstPost = await driver.findElement(By.css('body > div.timeline > div > div.post-sec > div.post-details > p'));
    let postText = await myFirstPost.getText();

    //expects the text of post to be My first post
    expect(postText).toBe("My first post");
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
    await driver.findElement(By.css('#new-comment-form > input.global-button')).click();

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