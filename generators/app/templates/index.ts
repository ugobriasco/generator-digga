/*
 * Application entry point
 */

// External Dependancies
import server from './lib';

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
  app.start();
}

export default app;
