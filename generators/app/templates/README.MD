# <%= name %>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Nevio Core is a Node application to serve multimedia content on geolocation basis.

## Getting started

<%= description %>

```
npm i
cp ./lib/config.js.template ./lib/config.js
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
