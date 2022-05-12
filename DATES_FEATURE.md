## Core requirement

Posts show the date they were posted (2 days) Database Posts - Add date & User ID foreign key

1. Generate a time-stamp when a post is created and add that as a column in the Posts table

Look for a built-in MongoDB or Mongoose 'time created' table field to add to the tables, rather than create our own manual timestamp

2. Display the formated timestamp wigh the post on the posts page.

How to format the timestamp

### Issues to resolve
1. Unit test doesn't work, even though the datestamp is added as expected
2. Integration test is currently embedded in the 'create post' test. It could be better signposted
3. Integration test is also failing, even though the desired behaviour is achieved
4. Formatting of the view of the date created needs revision (not its own bullet point, but rather subpoint of the message)
5. Format the date to make it shorter, easier to read.

## Bonus requirement
3. Adding the user ID foreign key to the Posts table
4. Display the user ID with the post on the posts page.


