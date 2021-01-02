// Ensure tha the custom environment exists. If not throw an ERROR
const validateEnv = env => {
  const envAvailable = ['production', 'stage', 'test'];
  if (!envAvailable.includes(env)) {
    throw new Error(
      `\x1b[31mInvalid NODE_ENV on startup: "${env}" is not configured.\n Current available environments: ${envAvailable}\x1b[0m`
    );
  } else {
    return env;
  }
};

module.exports = validateEnv;
