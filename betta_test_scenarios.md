# Acebook Betta - Test Scenarios and Automation Coverage Metrics
    Making people's lives betta

#### **1. Home Page:**

| Test Case ID | Test Scenario                                                                          | Test Steps                                                                | Expected Result                                     | Automation Coverage  |
|--------------|----------------------------------------------------------------------------------------|---------------------------------------------------------------------------|-----------------------------------------------------|----------------------|
| HP_01        | Verify all links on the navigation bar                                                 | Click each link on the navigation bar  <br/> signup link  <br/>login link | Each link should direct to the correct page         | Selenium and Cypress |
| HP_02        | Verify that menu options show on navigation bar when page size is reduced(mobile view) | Reduce the page size and check the menu                                   | Menu should display and links should work correctly | Manual Only          |
| HP_03        | Verify page title visibility(including accessibility)                                  | Look at the title of the homepage(check if accessible)                    | The title should be visible and findable with label | Cypress              |
| HP_04        | Verify persistence of login session                                                    | Login, navigate away to another website, and return to homepage           | User should still be logged in                      | Cypress              |

#### **2. Sign Up:**

| Test Case ID | Test Scenario                                                       | Test Steps                                                                                | Expected Result                                                                               | Automation Coverage  |
|--------------|---------------------------------------------------------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|----------------------|
| SU_01        | Verify home link / cancel / back functionality                      | Click on each  <br/>submit button  <br/>cancel button                                     | Should navigate to the corresponding page                                                     | Selenium and Cypress |
| SU_02        | Verify valid username, full name, email, password are only accepted | 1- Try to sign up with invalid credentials  <br/>2- Try to sign up with valid credentials | 1- Error message should be displayed if fails  <br/>2- Signup confirmation shown if succesful | Selenium and Cypress |
| SU_03        | Verify password hashing                                             | Sign up and inspect database                                                              | Password should be stored as a hash                                                           | Manual Only          |
| SU_04        | Unable to signup with existing email address                        | Try to sign up with an email already in use                                               | Should throw an error message                                                                 | Selenium and Cypress |
| SU_05        | Verify prevention of duplicate signup credentials                   | Try to sign up with duplicate credentials                                                 | Should throw an error message                                                                 | Selenium and Cypress |
| SU_06        | Verify password criteria                                            | Check if password requirements are displayed and enforced                                 | Requirements should be enforced, and error message should be displayed if not met             | Selenium and Cypress |
| SU_07        | Verify error message if fields left blank                           | Try to sign up leaving fields blank                                                       | Error message should be received                                                              | Selenium and Cypress |
| SU_08        | Verify confirm sign up button functionality                         | Click the confirm sign up button                                                          | Should return to homepage/landing page/profile page                                           | Selenium and Cypress |
| SU_09        | Verify punctuation acceptance in name fields                        | Try to sign up with punctuation in name fields                                            | Should throw error if entered incorrectly                                                     | Manual Only          |
| SU_10        | Verify maximum character limit                                      | Try to sign up with a name fields that exceeds character limit                            | Should throw error if character limit is exceeded                                             | Manual Only          |
| SU_11        | Verify auto log out feature (SECURITY)                              | Stay inactive for the duration of the session timeout                                     | Should be logged out automatically                                                            | Manual Only          |
| SU_12        | Verify prevention of harmful scripts                                | Try to inject harmful script during sign up                                               | Should prevent script injection                                                               | Manual Only          |
| SU_13        | Verify Emoji matches that displayed on main page                    | Sign up, add an Emoji                                                                     | Should display on posts page                                                                  | Cypress              |

#### **3. Login Page:**

| Test Case ID | Test Scenario                                      | Test Steps                                  | Expected Result                                                                  | Automation Coverage  |
|--------------|----------------------------------------------------|---------------------------------------------|----------------------------------------------------------------------------------|----------------------| 
| LP_01        | Verify only valid email address is accepted        | Try to log in with an invalid email address | Should not be able to log in                                                     | Selenium and Cypress |
| LP_02        | Verify only valid passwords are accepted           | Try to log in with an invalid password      | Should not be able to log in                                                     | Selenium and Cypress |
| LP_03        | Verify error message for invalid login credentials | Try to log in with invalid credentials      | Error message should display (should not specify if password/email is incorrect) | Selenium and Cypress |
| LP_04        | Verify prevention of harmful scripts               | Try to inject harmful script during login   | Should prevent script injection                                                  | Manual Only          |
| LP_05        | Verify blank fields are not accepted               | Try to log in with blank fields             | Error message should display                                                     | Selenium and Cypress |

#### **4. Posts Page:**

