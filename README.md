# Slipstream

##### Front end capstone project at Nashville Software School

A social app where users can search for and add movies and TV shows to their personal queue, write reviews to share with other users, and find information on where to stream the media of their choice.

This solo project is the culmination of my time in the front-end segment of the NSS full stack web developer program.

The deployed site is available at http://slipstream.john-achor.com.

#### Technologies used in this project:

- HTML (as JSX)
- CSS (as Sass)
- JavaScript
- React.js
- axios
- Firebase (hosting and data storage)
- Bootstrap 3 (as `react-bootstrap`)

# How to use:

Upon accessing the site for the first time, you will be presented with a login prompt.  Use the `Register a new account` link to head over to the registration form.  Upon filling out the form, click `Register` and you should be automatically logged in.  On future logins, the email and password you provided will be used.

Once you are logged in, you will see the app's main view. From here you can access most of the app's functionality from the navbar.  The different views and their detailed explanations are listed below.

## Dashboard

### Activity Feed

In the Activity Feed, you can see a reverse chronological timeline of reviews written by friends.  From each review, you have the option of checking out the detailed view or adding the media item in question to your own queue.

### Friends List and Options

On the right side of the dashboard view (or at the bottom on mobile) is the friends list and user options.  By default, the tab containing the list of existing friends is selected.

- `Friends` tab: Shows current friends and allows to delete friend connections.
- `Pending` tab: Shows incoming friend requests, if any, and allows to accept or decline requests.
- `Find` tab: Allows the user to search for users by username or email address and send friend requests.  The search query will return any matching username (insensitive of spaces and letter case), but will only return an email match on an exact match.  Users with whom the current user is already friends or has a pending friend request are not shown in search results.
- `Options` tab: Allows the user to add and remove streaming service subscriptions from a full list of available providers.  This information is used to filter search results.

## My Queue

## My Reviews

## Search

## Item Detail

Generally not directly accessible, this view is used whenever the `See Details` button is clicked on a media item in any of the other views.