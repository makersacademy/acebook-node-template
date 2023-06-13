# Acebook Betta - Test Scenarios
    Making people's lives betta

#### **1. Home Page:**

| Test Case ID | Test Scenario                                                                          | Test Steps                                                                | Expected Result                                     | Actual Result |
|-------|----------------------------------------------------------------------------------------|---------------------------------------------------------------------------|-----------------------------------------------------|---------|
| HP_01 | Verify all links on the navigation bar                                                 | Click each link on the navigation bar  <br/> signup link  <br/>login link | Each link should direct to the correct page         |
| HP_02 | Verify that menu options show on navigation bar when page size is reduced(mobile view) | Reduce the page size and check the menu                                   | Menu should display and links should work correctly |
| HP_03 | Verify page title visibility(including accessibility)                                  | Look at the title of the homepage(check if accessible)                    | The title should be visible and findable with label |
| HP_04 | Verify persistence of login session                                                    | Login, navigate away to another website, and return to homepage           | User should still be logged in                      |

#### **2. Sign Up:**

| Test Case ID | Test Scenario                                                       | Test Steps                                                                                | Expected Result                                                                               | Actual Result |
|--------------|---------------------------------------------------------------------|-------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|--------------|
| SU_01 | Verify home link / cancel / back functionality                      | Click on each  <br/>submit button  <br/>cancel button                                     | Should navigate to the corresponding page                                                     |
| SU_02 | Verify valid username, full name, email, password are only accepted | 1- Try to sign up with invalid credentials  <br/>2- Try to sign up with valid credentials | 1- Error message should be displayed if fails  <br/>2- Signup confirmation shown if succesful |
| SU_03 | Verify password hashing                                             | Sign up and inspect database                                                              | Password should be stored as a hash                                                           |
| SU_04 | Unable to signup with existing email address                        | Try to sign up with an email already in use                                               | Should throw an error message                                                                 |
| SU_05 | Verify prevention of duplicate signup credentials                   | Try to sign up with duplicate credentials                                                 | Should throw an error message                                                                 |
| SU_06 | Verify password criteria                                            | Check if password requirements are displayed and enforced                                 | Requirements should be enforced, and error message should be displayed if not met             |
| SU_07 | Verify error message if fields left blank                           | Try to sign up leaving fields blank                                                       | Error message should be received                                                              |
| SU_08 | Verify confirm sign up button functionality                         | Click the confirm sign up button                                                          | Should return to homepage/landing page/profile page                                           |
| SU_09 | Verify punctuation acceptance in name fields                        | Try to sign up with punctuation in name fields                                            | Should throw error if entered incorrectly                                                     |
| SU_10 | Verify maximum character limit                                      | Try to sign up with a name fields that exceeds character limit                            | Should throw error if character limit is exceeded                                             |
| SU_11 | Verify auto log out feature (SECURITY)                              | Stay inactive for the duration of the session timeout                                     | Should be logged out automatically                                                            |
| SU_12 | Verify prevention of harmful scripts                                | Try to inject harmful script during sign up                                               | Should prevent script injection                                                               |

#### **3. Login Page:**

| Test Case ID | Test Scenario                                      | Test Steps                                  | Expected Result | Actual Result |
|--------------|----------------------------------------------------|---------------------------------------------|----------------|--------------| 
| LP_01 | Verify only valid email address is accepted        | Try to log in with an invalid email address | Should not be able to log in |
| LP_02 | Verify only valid passwords are accepted           | Try to log in with an invalid password      | Should not be able to log in |
| LP_03 | Verify error message for invalid login credentials | Try to log in with invalid credentials      | Error message should display (should not specify if password/email is incorrect) |
| LP_04 | Verify prevention of harmful scripts               | Try to inject harmful script during login   | Should prevent script injection |
| LP_05 | Verify blank fields are not accepted               | Try to log in with blank fields             | Error message should display |

#### **4. Posts Page:**

| Test Case ID | Test Scenario                                                          | Test Steps                                        | Expected Result                                    | Actual Result                                |
|--------------|------------------------------------------------------------------------|---------------------------------------------------|----------------------------------------------------|----------------------------------------------|
| PP_01 | Verify ability to create a new post                                    | Log in and try to create a new post               | Should be able to create a post                    |
| PP_02 | Verify ability to create multiple posts                                | Log in and try to create multiple posts           | Should be able to create multiple posts            |
| PP_03 | Verify upper limit of number of posts shown  <br/> (Check performance) | Create posts that exceed the limit                | Should only show the maximum number of posts       |
| PP_04 | Verify local date stamp on post                                        | Create a post and check the local date stamp      | Date stamp should match the current local date     |
| PP_05 | Verify emoji acceptance                                                | Create a post with emojis                         | Post should display with emojis                    | Pass                                         |
| PP_06 | Verify special characters/punctuation acceptance                       | Create a post with special characters/punctuation | Post should display with special characters/punctuation |
| PP_07 | Verify UTF-8 language character support                                | Create a post with UTF-8 characters               | Post should display with UTF-8 characters          |
| PP_08 | Verify post creation only when signed in (SECURITY)                    | Try to create a post when not logged in           | Should not be able to create a post                |
| PP_09 | Verify handling of post creation with empty fields                     | Try to create a post with empty fields            | Error message should display                       | Fail - Able to create posts with empty field |
| PP_10 | Verify navigation bar displays properly                                | Check the navigation bar on the posts page        | Navigation bar should display properly             |

#### **5. Performance Testing:**
| Test Case ID | Test Scenario | Test Steps | Expected Result | Actual Result |
|--------------|---------------|--------------|----------------|--------------|
| PT_01        | Sign up       | placeholder | placeholder | placeholder |
| PT_02        | Login         | placeholder | placeholder | placeholder |

