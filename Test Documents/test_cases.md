## PAGES:
1 - Homepage/login
2 - Sign up
3 - Feed
4 - Profile
5 - Users


## TEST CASES:

*** 1 ***

Homepage:
- Title is visible and reads 'Acebook'
- Check login fields on page 
- Check sign up button and redirects to sign up page

Login:
- Error if username or password wrong 
- Log in with correct details and redirected to feed page


*** 2 ***

- Username (email) & password validation checks (Unit test maybe)
- After succesful sign up returned to homepage, possibly with confirmation message 
- Error messages if details incorrect
- Button to return to homepage


*** 3 ***

- User can submit a post
- User can like a post
- User can react/comment on a post
- Likes are shown
- Username is shown for the post 
- Posts are in chronological order 
- All posts are shown
- User can edit/delete a post (nice-to-have)
- Hide certain user posts (nice-to-have)


*** 4 ***

- User can upload/edit profile picture
- Users friends can be seen 
- User can edit/update personal details
- User can't view other users password/personal info
- Users posts are viewable
- Button to feed/logout/other profiles (possibly) are in navbar


*** 5 ***

- View all users
- Add friends
- Remove friends 
- Pending requests 