# Avokato Test Plan
## Overview
Gladiators is a website which allows you to create workout plans to meet your specific requirements and fitness goals.
## Objective
This test plan intends to outline the testing which ensures the gladiators website carries out the below specified functional requirements.
Add git workflow to the development branch for automated testing.
### Functional scope
We will only be testing the following functionality;
1. Sign up
2. Log in / Log out
3. Add a profile photo/ personal information
4. Make posts
5. Add comments to posts
6. Like posts, number of likes visible next to post
7. Navigation bar is functional
8. Add and edit friends to list
9. User’s name and little photo next to post
10. Upload a photo in the form of a post

## Test Environments
Tests will be performed using:
* Chromium engine 109
* Minimum network speed 20mbps
* Mac OS Ventura 13.1
* Automated testing performed with Playwright 1.28
* IntelliJ CE 2022.3.1
* JUnit 5.8.1

## Features To Be Tested
For each of the popular frameworks, we want to verify the following features:
1. Sign Up
    * Cant sign up with an empty email address
    * Cant sign up with an empty password
    * Cant sign up with exisiting email address
    * Must have valid password and valid email address
2. Log in /Log out
    * Cant sign in with an empty email
    * Cant sign in with an empty password
    * Log out of account and take you to sign in page
3. Add a profile photo/ personal information
    * Default profile photo when it hasn't been uploaded
    * Edit personal information 
        * Name
        * Age
4. Make posts
    * Can't post an empty string
    * Check special symbols are displayed correctly
    * Character limit maybe
5. Add comments
    * Can't comment empty strings
6. Like posts and number of likes appears
    * Check a post can be liked and unliked
    * Check it counts the number of likes properly
7. Navigation bar
    * Test the search post functionality
        * Posts
        * People
8. Friends list
    * Add friends to friend list by sending a request
    * remove friend from list
9. User name with little photo next to it
    * Check the profile photo is being displayed properly
10. Upload pictures as a post with a caption/text
    * Test whether a picture appears inside a post

## Test Team
We have 2 testers available for this project in our test team.
The testers assigned to this project are:
* `A.Patel` - Test Engineer who joined the company last week and is primarily
still completing onboarding.
* `R.Le` - Test Engineer who joined the company last week and is primarily still completing onboarding.

## Defect Management
When a tester encounters a bug, they will raise a defect on the GitHub Issues
page for the project. The tester should assign one of the following priorities:
* **1 - High:** Requires immediate attention
* **2 - Medium:** Must be addressed pre-deployment
* **3 - Low:** Can be addressed post-deployment
The list of defects will be reviewed on submission by the Development Team.
Product Owner will receive a daily update of outstanding and resolved number of defects.

## Automated testing workflow
We implemented a github actions workflow to automatically run the end to end cypress tests and unit tests on every push.
We initially had some issues due to setting the wait-on function to port 3000 when our test server was running on port 3030. Following this issue the next error was for a missing cypress configuration file which we resolved by generating a simple file which defined the javascript framework the project is using. Finally the configuration file didn't define a base URL which meant the cy.visit function was looking through the directory for files rather than the routes on the localhost server. This was resolved by setting the baseURL for the end to end tests in the config file.

## Exploratory testing - initial phase
High character limit
Password, username, email field validators not working
Only works on test server - test server has access to database, normal does not

  * Routes in files aren't clear what pages exist
    - in the cypress integration files the routes are displayed
  * Can create a new user using existing login information but it doesnt overide the previous details and the new login doesnt work.
    - There should be an error message when siging up with existing information and it keeps you on the same page.
  * User new and sessions new look identical and the only way to distinguish whether youre on the right page is by checking the URL.
  * Account can be created with a blank username and password, there is now a acc user “ “ and password “ “
    - There should be an error message when siging up with existing information and it keeps you on the same page. There should be validator checks for each of the forms i.e. unique username and email with a password of a sufficient length (maybe with a character limit as well).
  * Home route page has a log out button implying youre logged in which might not be right (maybe remove the button from that page entirely).
    - Should have links to both log in page (sessions new) and sign up page (users new)
  * Sometimes creating new user on users new automatically logs in when submitting
    - unsure how to replicate
  * Email validation allows " " but if you use characters then it allowed "a@a" minimum character before and after.
  * Password can be a small as 1 character " " or "abc" no validation checks yet.
  * You can make a post with no content, there should be some validation for post creation.

