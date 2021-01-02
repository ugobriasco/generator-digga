const config = require('../config');
const validateEnv = require('./validate-env');

const DEFAULT_ENV = 'stage';

// Return a custom or default environment
const getConfig = () => {
  const environment = validateEnv(process.env.NODE_ENV || DEFAULT_ENV);
  return config[environment];
};

module.exports = getConfig;
