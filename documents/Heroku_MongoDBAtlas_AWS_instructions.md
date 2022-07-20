## Heroku

1. Create a free Heroku account: https://signup.heroku.com/login

2. Login, click "New" in the top right corner and select “Create new app”.

3. Name the app. (N.B. This will be included in the public URL for the application) and click "Create app."

4. From the dashboard, open "Deploy" tab and scroll to “Deployment method” and choose "GitHub."
   Use “Connect to GitHub” option to provide your GitHub repository. Search for your GitHub repository and click connect.

5. The Deployment section will now be shown. Select Enable Automatic Deploys (as soon as the changes are pushed to GitHub, Heroku will pick them up and deploy) or "Deploy Branch" each time for manual deployment.

6. Open "Settings" tab, under Buildpacks, click “Add buildpack”. Click NodeJs and save.

7. Go back to Deploy tab, and click Deploy Branch at the bottom. Heroku will take the code and host it. Open the Activity tab to see the progress.

8. Open the settings tab and scroll down to the Domains and certificates section. Here, you can see the URL of your app that was just deployed. Copy and paste that URL in the browser.

## MongoDB Atlas

1. Go to https://www.mongodb.com/cloud and register for a free account.

2. After registering, Atlas will prompt you to create an organisation and project where you can deploy your cluster.

3. Click "Create a cluster" under the Shared Clusters option.

4. On the next page, you'll be prompted to choose a few options for your cluster. Cloud provider & region, we used AWS based in Ireland.

5. Name the cluster and click "Create Cluster"

6. Create a Database User for Your Cluster. First navigate to the "Database Access" section (located under "Security" in the left-hand navigation bar). Click on "Create a new Database User". A prompt will appear where you can choose this user's authentication method and database user privileges.
   Select the "Password" authentication method and give this user a username and password.

7. Grant Authorised IP Addresses Access to Your Cluster
   Choose which IP addresses are allowed to access the cluster. Use your own IP address for own access or all access from anywhere.

8. Get Your Atlas Cluster Connection String
   Head back to your Atlas cluster's dashboard as we'll need to grab our connection string.
   Click the "Connect" button. Choose the "Connect your application" option.
   Here, you'll see the connection string we'll need to connect to our cluster. Copy the connection string.
   Paste the string into an editor; we'll need to modify it a bit before we can set it to a Heroku config variable. Atlas has added the username of the database user we previously created. To complete the connection string and make it valid, replace the <password> with your own database user's password

9. Set a MONGODB_URI config var. Add this config var via your app's "Settings" tab in the Heroku Dashboard. Head to your apps > app_name > Settings. Within the Config Vars section, click the "Reveal Config Vars" button, and add your config var there.

10. Add the below line to the ./bin/www file in order to connect the app to the correct database.
    const uri = process.env.MONGODB_URI;
