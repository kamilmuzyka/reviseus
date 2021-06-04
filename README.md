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

## Coursework Specification

https://docs.google.com/document/d/1KNq3Px8Tb8jbYcLfJLNOJRX8RtqPapvV4_B6vzDoJCc
