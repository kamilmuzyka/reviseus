# Revise.us

## Description

`Revise.us` is a single page application created as a place for peer reviews and
revisions. It was developed in pure JavaScript using Web Components API. The
server runs as a Node/Express application that uses PostgreSQL as a database.

## Prerequisites

-   Node.js 16.3.0 ([Download](https://nodejs.org/en/))

-   npm 7.15.1 ([Documentation](https://www.npmjs.com/get-npm))

-   PostgreSQL 13.3 ([Download/Windows](https://www.postgresql.org/download/) | [Download/MacOS](https://postgresapp.com/))

## Installation

1. Install npm dependencies:

    `npm install`

    Make sure the postinstall script runs after the install script (it should
    happen automatically). If not, do:

    `npm run postinstall`

    If you use Windows, the scripts above may cause errors produced by the
    _--prefix_ flag. Use the following script to continue the installation:

    `cd client && npm install`

2. Create _.env_ file in the project root directory and put the following code
   inside of it:

    ```
    DB_URI=postgres://<DATABASE_USERNAME>:<DATABASE_PASSWORD>@localhost:5432/reviseus
    GOOGLE_CLIENT=<GOOGLE_OAUTH_CLIENT_ID>
    GOOGLE_SECRET=<GOOGLE_OAUTH_CLIENT_SECRET>
    JWT_SECRET=<ANY_SECRET_STRING>
    ```

    Replace the <...> fragments with your local settings.

3. Run the setup script:

    `npm run setup`

    If you use Windows, the database setup script may ask you for additional
    authorisation.

4. Start the development server:

    `npm run dev`

5. All done! You can now access the application at http://localhost:8080.

## Features

-   Some of the API routes and app views are protected and require
    authentication to use them.

-   All the routing happens within the browser, preserving the history (go
    back/go forward buttons work as intended and they don't reload the page).

-   Styles are adjusted to mobile, tablet and desktop screen sizes.

-   All the inputs are validated, and errors handled to protect the server from
    breaking down.

-   The app comes with two colour themes — dark and light. The default theme
    adjusts itself to the theme preferred by the operating system on the initial
    load. Users can later change that theme.

-   User inputs are escaped where appropriate to prevent XSS attacks (mainly
    when a feature required the use of innerHTML instead of textContent).

-   Users can log in using their Google accounts in order to access all the app
    features.

-   The app adjusts its UI to the user's authentication status and other factors
    (certain elements hide and show as users log in and log out or join and
    leave groups).

-   Users can add posts and post answers.

-   Users can attach files to their posts.

-   Allowed file extensions are restricted to txt, rtf, pdf, doc, docx, csv,
    jpg, jpeg, png, gif.

-   Users can download post attachments.

-   Attached images render automatically within the post body.

-   Users can add hashtags to their posts to improve the search experience for
    others.

-   Valid links within the post/answer body get detected and activated
    automatically.

-   New posts and answers appear in real-time (implemented with socket.io).

-   Posts on the home and group pages load lazily (pagination implemented with
    the Intersection Observer API).

-   Users can create public and private groups.

-   Group members can generate invitation links for others.

-   Public groups can be viewed and joined by anyone. They are also included in
    the search results.

-   Private groups can only be viewed by their members. If someone wants to join
    a private group, they need an invitation link. Private groups are not
    included in the search results.

-   Users can use the search engine to browse public posts and public groups.

-   The most popular hashtags appear under the search bar. Popularity is based
    on the overall number of public posts that use a given hashtag.

## Known Issues

-   Avatars requested from Google servers sometimes break on localhost due to
    CORS policy (it doesn't happen in production as far as I know).

## Documentation

[Server Documentation](https://kamilmuzyka.github.io/reviseus/docs/TypeDoc/)

[Client Documentation](https://kamilmuzyka.github.io/reviseus/client/docs/TypeDoc/)
