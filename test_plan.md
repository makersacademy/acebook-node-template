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
