# Revise.us

## Prerequisites

-   Node.js ([Download](https://nodejs.org/en/))

-   npm ([Documentation](https://www.npmjs.com/get-npm))

-   PostgreSQL ([Download/Windows](https://www.postgresql.org/download/) | [Download/MacOS](https://postgresapp.com/))

## Installation

1. Install npm dependencies:

    `npm install`

    Make sure the postinstall script runs after the install script (it should happen
    automatically). If not, run:

    `npm run postinstall`

2. Create _.env_ file in the project root directory and put the following
   code inside of it:

    ```
    DB_URI=postgres://<DATABASE_USERNAME>:<DATABASE_PASSWORD>@localhost:5432/reviseus
    GOOGLE_CLIENT=965556441564-cce55mafc1159cbsadka911r301sj6kj.apps.googleusercontent.com
    GOOGLE_SECRET=OVYXy9cWLGmTnX455z6HFxuo
    JWT_SECRET=CXweCZDfwDPp94Tp7E62y9cW
    ```

    - Replace the <...> fragments with your local settings.

3. Run the setup script:

    `npm run setup`

4. Start the development server:

    `npm run dev`

5. All done! You can now access the application at http://localhost:8080.

## Documentation

[Server Documentation](https://fictional-chainsaw-8092472b.pages.github.io/docs/TypeDoc/)

[Client Documentation](https://fictional-chainsaw-8092472b.pages.github.io/client/docs/TypeDoc/)

## Features

-   Some of the API routes and app views are protected and require authentication
    to use them.

-   All the routing happens within the browser, preserving the history (go back /
    go forward buttons work as intended and they don't reload the page).

-   Styles are adjusted to mobile, tablet and desktop screen sizes.

-   All the inputs are validated, and errors handled to protect the server from
    breaking down.

-   The app comes with two colour themes — dark and light. The default theme
    adjusts itself to the preferred user's system theme on the initial app load.
    The theme can later be changed by the user.

-   User inputs are escaped where appropriate to prevent XSS attacks (mainly when
    a feature required the use of innerHTML instead of textContent).

-   Users can authenticated themselves using their Google accounts.

-   The app adjusts its UI to the user's authentication status and other factors
    (certain elements hide and show as users log in and log out, join and leave
    groups).

-   Users can add posts and post answers.

-   Users can attach files to their posts.

-   Allowed file extensions are restricted to txt, rtf, pdf, doc, docx, csv, jpg,
    jpeg, png, gif.

-   Users can download post attachments.

-   Attached images render automatically within a post body.

-   Users can add hashtags to their posts to improve the search experience for
    others.

-   Links within a post / answer body get detected and activated
    (made clickable).

-   New posts and answers appear in real-time (implemented with socket.io).

-   Posts on the home and group pages load lazily (pagination implemented with the
    Intersection Observer API).

-   Users can create public and private groups.

-   Group members can generate invitation links for others.

-   Public groups can be viewed and joined by anyone. They are also included in
    the search results.

-   Private groups can only be viewed by their members. If someone wants to join a
    private group, they need an invitation link. Private groups are not included
    in the search results.

-   Users can use the search engine to browse public posts and public groups.

-   The most popular hashtags used by the users appear under the search bar.
    Popularity is based on the overall number of public posts that use a given
    hashtag.

## Reflection

...

## Coursework Specification

https://docs.google.com/document/d/1KNq3Px8Tb8jbYcLfJLNOJRX8RtqPapvV4_B6vzDoJCc
