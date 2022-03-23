```
DESCRIPTION
The business has recently bought a competing social media platform and has made the decision to consolidate the platforms - but keep the look and identity of each site. The decision reached is to use your current backend, but expose it as an Express API for front-end apps to consume. The CTO feels React.js is a good choice but recommends you discuss it as a team.
ACCEPTANCE CRITERIA
A user can see /posts but has to login before creating/updating/deleting records
If not authenticated, a user is shown a message they are not signed in
Once authenticated:
A user can go to /posts and submit new posts without the page refreshing
A user can go to /posts and comment on posts without the page refreshing
A user can go to /posts and like a post or comment without the page refreshing
A user can only update/delete their own posts/comments.
```

### Tasks 

1. Discuss which front-end frame-work to use - React is suggested, but others to explore (potentially Angular)
2. Convert our backend to an Express API and use our new front end system to  use 'fetch requests' and promises or async/await requests

### Spec

1. User can see posts and navigate to post page without being logged in
2. If user is not logged in, a message will tell them they are not logged in
3. If user is not logged in, they cannot interact with the page
4. If user is not logged in, they will be prompted to login, if they try and interact with the page 
5. User can create posts if, and only if, logged in
6. User can delete posts if, and only if, logged in
7. User can update posts  if, and only if, logged in
8. Once logged in, user can create/update/delete a post and page will be updated with out the page being refreshed
9. Once logged in, user can create/update/delete a comment and page will be updated without the page being refreshed
10. Once logged in, user can like a post, and see this on the screen without page refreshing
11. Once logged in, user can like a comment, and see this on the screen without page refreshing
12. Once logged in, user can update their own posts, and see this on the screen without page refreshing
13. Once logged in, user can update their own comments, and see this on the screen without page refreshing
14. Once logged in, user cannot update posts that were not created by them
15. Once logged in, user cannot update comments that were not created by them

