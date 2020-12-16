const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
<% if (mongoose) { %>const mongoose = require('mongoose');<% } else {} %>

const api = require('./routes');
const { getConfig } = require('./helpers');

//Configurations
const cfg = getConfig();
const PORT = cfg.httpPort;

// App declaration
const app = express();

<% if (mongoose) { %>
const db = mongoose.connection;
mongoose.Promise = global.Promise; //handles ES6 moongose promise deprecation
mongoose.connect(
cfg.db.local,
  {
    useCreateIndex: true, //handles DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead
    useNewUrlParser: true //handles ES6 moongose promise deprecation
  }
);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to Mongo at: ${new Date()}`);
});
<% } %>


// Parsing
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Enable CORS
app.use(cors());

//Routing
app.use('/', api);

//Exposing public methods
const server = {
  start: () => {
    app.listen(PORT);
    console.log(
      '\x1b[33m%s\x1b[0m',
      `\n\n\nMy new amazing app runs under ${PORT}\n   Environment: ${cfg.envName}\n`
    );
    app.emit('server-started');
  },
  stop: done => {
    process.exit(0);
    done();
  }
};

module.exports = server;
