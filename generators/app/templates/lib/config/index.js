<% if (api) { %>
const api = require('./api.config.js')
<% } %>

const env = {};

env.production = {
  httpPort: 8000,
  envName: 'production'<% if (mongoose) { %>,
  db: {
    local: "mongodb://localhost:27017/<%= name %>",
    remote: "YOUR_REMOTE_DB"
  }
  <% } %>
};

env.stage = {
  httpPort: 8000,
  envName: 'stage'<% if (mongoose) { %>,
  db: {
    local: "mongodb://localhost:27017/<%= name %>",
    remote: "YOUR_REMOTE_DB"
  }
  <% } %><% if (api) { %>,
  api
  <% } %>
};

env.test = {
  httpPort: 8001,
  envName: 'test'<% if (mongoose) { %>,
  db: {
    local: "mongodb://localhost:27017/<%= name %>",
    remote: "YOUR_REMOTE_DB"
  }
  <% } %><% if (api) { %>,
  api
  <% } %>
};

module.exports = env;
