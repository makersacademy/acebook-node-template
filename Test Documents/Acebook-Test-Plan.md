# Acebook Test Plan

## Objective

This test plan intends to outline the testing that will be performed on the Acebook code that is being developed by our team.
It will aim to highlight potential bugs in the software and provide information on their severity and priority prior to deployment.

The Acebook website is a piece of software that aims to allow a user to:
  - Sign up 
  - Log in 
  - Edit and update their profile
  - Create and publish a post
  - View a list of users that they can send a friend request to
  - Approve and deny friend requests
  - View a list of their friends
  - View feed
  - Comment and like posts from other users
  - Log out


## Scope of testing

We are going to test all of the main pieces of functionality from a users perspective. We will also include some validation checking for areas such as email addresses and user passwords. In addition we will be testing the database functionaility for items such as unique user ID's and the integration between each database. 

## Test environment

These test sessions will be conducted in VSCode as well as multiple modern browsers starting with Chrome and moving to Firefox.

## Test Team

The test team consists of 4 testers.

- Sean Wright
- James Turnbull
- Chris Hall
- Patrick Hagan

## Features to be tested

- User sign up and field validity checks
- Login
- Log out
- Page navigation (once logged in)
- Duplicate user accounts (blocked)
- Users can create a post (can consist of text and/or pictures)
- Editing profile
- Check that a user can add a profile picture
- Check name and picture appears beside their own posts
- Sending friend requests
- Approving/denying a friend request 
- View list of friends
- View list of users they may know
- Be able to comment on a post in their feed
- Be able to like a post in their feed and view the number of likes for that post

## Assumptions

During these tests certain assumptions will be made to make testing more effective and efficient. These assumptions are as follows:

- Only users logged in will be able to make a post
- The language will be English
- 

## Defect management

When a defect is found it will be noted and a bug report will be created containing the details of the issue as well as the steps to reproduce. These will then be placed onto the teams Trello board in the 'Reviewed - Needs action' list. From here it will be picked up by the development team and then resubmitted for review by the test team. Once the tests have been conducted and the team is happy the task will be placed into the 'Done' list.

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| Friction within the team. | Talk through issues/use coaches where needed. |
| Recent intermittent internet access in testers home. | Use of hot spot if necessary. |
| Time limit not allowing for all features to be tested. | Limit straying or chasing rabit holes. |
| Lack of knowledge of language and codebase for testers. | Use coaches/devs and the internet to upskill |

## Exit criteria

The project will be deemed completed once all of the tasks on the Trello board are placed into done or when the time limit has been reached (02/06/2023).




