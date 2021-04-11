# Revise.us

## Prerequisites

-   Node.js ([Download](https://nodejs.org/en/))

-   npm ([Documentation](https://www.npmjs.com/get-npm))

-   PostgreSQL ([Download/Windows](https://www.postgresql.org/download/) | [Download/MacOS](https://postgresapp.com/))

## Installation

1. Install npm dependencies:

    `npm install`

    Make sure the postinstall script runs after the install script (should happen
    automatically). If not, run:

    `npm run postinstall`

2. Create _.env_ file in the project root directory and use the following
   template to populate it:

    `DB_URI=postgres://<username>:<password>@localhost:5432/reviseus`

    - Replace the <> fragments with your local settings.

3. Run the setup script:

    `npm run setup`

    - It might take the app a while to build.

4. Start the development server:

    `npm run dev`

5. All done! You can now access the application at http://localhost:8080.

## Documentation

[Access the documentation here.](https://fictional-chainsaw-8092472b.pages.github.io/TypeDoc/)

## Coursework Specification

https://docs.google.com/document/d/1KNq3Px8Tb8jbYcLfJLNOJRX8RtqPapvV4_B6vzDoJCc
