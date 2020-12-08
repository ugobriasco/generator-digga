const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const api = require('./routes');
const { getConfig } = require('./helpers');

//Configurations
const cfg = getConfig();
const PORT = cfg.httpPort;

// App declaration
const app = express();

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
