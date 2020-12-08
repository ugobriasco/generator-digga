# Nevio Core

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Nevio Core is a Node application to serve multimedia content on geolocation basis.

## Getting started

Be sure to have Node v8+ installed, then setup the application:

```
git clone git@github.com:ugobriasco/nevio-core.git
npm i
npm start
```

## Developing

You can run the application with debug flags and a specific environment as following:

```
NODE_DEBUG=data NODE_ENV=stage node .
```

Available debug options:

- data

Available environments:

- stage
- test
- production

### Running tests

```
npm test
```

### Deploying

```
npm run deploy
```

### Architecture

![depgraph](./dependencygraph.svg)