| Test Case ID | Test Scenario                                                          | Test Steps                                               | Expected Result                                         | Automation Coverage  |
|--------------|------------------------------------------------------------------------|----------------------------------------------------------|---------------------------------------------------------|----------------------|
| PP_01        | Verify ability to create a new post                                    | Log in and try to create a new post                      | Should be able to create a post                         | Selenium and Cypress |
| PP_02        | Verify ability to create multiple posts                                | Log in and try to create multiple posts                  | Should be able to create multiple posts                 | Selenium and Cypress |
| PP_03        | Verify upper limit of number of posts shown  <br/> (Check performance) | Create posts that exceed the limit                       | Should only show the maximum number of posts            | Manual Only          |
| PP_04        | Verify emoji acceptance                                                | Create a post with emojis                                | Post should display with emojis                         | Manual Only          |
| PP_05        | Verify special characters/punctuation acceptance                       | Create a post with special characters/punctuation        | Post should display with special characters/punctuation | Manual Only          |
| PP_06        | Verify UTF-8 language character support                                | Create a post with UTF-8 characters                      | Post should display with UTF-8 characters               | Selenium and Cypress |
| PP_07        | Verify post creation only when signed in (SECURITY)                    | Try to create a post when not logged in                  | Should not be able to create a post                     | Cypress              |
| PP_08        | Verify handling of post creation with empty fields                     | Try to create a post with empty fields                   | Error message should display                            | Cypress              |
| PP_09        | Verify navigation bar displays properly                                | Check the navigation bar on the posts page               | Navigation bar should display properly                  | Manual Only          |
| PP_10        | Verify ability to create a new post with Gif                           | Log in and try to create a new post with Gif             | Should be able to create a post with a Gif              | Selenium and Cypress |
| PP_11        | Verify ability to create a new post with Gif and add alt text          | Log in and try to create a new post with Gifand alt text | Should be able to create a post with a Gif and see alt  | Manual Only          |


#### **5. Site Wide:**
| Test Case ID | Test Scenario                            | Test Steps                                                      | Expected Result                       | Automation Coverage |
|--------------|------------------------------------------|-----------------------------------------------------------------|---------------------------------------|---------------------|
| SW_01        | Dark Mode functionality                  | Check all pages for dark mode options                           | Total site coverage, effective useage | Manual Only         |
| SW_02        | Alt text coverage for images             | Make a post, add alt text to gif, check it is reflected on post | Alt text available on all images      | Manual Only         |
| SW_03        | Page titles visibility and accessibility | Manually test and run tools across site                         | Page titles on all pages              | Wave                |
| SW_04        | Color contrast compliance                | Manually test and run tools across site                         | Total site coverage, effective useage | Wave                |

## Total Test Scenarios = 37 ## 


#### **5. Test Coverage Metrics:**
| Testing Method | Number of Test Scenarios Covered | Functionality Coverage | Pipeline Position       |
|----------------|----------------------------------|------------------------|-------------------------|
| Cypress        | 22                               | 60%                    | CI                      |
| Selenium       | 11                               | 30%                    | Manually Run Throughout |
| Manual         | 33                               | 100%                   | Manually Run Throughout |
| Wave           | 2                                | 5%                     | Manually Run Throughout |

## Acebook Betta - Test Scenarios and Automation Coverage Metrics Final Report

### Overview
This report provides an analysis of the test scenarios and automation coverage metrics for the Acebook Betta application. The goal of Acebook Betta is to enhance people's lives by providing a platform for social interactions. The testing process encompasses various aspects of the application, including the Home Page, Sign Up, Login Page, and Posts Page.

### Home Page
The Home Page testing covers navigation bar links, mobile view menu options, page title visibility, and persistence of login sessions. Selenium and Cypress automation frameworks provide coverage for the Home Page test scenarios.

### Sign Up
The Sign Up section validates the functionality and security of the sign-up process. Test scenarios include navigation functionality, input field validation, password hashing, prevention of duplicate signups, password criteria enforcement, error handling, confirm sign up button functionality, prevention of harmful scripts, and more. Selenium and Cypress automation frameworks provide coverage for the Sign Up test scenarios.

### Login Page
The Login Page section focuses on verifying the functionality and security of the login process. Test scenarios include valid email and password acceptance, error message handling, prevention of harmful scripts, and rejection of blank fields. Selenium and Cypress automation frameworks provide coverage for the Login Page test scenarios.

### Posts Page
The Posts Page section covers test scenarios related to post creation, display, and functionality. These scenarios include creating new posts, multiple posts, upper limits of post display, emoji acceptance, special characters/punctuation acceptance, UTF-8 language character support, post creation only when signed in, navigation bar display, post creation with GIFs and alt text, and more. Selenium and Cypress automation frameworks provide coverage for the Posts Page test scenarios.

### Site Wide
The Site Wide section encompasses test scenarios that apply to the entire application. This includes Dark Mode functionality, alt text coverage, page titles, and color contrast functions.


### Test Coverage Metrics
The test coverage metrics indicate the extent of coverage achieved by different testing methods. Cypress automation testing covers 66% of the test scenarios, while Selenium covers 33%. Manual testing achieves the highest coverage with 100% of test scenarios covered. Cypress is integrated into the CI pipeline, while Selenium is manually run throughout.

### Next Steps for Test Coverage
To further enhance the test coverage for the Acebook Betta application, the following steps can be considered:

- Increase automation coverage for Selenium to cover a higher percentage of test scenarios.
- Explore additional automation tools or frameworks that can provide improved coverage and efficiency.
- Implement more performance and load testing to assess the application's behavior under high user loads.
- Conduct security testing to identify and address any vulnerabilities or potential threats.
- Continuously review and update test scenarios to accommodate new features, changes, and user requirements.

Additionally, as new features, such as the "Nemesis System," are being developed, it is crucial to extend the test suite continually. The test suite should account for added functionality, ensuring comprehensive coverage of the application. This approach helps maintain the quality and reliability of Acebook Betta as it evolves.

By implementing these next steps and keeping the test suite up-to-date, the test coverage for Acebook Betta can be expanded, ensuring a more robust and reliable application for its users.
