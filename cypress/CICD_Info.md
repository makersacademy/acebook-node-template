# CI/CD Pipeline Information

This project utilises Cypress, Github Actions and Cypress Cloud.

- Cypress is used to run the integration tests, including some end-to-end testing.

- Github Actions runs these tests on every successful pull request.

- Cypress Cloud stores the test data and allows for tracking and analytics in our bug reporting.

At the moment, the project is not deployed in production, We aim to implement continuos development once this has been achieved.


## Pipeline steps:

1. A pull request is made and successfully merged with main branch.
2. Github Actions triggers and installs Node.js.
3. Github Actions installs a MongoDB, installs the project dependencies and makes a build.
4. Unit tests are run using Jest.
5. The test server starts and Cypress begins its test run.
6. The Cypress test begins by attempting a signup and creating an admin profile, which is then used for later tests.
7. At the end of the tests, the test database is dropped.
8The test run completes and test data is stored in Cypress Cloud for analysis.

At this point we aim to implement the automatic deployment to Render.

## Test Scope

As written in the test plan, we aim for the Cypress Integration tests to have total coverage of functionality,
as well as some coverage for performance if we have time.

We utilise random data generation for login, as well as 


