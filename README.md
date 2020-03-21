# Jinaga Starter Kit for TypeScript



Jinaga runs both on the server and in the browser, so that it can exchange facts between the two.
This starter kit uses Webpack to bundle both sides.

Find out more about [Jinaga](https://jinaga.com), [TypeScript](https://www.typescriptlang.org), and [Webpack](https://webpack.js.org/).

## Installing

The easiest way to use this starter kit is to export it with Subversion.

```bash
svn export https://github.com/jinaga/starter-typescript.git/trunk myapplication
```

If you don't have Subversion installed, then you can go to the [GitHub page](https://github.com/jinaga/starter-typescript) and download the zip file.

Once you have the code, run:

```bash
npm install
```

## Database Setup

Jinaga saves its facts in PostgreSQL.
Create a PostgreSQL database, set up the dev user, and then run the setup script.

To create the datbase run:

```bash
psql -h localhost -U postgres postgres
```

And then enter:

```
CREATE DATABASE myapplication;
```

And then, create the user.
This is run once per server:

```
CREATE USER dev WITH
  LOGIN
  ENCRYPTED PASSWORD 'devpassword'
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION
  VALID UNTIL 'infinity';
```

Quit that session with `\q` (or Ctrl+D), and then run the setup script.
The setup script is located in `node_modules/jinaga/setup.sql`.
You can run it from the command line like this:

```bash
psql -h localhost -f node_modules/jinaga/setup.sql -U postgres myapplication
```

For complete instructions, see [Jinaga PostgreSQL Setup](https://jinaga.com/documents/getting-started/creating-an-application/postgresql-setup/).

## Building

To build:

```bash
npm run build
```

This creates a `dist` folder with the server-side code in `server.js`, and the client-side code in `scripts/index-xxxxx.js`.
It also creates an HTML file in `views/index.html` with a script tag that loads the client-side code.

## Running

To run:

```bash
npm start
```

## Developing

After the first build, you will probably want to run in development mode:

```bash
npm run dev
```

This will watch the source code for changes and rebuild as necessary.
It will restart the server to load those changes.

Build something incredible!