### Security and accessibility testing
 ## ZAP test
  --- 
  * Absence of Anti-CSRF Tokens
    - Tokens are used to validate their requests and the users
    - Attackers can fake request without validation from the Anti-CSRF Tokens
  * Content Security Policy (CSP) Header Not Set
    - CSP adds security to detect and prevent attacks such as cross site scripting and data injection which could be used to trick sites to deliver malicous content
  * Missing Anti-clickjacking Header
    - It can replicate a false page mimicing your site
  * Cookie without SameSite Attribute
    - Cookies can be sent and request cookie information
  * Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s)
    - X-Powered-by headers = Shares information of how website runs and users with malicious intent can find vulnerabilities (because your techstack is visible)
  * X-Content-Type-Options Header Missing
    - Mime Sniffing (Ask Paul)
    Vulnerable to XXS (Cross site scripting attack)
  * Loosely Scoped Cookie
    - Cookies haven't been configured properly
## Lighthouse tests
---
  - Main two issues shown in the lighthouse report for all the pages
    * Accessibility - HTML does not contain a default language for the page (screen readers need this to read the page correctly for people with vision impairment)
    * Accessibility - HTML does not have a title for the page

## Tests with new site
---
- ( + ) Validation in place doesn’t let user, email, pw be empty (minimum char)
- ( - ) Same username can’t be created on sign up, however if same username has 1 capital letter it can be created (still a dupe)
- ( - ) Email validation exists however doesn’t support capital letters, won’t let you sign up
- ( - ) Password validation only takes min 8 char (doesn’t take into acc numbers, capital letter or special char
- ( + ) Password validation specifies how many char you’ve entered i.e. “5 char entered”
- ( - ) When existing user/email exists or unable to create new user, it just refreshes the page > should have a prompt msg pop up stating “existing user/email already in use” rather than reload same users/new page
- ( - ) Empty posts can still be posted
- ( - ) No char limit on posts, was able to post 50,773 char / 9,158 words
- ( + ) Special char supported
- ( + ) Emoji’s supported
- ( - ) White bar appears on right hand side of /posts page 
- ( - ) Picture next to username is distorted 

## Accessibility (Lighthouse)
- ( - ) Make sure to specify language for accessibility on all pages
- ( - ) Accessibility colour on login page was the only one that’s got a contrast issue

## Entry Criteria
Testing will commence when:
* The testing team have been notified of the testing requirements and have access to the testing environment.
## Exit Criteria
The test plan has passed when all functionality has been tested and passed.
## Risks
The following table outlines all of the risks associated with this test plan,
and how we intend to mitigate them:
| Risk | Mitigation | Priority |
| ---- | ---------- | -------- |
| Recent intermittent internet access in our office. | Allow testers to work from remote/home as needed. | Low |
| We might find more bugs than the developers have time to fix. | Follow the defect prioritisation and management policy | Medium |
| We’ve not tested to see how well the site performs with multiple users. | Arrange for some performance testing to happen after launch. | Medium |
| Compatability issues since entire testing env is using Mac and only testing Chrommium browsers | Schedule testing for other OS and browsers as more testers become available | Low |
## Test plan revision history
Here you will find a history of previous revisions of this test plan, with
the name of the tester who authored the revision.
| Version | Author | Date |
| ------- | ------ | ---- |
| 1.0 (This version) | A.R | 06/02/2023 |
