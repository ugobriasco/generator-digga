/*
 * Application entry point
 */

// External Dependancies
const server = require('./lib');

const app = {
  start: () => {
    server.start();
  },
  stop: () => {
    server.stop();
  }
};

// Self invoking only if required directly
if (require.main === module) {
  app.start(function() {});
}

module.exports = app;
