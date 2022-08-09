## Heroku

1. Create a free Heroku account: https://signup.heroku.com/login

2. Login (https://dashboard.heroku.com/apps), click "New" in the top right corner and “Create new app."

3. Name the app (N.B. This will be included in the public URL) and click "Create app."

4. From the dashboard, open the "Deploy" tab and scroll to “Deployment method” and choose "GitHub."
   Use “Connect to GitHub” option to provide your GitHub repository and click "Connect."

5. The Deployment section (Automatic deploys/Manual deploy) will now be shown.
   Select "Enable Automatic Deploys" (as soon as the changes are pushed to GitHub, Heroku will deploy) or
   "Deploy Branch" for manual deployment. If using "Deploy Branch" you will have to click this every time you want to update the website.

6. Open "Settings" tab and under "Buildpacks" click “Add buildpack”. Click "NodeJs" and save changes.

7. Go back to the "Deploy" tab, and click "Deploy Branch" at the bottom. Heroku will take the code and host it. Open the "Activity" tab to see the progress.

8. Open the "Settings" tab and scroll down to the "Domains" section.
   Note the URL of the app - given our app is dependent on a database it will not load until we link the database...

## MongoDB Atlas

1. Go to https://www.mongodb.com/cloud and register for a free account.

2. Within "Database Deployments" click "Create." This will open "Create New Cluster."

3. Click "Create a cluster" under the "Shared Clusters" option.

4. On the next page, you'll be prompted to choose a few options for your cluster e.g. cloud provider & region; we used AWS based in Ireland as this is free.

5. Name the cluster and click "Create Cluster."

6. Create a "Database User" for your cluster.
   First navigate to the "Database Access" (located under "Security" in the left-hand navigation bar).
   Click on "Add a new Database User".
   A prompt will appear where you can choose this user's authentication method and database user privileges.
   Select the "Password" authentication method and give this user a username and password. **_IMPORTANT: keep a copy of the password._**
   Click Add user.

7. Go to "Network Access" then "Add IP Address" to grant authorised IP Addresses Access to the cluster.
   Choose which IP addresses are allowed to access the cluster.
   Use your own IP address for own access or all access from anywhere.

8. Get Your Atlas Cluster Connection String.
   Head back to your Atlas cluster's dashboard as we'll need to grab our connection string.
   Click the "Connect" button. Choose the "Connect your application" option.
   Here, you'll see the connection string we'll need to connect to our cluster. Copy the connection string.
   Paste the string into an editor; we'll need to modify it a bit before we can set it to a Heroku config variable. Atlas has added the username of the database user we previously created. To complete the connection string and make it valid, replace the <password> with your own database user's password.

9. Go back to Heroku. Set a MONGODB_URI config var. Add this config var via your app's "Settings" tab in the Heroku Dashboard. Head to your apps > app_name > Settings. Within the Config Vars section, click the "Reveal Config Vars" button, and add your config var there.

Key: MONGODB_URI
VALUE: generated from step 8
Click Add.

10. In your app (VS Code), add the below line to the ./bin/www file in order to connect the app to the correct database.
    (line 23)
    `const uri = process.env.MONGODB_URI;`
    Push this change back to GitHub.

11. In Heroku, click "Logs" from the "More" tab to see the build progress.
