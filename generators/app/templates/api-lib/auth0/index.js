/*
 * AUTH0
 * It provides an off the shelf OAUTH2 service
 * https://auth0.com
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { getConfig } = require('../../helpers');

const cfg = getConfig();
const { url } = cfg.api.auth0;

/*https://auth0.com/docs/quickstart/backend/nodejs
 * Configure jwt check middleware.
 * The client application should authenticate the user via AUTH0 using the same issuer,
 * then it should pass the the Authorization header, parsing the jwt as 'Bearer <MY_TOKEN>'
 */
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${url}/.well-known/jwks.json`
  }),
  audience: `${url}/api/v2/`,
  issuer: `${url}/`,
  algorithms: ['RS256']
});

/*

How to use this middleware:

app.get('/api/profile', jwtCheck, (req, res) => {
  // jwtCheck adds a user property with the payload from a valid JWT
  const { user } = req;
  console.log(user);
  res.send({ message: 'private stuff', ...user });
});


*/

module.exports = jwtCheck;
