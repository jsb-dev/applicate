# Applicate

## Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Client](#client)
    - [Server](#server)
- [Built With](#built-with)
  - [Client](#client-1)
  - [server](#server-1)
  - [Both](#both)
- [Contact](#contact)

## About the Project

Applicate is a collaborative rich-text editor which focuses on the basics of collaborative documenting. It emphasises the use of its lightning-fast response in collaborative environments which require something quick to sketch a plan, with styling that can later be referenced in profesisonal documentation.

Applicate is my first Full Stack project. It's the first time I developed a fully-fledged React UI, and my first attempt at a backend API. This project represents a profound milestone in my journey from learner to developer.

## Getting Started

### Prerequisites

You'll want to make sure you have the following installed before getting started:
`node v20.10.0 or greater`
`npm v10.2.4 or greater`

The client was initially bootstrapped with `npx create-react-app`, and it uses the default scripts with react-dotenv included:
`start: react-dotenv && react-scripts start,`
`build: react-dotenv && react-scripts build,`
`etc ...`

Check out the client [package.json](client/package.json) for the specifics.

The server is a basic `express.js` server with nodemon configured with the start script for hot-reloading.

### Installation

It's best to start with updating node and npm to their latest versions, or at least those mentioned above.

Remember to configure env variables to begin using it properly.

#### Client

Simply cd to the client directory, then use `npm install` to install and `npm start` to boot up the development server.

#### Server

Move into the server directory then `npm install`. Use `npmn start` to boot the server.

## Built With

### Applicate is a MERN stack project:

#### Client

- `React` for the UI
- `MUI` for styling
- `TipTap.js` for the WYSIWYG editor

#### Server

- `Node.js` for the server runtime environment
- `Express.js` for the API
- `MongoDb` for the database
- `validator` for input validation
- `nodemon` for hot reloading

#### Both

- `Socket.io` for websockets
- `JWT` for user auth

## Contact

**Jacob Booth**

- [Email](mailto:jsb-dev@outlook.com)
- [Github](https://github.com/jsb-dev)
