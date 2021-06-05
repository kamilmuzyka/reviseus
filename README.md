# Revise.us

## Description

`Revise.us` is a single page application created as a place for peer reviews and revisions. It was developed in pure JavaScript using Web Components API. The server runs as a Node/Express application that uses PostgreSQL as its database.

## Prerequisites

-   Node.js ([Download](https://nodejs.org/en/))

-   npm ([Documentation](https://www.npmjs.com/get-npm))

-   PostgreSQL ([Download/Windows](https://www.postgresql.org/download/) | [Download/MacOS](https://postgresapp.com/))

## Installation

1. Install npm dependencies:

    `npm install`

    Make sure the postinstall script runs after the install script (it should happen
    automatically). If not, do:

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

## Testing

-   The setup script populates the database with mock data to make manual testing easier.

-   Here is an invitation to a private group called "Appeng" (it's the only way to join
    private groups) -
    http://localhost:8080/join/group/13aa3713-45c4-401a-abd7-2213ba91e1a6.

-   There is also a public group called "Portsoc" that you can find using the search
    engine.

-   You can access the rest of the data and test all the features as a logged-in
    user.

## Features

-   Some of the API routes and app views are protected and require authentication
    to use them.

-   All the routing happens within the browser, preserving the history (go back /
    go forward buttons work as intended and they don't reload the page).

-   Styles are adjusted to mobile, tablet and desktop screen sizes.

-   All the inputs are validated, and errors handled to protect the server from
    breaking down.

-   The app comes with two colour themes — dark and light. The default theme
    adjusts itself to the theme preferred by the operating system on the initial
    load. Users can later change that theme.

-   User inputs are escaped where appropriate to prevent XSS attacks (mainly when
    a feature required the use of innerHTML instead of textContent).

-   Users can log in using their Google accounts in order to access all the app features.

-   The app adjusts its UI to the user's authentication status and other factors
    (certain elements hide and show as users log in and log out or join and leave
    groups).

-   Users can add posts and post answers.

-   Users can attach files to their posts.

-   Allowed file extensions are restricted to txt, rtf, pdf, doc, docx, csv, jpg,
    jpeg, png, gif.

-   Users can download post attachments.

-   Attached images render automatically within the post body.

-   Users can add hashtags to their posts to improve the search experience for
    others.

-   Valid links within the post / answer body get detected and activated automatically.

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

-   The most popular hashtags appear under the search bar. Popularity is based
    on the overall number of public posts that use a given hashtag.

## Known Issues

-   Avatars requested from Google servers sometimes break on localhost due to CORS policy (it doesn't happen in production as far as I know).

## Reflection

I began the project by designing the UI and core business logic such as database
ERD and API routes. I followed my sketches throughout the development process,
adjusting them as new requirements emerged. My initial plan was to build a
robust application consisting of highly reusable components. Inspired by
frameworks like React and Vue, I wanted the project to be as declarative as
possible, meaning that new features could rely on older code and done modules.
I quickly realised this approach is not only time-consuming but also quite hard
to implement. Since the task was to build a web application, not a framework or
library, I had to take a different strategy. I still did my best to make the
code reusable, but if a module required hours of additional work to make it
declarative and feasible to use somewhere else, I went for a copy-paste
approach. I believe this was the right thing to do, given the circumstances. The
technologies I have learned along the way are TypeScript, Web Components and Web
Sockets. I also learned a bit about security when using OAuth, Passport and JWT.
If I were to do this project again, I would use some client-side library such as
React to avoid reinventing the wheel and make the front-end development quicker
and easier. I could then focus more on existing features, e.g. implement edit /
delete operations that are the most missing functionalities in the app. Also, I
would try to write some unit tests to make the code more reliable and
maintainable.

## Documentation

[Server Documentation](https://fictional-chainsaw-8092472b.pages.github.io/docs/TypeDoc/)

[Client Documentation](https://fictional-chainsaw-8092472b.pages.github.io/client/docs/TypeDoc/)

## Coursework Specification

https://docs.google.com/document/d/1KNq3Px8Tb8jbYcLfJLNOJRX8RtqPapvV4_B6vzDoJCc
