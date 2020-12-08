# <%= name %>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

<%= description %>

## Getting started

```
npm i
cp ./lib/config.js.template ./lib/config.js
npm start
```

## Developing

You can run the application using specific environment as following:

```
NODE_ENV=stage node .
```
Available environments:

- stage (default)
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
To update this section, please run `npm run build:deptree`

![depgraph](./dependencygraph.svg)
