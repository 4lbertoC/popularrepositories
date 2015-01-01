[![Build Status](https://travis-ci.org/4lbertoC/popularrepositories.svg)](https://travis-ci.org/4lbertoC/popularrepositories)

# Popular Repositories

A page containing the most popular repositories of a GitHub user.

Structure forked from [react-starter-kit](https://github.com/kriasoft/react-starter-kit).

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /config/                    # Configuration files for Webpack, Jest etc.
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /actions/               # Action creators that allow to trigger a dispatch to stores
│   ├── /assets/                # Static files which are copied to ./build on compile
│   ├── /components/            # React components
│   │   ├── /common/            # - Shared components. E.g. Link, Mixins
│   │   ├── /layout/            # - Layout components. E.g. Header, Navbar
│   │   └── /pages/             # - Web-page components. E.g. About, Profile
│   ├── /constants/             # Constant values used across the app
│   ├── /core/                  # Core components (Flux dispatcher, base classes, utilities)
│   ├── /helpers/               # Custom utilities for the application
│   ├── /models/                # Definitions of data types
│   ├── /services/              # Wrappers for remote services
│   ├── /stores/                # Stores contain the application state and logic
│   ├── /styles/                # The styles to be included in the app
│   └── /app.js                 # The application's main file (entry point)
├── gulpfile.js                 # Configuration file for automated builds
└── package.json                # The list of 3rd party libraries and utilities
```
### Requirements

[Node.js](http://nodejs.org/) has to be installed on your machine. The other dependencies are fetched by [npm](https://www.npmjs.com/).

### Getting Started

Clone the repo:

```shell
$ git clone git@github.com:4lbertoC/popularrepositories.git
$ cd popularrepositories
$ npm install                   # Install Node.js components listed in ./package.json
```

By default, it builds in debug mode. If you need to build in release mode, add
`--release` flag.

### How to Run

```shell
$ gulp                          # or, `gulp --release`
```

This will start a lightweight development server with LiveReload and
synchronized browsing across multiple devices and browsers.

### How to Test

Run unit tests powered by [Jest](https://facebook.github.io/jest/) with the following
[npm](https://www.npmjs.org/doc/misc/npm-scripts.html) command:

```shell
$ npm test
```

Tests and mocks can be found in the `__tests__` and `__mocks__` directories at the same level of the tested class.

### Optional parameters

In the current implementation, the `userId` can be changed through the query parameters.

For example, you can view the popular repositories of the user _bob_ by appending at the end of the url `?userId=bob`.

### Known Issues

##### Watchers
The number of watchers returned by the GitHub API is the same as the stargazers. The correct number should be fetched from `GET /repos/:owner/:repo/subscribers`.

##### URLs
The react-starter-kit creates a single-page web application. It uses client-side routes that don't work as direct links.